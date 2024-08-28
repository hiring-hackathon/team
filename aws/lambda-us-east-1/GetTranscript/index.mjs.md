## [index.mjs](index.mjs)

### AWS Lambda function to scan DynamoDB table and return items

This code defines an AWS Lambda function that scans a DynamoDB table named 'Transcriptions' and returns all the items in the table. It uses the AWS SDK for JavaScript (v3) to interact with DynamoDB. The `DynamoDBDocumentClient` is initialized to simplify working with DynamoDB items. The `handler` function, which serves as the entry point for the Lambda, constructs a `ScanCommand` to retrieve all items from the 'Transcriptions' table. If the scan operation is successful, it returns a response with a status code of 200 and the retrieved items in JSON format. If an error occurs during the scan, it logs the error and returns a response with a status code of 500, including an error message and details. This setup is useful for applications that need to fetch and process all records from a DynamoDB table in a serverless environment.

[Back to (root)](#root) | [Back to top](#table-of-contents)
