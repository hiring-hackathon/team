# Rilla++ Voice AI Sales++

## Demo

- [YouTube Video](https://www.youtube.com/watch?v=OIlAv2BzpxQ)
- [Live Demo](https://hiring-hackathon-team.vercel.app/)
- [GitHub Repository](https://github.com/hiring-hackathon/team)

## Project Structure

- `aws`: Export from DynamoDB, Lambda, S3
- `data`: Transcripts-related data; import via React app and CRUD API into DynamoDB
- `docs`: Published documentation, such as YouTube video
- `frontend`: Deployed to Vercel
- `mockups`: Research and prior art examples
- `pinecone`: RAG setup, export from Pinecone DB
- `tools`: Documentation generation via OpenAI API

## Components

1. Version 1 of frontend UI and core
2. Version 2 frontend UI and core2 for transcriptions in TypeScript (TS) with some backend (Next.js)
3. Frontend RAG chatbot in JavaScript (JS) with some backend (Next.js)
4. AWS Lambda for CRUD REST API in JavaScript for Transcriptions and Comments
5. AWS Lambda for AI LLM REST API in JavaScript using OpenAI's `gpt-3.5-turbo` or `gpt-4`
6. AWS S3 REST API in TypeScript (TS) with some backend (Next.js)
7. Transcriptions and DynamoDB (DB #1)
8. Transcriptions and Pinecone DB (DB #2)
9. Sample React starter app to load transcriptions using CRUD REST API
10. AI chatbot using OpenAI's `text-embedding-ada-002` with embeddings and vector databases via Pinecone
11. OpenRouter.AI with Meta's `meta-llama/llama-3.1-8b-instruct:free` for Generate Summary feature

## Co-Authors

- Derek Gomez <dmatt.gomez@gmail.com> and <demagome@ucsc.edu>
- Faith Nchang <nchangfru24@gmail.com> and <fnchang@montgomerycollege.edu>
- Lloyd Chang <lloydchang@gmail.com>
- Muturi David <muturidavid854@gmail.com>
- Shaun Jhingoor <Jhingoor1945@gmail.com>

## Note

Each file has a corresponding `.md` file generated with `node-doc-llm` and `write-the` via OpenAI. If you don't understand a file, try reading its corresponding `.md` file.