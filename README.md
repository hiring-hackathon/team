**Instructions:** Each file has a corresponding .md file generated with node-doc-llm and write-the via OpenAI. If you don't understand a file, try reading its corresponding .md file. Thanks!

Rilla++ Voice AI Sales++

https://www.youtube.com/watch?v=OIlAv2BzpxQ

https://hiring-hackathon-team.vercel.app/

https://github.com/hiring-hackathon/team

`aws` related to DynamoDB, Lambda, S3

`data` related to transcripts and vector search

`docs` for published documentation, such as video posted YouTube.

`frontend` deployed to Vercel.

`mockups` and research of prior art as examples.

`python` to setup RAG

`tools` to generate documentation via OpenAI API

There are many components in this repository, such as:
1. Version 1 of frontend ui and core
2. Version 2 frontend ui and core2 for transcriptions in TypeScript (TS) and some backend because it's Next.js
2. Frontend RAG chatbot in JavaScript (JS) and some backend because it's Next.js
3. AWS Lambda for CRUD REST API in Javascript for Transcriptions and Comments
4. AWS Lambda for AI LLM REST API in JavaScript using OpenAI's `gpt-3.5-turbo` or `gpt-4`
5. AWS S3 REST API TypeScript (TS) and some backend because it's Next.js
6. Transcriptions and DynamoDB (DB #1)
7. Transcriptions and Pinecone DB (DB #2)
8. Sample React starter app to load transcriptions using CRUD REST API
9. AI chatbot uses OpenAI's `text-embedding-ada-002` with embeddings and vector databses via Pinecone
10. OpenRouter.AI with Meta's `meta-llama/llama-3.1-8b-instruct:free` for Generate Summary feature
