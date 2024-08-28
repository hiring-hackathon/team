## [index.mjs](index.mjs)

### AWS Lambda function to retrieve comments from DynamoDB

This code defines an AWS Lambda function that retrieves a specific comment from a DynamoDB table based on provided path parameters. The function uses the AWS SDK for JavaScript to interact with DynamoDB. It begins by creating a DynamoDB Document Client, which simplifies the process of working with DynamoDB items. The `handler` function is the main entry point, designed to be triggered by an API Gateway event.

When invoked, the function extracts `transcriptId` and `commentId` from the event's path parameters. It validates these inputs, returning a 400 status code if either is missing. If the inputs are valid, it constructs parameters for a `GetCommand` to query the 'Comments' table in DynamoDB.

The function attempts to retrieve the item from DynamoDB. If successful and the item exists, it returns the item with a 200 status code and appropriate CORS headers. If the item is not found, it returns a 404 status code. In case of any errors during the process, the function logs the error and returns a 500 status code with an error message. This setup ensures that the function handles various scenarios gracefully while providing necessary CORS support for cross-origin requests.

[Back to (root)](#root) | [Back to top](#table-of-contents)

