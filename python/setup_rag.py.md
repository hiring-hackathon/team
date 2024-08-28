## [setup_rag.py](setup_rag.py)

### Script for managing Pinecone index and embedding reviews using OpenAI

This script is designed to manage a Pinecone index and create embeddings for review data using OpenAI. It begins by setting up logging and loading environment variables from a `.env.local` file. The script checks for the presence of required environment variables (`PINECONE_API_KEY` and `OPENAI_API_KEY`) and initializes a Pinecone client.

The script includes several key functions:
- `delete_index_if_exists`: Checks if a specified Pinecone index exists and deletes it if it does.
- `create_index`: Creates a new Pinecone index with a specified name and dimension.
- `create_embedding_with_retry`: Generates embeddings for given text using the OpenAI client, with retry logic to handle transient errors.
- `batch_upsert`: Upserts vectors into the Pinecone index in batches to handle large datasets efficiently.
- `cleanup`: Deletes a specified Pinecone index.

In the main execution block, the script deletes any existing index, creates a new index, and processes review data from a `reviews.json` file. It generates embeddings for each review and upserts them into the Pinecone index. The script also includes error handling and logging to provide detailed information about the execution process. Optionally, the script can clean up the index after execution by uncommenting the cleanup call.

[Back to (root)](#root) | [Back to top](#table-of-contents)
