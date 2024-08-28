## [index.mjs](index.mjs)

### Serverless function for adding comments to DynamoDB

This code defines a serverless function that handles HTTP requests to add comments to a DynamoDB table. The function is designed to be used in an AWS Lambda environment and interacts with DynamoDB using the AWS SDK for JavaScript. 

When the function is invoked, it extracts the `commentText` and `location` from the request body and the `transcriptId` from the path parameters. A unique `commentId` is generated using a combination of the current timestamp and a random number. The function then constructs an item object containing the `transcriptId`, `commentId`, `commentText`, `location`, and the current timestamp (`createdAt`).

This item is then inserted into the `Comments` table in DynamoDB using the `PutCommand` from the AWS SDK's DynamoDB Document Client. If the insertion is successful, the function returns a 200 HTTP status code along with the inserted item in the response body. If an error occurs during the insertion, the function catches the error, logs it, and returns a 500 HTTP status code with an error message in the response body.

The function also includes CORS headers to allow cross-origin requests, making it suitable for use in web applications.

