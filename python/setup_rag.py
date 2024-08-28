import os
import json
import time
import logging
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
from tqdm import tqdm
from tenacity import retry, stop_after_attempt, wait_exponential
from pinecone.exceptions import UnauthorizedException

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables
load_dotenv(".env.local")

# Check for required environment variables
required_env_vars = ["PINECONE_API_KEY", "OPENAI_API_KEY"]
for var in required_env_vars:
    if not os.getenv(var):
        raise ValueError(f"Missing required environment variable: {var}")

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Configuration
index_name = os.getenv("PINECONE_INDEX_NAME", "rag")
vector_dimension = int(os.getenv("VECTOR_DIMENSION", "1536"))
batch_size = int(os.getenv("BATCH_SIZE", "100"))

def delete_index_if_exists(pc, index_name):
    """
    Checks if the given index exists and deletes it if it does.

    Args:
      pc (Pinecone): The Pinecone client.
      index_name (str): The name of the index to check and delete.

    Raises:
      UnauthorizedException: If the client is unauthorized.
      Exception: If there is an error checking or deleting the index.

    Examples:
      >>> delete_index_if_exists(pc, 'rag')
    """
    try:
        indexes = pc.list_indexes()
        if index_name in indexes:
            logging.info(f"Index '{index_name}' exists. Deleting...")
            pc.delete_index(index_name)
            time.sleep(60)  # Increased delay for deletion
            indexes = pc.list_indexes()
            if index_name in indexes:
                logging.warning(f"Index '{index_name}' still exists after deletion attempt. Please delete it manually.")
            else:
                logging.info(f"Index '{index_name}' successfully deleted.")
        else:
            logging.info(f"Index '{index_name}' does not exist.")
    except UnauthorizedException as e:
        logging.error(f"Unauthorized error: {e}")
        raise
    except Exception as e:
        logging.error(f"Error checking or deleting index: {e}")

def create_index(pc, index_name, dimension):
    """
    Creates a new Pinecone index with the given name and dimension.

    Args:
      pc (Pinecone): The Pinecone client.
      index_name (str): The name of the index to create.
      dimension (int): The dimension of the index.

    Raises:
      UnauthorizedException: If the client is unauthorized.
      Exception: If there is an error creating the index.

    Examples:
      >>> create_index(pc, 'rag', 1536)
    """
    try:
        existing_indexes = pc.list_indexes()
        if index_name in existing_indexes:
            logging.info(f"Index '{index_name}' already exists.")
            # Optionally delete and recreate if necessary
            # delete_index_if_exists(pc, index_name)
        else:
            logging.info(f"Creating index '{index_name}' with dimension {dimension}...")
            try:
                pc.create_index(
                    name=index_name,
                    dimension=dimension,
                    metric="cosine",
                    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
                )
                logging.info(f"Index '{index_name}' created.")
            except Exception as e:
                if "ALREADY_EXISTS" in str(e):
                    logging.info(f"Index '{index_name}' already exists. Skipping creation.")
                else:
                    logging.error(f"Error creating index: {e}")
                    raise
    except UnauthorizedException as e:
        logging.error(f"Unauthorized error: {e}")
        raise
    except Exception as e:
        logging.error(f"Error creating index: {e}")

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def create_embedding_with_retry(client, text):
    """
    Creates an embedding for the given text using the OpenAI client, with retry logic.

    Args:
      client (OpenAI): The OpenAI client.
      text (str): The text to create an embedding for.

    Returns:
      Embedding: The embedding for the given text.

    Raises:
      Exception: If there is an error creating the embedding.

    Examples:
      >>> create_embedding_with_retry(client, 'This is a review.')
    """
    return client.embeddings.create(input=text, model="text-embedding-3-small")

def batch_upsert(index, vectors, batch_size=100):
    """
    Upserts the given vectors into the given index in batches.

    Args:
      index (Index): The Pinecone index.
      vectors (list): The list of vectors to upsert.
      batch_size (int): The size of each batch.

    Raises:
      Exception: If there is an error upserting the vectors.

    Examples:
      >>> batch_upsert(index, [vector1, vector2, vector3], 100)
    """
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i+batch_size]
        try:
            upsert_response = index.upsert(vectors=batch, namespace="ns1")
            logging.info(f"Batch {i//batch_size + 1}: Upserted {upsert_response['upserted_count']} vectors")
        except Exception as e:
            logging.error(f"Error upserting batch {i//batch_size + 1}: {e}")

def cleanup(pc, index_name):
    """
    Deletes the given index.

    Args:
      pc (Pinecone): The Pinecone client.
      index_name (str): The name of the index to delete.

    Raises:
      Exception: If there is an error deleting the index.

    Examples:
      >>> cleanup(pc, 'rag')
    """
    try:
        pc.delete_index(index_name)
        logging.info(f"Cleaned up: Deleted index '{index_name}'")
    except Exception as e:
        logging.error(f"Error during cleanup: {e}")

# Main execution
if __name__ == "__main__":
    # Delete existing index (if any)
    delete_index_if_exists(pc, index_name)

    # Create new Pinecone index with the desired dimension
    create_index(pc, index_name, vector_dimension)

    # Load review data
    with open("reviews.json") as f:
        data = json.load(f)

    processed_data = []
    client = OpenAI()

    # Create embeddings for each review
    for review in tqdm(data.get("reviews", []), desc="Processing reviews"):
        try:
            response = create_embedding_with_retry(client, review.get('review', ''))
            embedding = response.data[0].embedding
            if len(embedding) != vector_dimension:
                logging.warning(f"Embedding dimension mismatch for review {review.get('professor', 'unknown')}: Expected {vector_dimension}, got {len(embedding)}")
                continue
            processed_data.append(
                {
                    "values": embedding,
                    "id": review.get("professor", ""),
                    "metadata": {
                        "review": review.get("review", ""),
                        "subject": review.get("subject", ""),
                        "stars": review.get("stars", ""),
                    }
                }
            )
        except Exception as e:
            logging.error(f"Error creating embeddings for review {review.get('professor', 'unknown')}: {e}")

    # Check if processed_data is empty
    if not processed_data:
        logging.warning("No data to upsert.")
    else:
        # Insert the embeddings into the Pinecone index
        try:
            index = pc.Index(index_name)
            index_dimension = index.describe_index_stats().get('dimension', 0)
            if index_dimension != vector_dimension:
                logging.error(f"Vector dimension mismatch: Expected {vector_dimension}, got {index_dimension}")
            else:
                batch_upsert(index, processed_data, batch_size)
        except Exception as e:
            logging.error(f"Error upserting data into index: {e}")

        # Print index statistics
        try:
            logging.info(f"Index stats: {index.describe_index_stats()}")
        except Exception as e:
            logging.error(f"Error describing index stats: {e}")

    # Uncomment the following line if you want to clean up the index after the script runs
    # cleanup(pc, index_name)
