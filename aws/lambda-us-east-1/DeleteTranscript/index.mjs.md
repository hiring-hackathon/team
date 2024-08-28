## [index.mjs](index.mjs)

### Serverless function to delete a transcript from DynamoDB

This code defines an AWS Lambda function that handles HTTP DELETE requests to remove a transcript from a DynamoDB table. The function uses the AWS SDK for JavaScript, specifically the DynamoDB and DynamoDBDocumentClient classes, to interact with the DynamoDB service. When the function is invoked, it extracts the `TranscriptId` from the request's path parameters and constructs a delete operation for the 'Transcriptions' table. If the delete operation is successful, the function returns a 200 status code with a success message. If an error occurs, it logs the error and returns a 500 status code with an error message. The function also includes CORS headers to allow cross-origin requests.

[Back to (root)](#root) | [Back to top](#table-of-contents)

