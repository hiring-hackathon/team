## [route.js](route.js)

### A sales coaching API endpoint using Pinecone and OpenAI for transcript analysis and feedback

This file defines a POST endpoint for a Next.js API route that leverages Pinecone and OpenAI to provide feedback on sales transcripts. The primary purpose of this endpoint is to analyze sales conversations and offer constructive feedback to improve sales techniques.

When a POST request is received, the endpoint extracts the latest message from the request body and uses OpenAI's text embedding model to generate an embedding for the message content. This embedding is then used to query a Pinecone vector database to find similar transcripts. The results from the Pinecone query are appended to the latest message content to provide context for the feedback.

The system prompt, which outlines the role of an expert sales coach, is combined with the conversation history and the latest message to form a complete context for OpenAI's chat completion model. The model generates a response stream, which is then returned to the client.

This endpoint is designed to help salespeople improve their communication skills by providing detailed, actionable feedback based on best practices in sales communication. The feedback is generated in real-time and is tailored to the specific content of the sales transcripts provided.

[Back to (root)](#root) | [Back to top](#table-of-contents)

