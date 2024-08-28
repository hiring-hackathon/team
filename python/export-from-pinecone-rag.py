# https://stackoverflow.com/questions/75894927/pinecone-can-i-get-all-dataall-vector-from-a-pinecone-index-to-move-data-i

# https://community.pinecone.io/t/how-to-retrieve-list-of-ids-in-an-index/380/11

# Key Changes Made:

# Pinecone Client Initialization: Replaced the old pinecone.init with the new Pinecone client instantiation.

# Index Access: Changed the way to access the index using pc.Index(index_name) instead of pinecone.Index(index_name).

import os
import json
import numpy as np
from pinecone import Pinecone, ServerlessSpec

# Initialize Pinecone client
print("Initializing Pinecone client...")
pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY"),
    environment='PINECONE_PROJECT_ID'  # Note: This should be replaced with your actual environment
)
print("Pinecone client initialized.")

index_name = "rag"  # Changed from "langchain-demo" to match your current index name
print(f"Checking if index '{index_name}' exists...")
try:
    if index_name not in pc.list_indexes().names():
        print(f"Index '{index_name}' does not exist. Creating it...")
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric='cosine',  # Changed from Euclidean to cosine, which is more common for normalized vectors
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )
        print(f"Index '{index_name}' created.")
    else:
        print(f"Index '{index_name}' already exists.")
except Exception as e:
    print(f"An error occurred while checking/creating the index: {e}")

# Access the existing index
print(f"Accessing index '{index_name}'...")
try:
    index = pc.Index(index_name)
    print("Index accessed.")
except Exception as e:
    print(f"An error occurred while accessing the index: {e}")

# Key Change 3: Added vector normalization
# This can help improve query results, especially if the index uses cosine similarity
def normalize_vector(vector):
    return vector / np.linalg.norm(vector)

# Key Change 4: Updated get_ids_from_query function
# Added namespace parameter and error handling
def get_ids_from_query(index, input_vector, namespace=None):
    print("searching pinecone...")
    try:
        results = index.query(
            vector=input_vector,
            top_k=10000,
            include_values=False,
            include_metadata=True,
            namespace=namespace  # Added namespace parameter
        )
        ids = set()
        print(f"Query results type: {type(results)}")
        print(f"Number of matches: {len(results['matches'])}")
        for result in results['matches']:
            ids.add(result['id'])
        return ids
    except Exception as e:
        print(f"An error occurred during query: {e}")
        return set()

# Key Change 5: Updated get_all_ids_from_index function
# Added better error handling, namespace handling, and a maximum number of attempts
def get_all_ids_from_index(index, num_dimensions, namespace=None):
    print("Getting index stats...")
    try:
        stats = index.describe_index_stats()
        print(f"Index stats: {stats}")
        if namespace:
            num_vectors = stats["namespaces"].get(namespace, {}).get("vector_count", 0)
        else:
            num_vectors = stats["total_vector_count"]
        print(f"Total vector count in namespace {namespace}: {num_vectors}")
        all_ids = set()
        max_attempts = 10  # Limit the number of attempts to prevent infinite loops
        attempt = 0
        while len(all_ids) < num_vectors and attempt < max_attempts:
            print(f"Attempt {attempt + 1}/{max_attempts}")
            print(f"Length of ids list ({len(all_ids)}) is shorter than the number of total vectors ({num_vectors})...")
            input_vector = normalize_vector(np.random.rand(num_dimensions)).tolist()
            print(f"Created normalized random vector. First 5 elements: {input_vector[:5]}")
            ids = get_ids_from_query(index, input_vector, namespace)
            all_ids.update(ids)
            print(f"Updated ids set. Current size: {len(all_ids)}")
            attempt += 1

        if len(all_ids) < num_vectors:
            print("Warning: Could not retrieve all IDs. Consider using a different query method.")

        return all_ids
    except Exception as e:
        print(f"An error occurred while getting all IDs: {e}")
        return set()

# Key Change 6: Added functions for JSON serialization and file export
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        return super(NumpyEncoder, self).default(obj)

def export_to_file(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2, cls=NumpyEncoder)
    print(f"Data exported to {filename}")

# Main execution
print("Starting to get all IDs from index...")
all_ids = get_all_ids_from_index(index, num_dimensions=1536, namespace="ns1")
print(f"All IDs retrieved. Total count: {len(all_ids)}")
print(f"First few IDs: {list(all_ids)[:5]}")

# Key Change 7: Added data fetching and export to file
if len(all_ids) > 0:
    print("Fetching data for all collected IDs...")
    try:
        fetched_data = index.fetch(list(all_ids), namespace="ns1")
        print(f"Fetched data for {len(fetched_data['vectors'])} vectors.")
        print("Sample of fetched data:")
        for id, vector in list(fetched_data['vectors'].items())[:2]:  # Print first 2 vectors
            print(f"ID: {id}")
            print(f"Vector (first 5 elements): {vector['values'][:5]}")
            print(f"Metadata: {vector.get('metadata', {})}")

        # Prepare data for export
        export_data = {
            "index_name": index_name,
            "namespace": "ns1",
            "vectors": {
                id: {
                    "values": vector['values'],
                    "metadata": vector.get('metadata', {})
                } for id, vector in fetched_data['vectors'].items()
            }
        }

        # Export data to file
        export_to_file(export_data, f"{index_name}_export.json")
    except Exception as e:
        print(f"An error occurred while fetching or exporting data: {e}")
        print(f"Error details: {str(e)}")
else:
    print("No IDs were retrieved, skipping data fetch and export.")

print("Script completed.")

# Potential bugs addressed:
# 1. Infinite loop in get_all_ids_from_index: Added a maximum number of attempts.
# 2. JSON serialization error: Added custom serialization for numpy arrays.
# 3. Namespace handling: Added proper namespace handling throughout the script.
# 4. Error handling: Added try-except blocks to handle potential exceptions.

# Note: The script assumes the namespace "ns1". If your vectors are in a different
# namespace, you should modify this accordingly.
