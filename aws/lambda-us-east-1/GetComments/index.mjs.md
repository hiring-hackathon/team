# Table of Contents

- [(root) (1 files)](#root)
# (root)

## List of files

- [index.mjs](#indexmjs)

[Back to top](#table-of-contents)

## [index.mjs](index.mjs)

### Serverless function to query comments from DynamoDB based on a transcript ID

This code defines an AWS Lambda function that queries a DynamoDB table for comments associated with a specific transcript ID. The function uses the AWS SDK for JavaScript to interact with DynamoDB. When an HTTP request triggers the Lambda function, it expects an `id` parameter in the path. If the `id` is missing, the function returns a 400 status code with an error message. If the `id` is provided, the function constructs a query to fetch comments from the `Comments` table where the `TranscriptId` matches the provided `id`. The query results are then returned with a 200 status code. If an error occurs during the query, the function catches the error and returns a 500 status code with an error message. The function also includes CORS headers to allow cross-origin requests.

[Back to (root)](#root) | [Back to top](#table-of-contents)

