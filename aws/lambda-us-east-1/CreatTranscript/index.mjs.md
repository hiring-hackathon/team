## [index.mjs](index.mjs)

### Serverless function to store transcriptions in DynamoDB

This code defines a serverless function designed to handle HTTP requests, parse incoming JSON data, and store transcription text in an AWS DynamoDB table. The function initializes a DynamoDB client using the AWS SDK and defines a main handler function that processes incoming events. When a request is received, the function parses the request body to extract the transcription text and generates a unique ID for the transcript. If the transcription text is missing, it returns a 400 error response. Otherwise, it inserts the transcript into the DynamoDB table named 'Transcriptions' and returns a success response with the transcript ID and text. The function also includes error handling to return a 500 error response in case of any issues during the process. Additionally, the function sets CORS headers to allow requests from any origin and supports POST and OPTIONS methods.

[Back to (root)](#root) | [Back to top](#table-of-contents)
