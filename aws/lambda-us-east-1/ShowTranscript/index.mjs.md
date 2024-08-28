## [index.mjs](index.mjs)

### Lambda function to fetch transcript details from DynamoDB

This code defines an AWS Lambda function that retrieves transcript details from a DynamoDB table based on a provided TranscriptId. The function is designed to handle HTTP GET requests, including preflight OPTIONS requests for CORS compliance. It initializes a DynamoDB Document Client using the AWS SDK and processes incoming events to extract the TranscriptId from the path parameters. If the TranscriptId is missing, it returns a 400 status code with an error message. The function then constructs a GetCommand to query the 'Transcriptions' table in DynamoDB. If the transcript is found, it returns the transcript details with a 200 status code. If not, it returns a 404 status code indicating that the transcript was not found. In case of any errors during the process, it logs the error and returns a 500 status code with an error message.

[Back to (root)](#root) | [Back to top](#table-of-contents)
