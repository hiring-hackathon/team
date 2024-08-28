## [index.mjs](index.mjs)

### Serverless function to delete a comment from a DynamoDB table

This code defines an AWS Lambda function that handles HTTP DELETE requests to remove a comment from a DynamoDB table named 'Comments'. The function uses the AWS SDK for JavaScript, specifically the DynamoDB and DynamoDB Document Client modules, to interact with the DynamoDB service.

When the function is invoked, it extracts the `transcriptId` and `commentId` from the path parameters of the incoming event. It first attempts to retrieve the comment from the 'Comments' table using these identifiers. If the comment is found, it proceeds to delete the comment from the table. The response includes the details of the deleted comment and appropriate HTTP status codes and headers to allow cross-origin requests.

If the comment is not found, the function returns a 404 status code with an error message. In case of any other errors during the process, a 500 status code is returned along with the error details. This ensures that the client is informed about the success or failure of the delete operation in a structured manner.

[Back to (root)](#root) | [Back to top](#table-of-contents)

