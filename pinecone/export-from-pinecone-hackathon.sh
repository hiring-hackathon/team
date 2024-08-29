#!/bin/sh

export PINECONE_API_KEY=$(grep PINECONE_API_KEY .env.local | cut -d'=' -f2)
export PINECONE_PROJECT_ID=$(grep PINECONE_API_KEY .env.local | cut -d'=' -f2)
python ./export-from-pinecone-hackathon.py
