## [export-lambda-us-east-1.sh](export-lambda-us-east-1.sh)

### Script to export AWS Lambda functions from the us-east-1 region

This script automates the process of exporting AWS Lambda functions from the us-east-1 region. It sets the AWS region to us-east-1 and ensures the AWS CLI outputs JSON format. The script creates a directory named `lambda-us-east-1` to store the exported Lambda functions. It then fetches a list of all Lambda functions in the specified region using the AWS CLI.

For each Lambda function, the script retrieves detailed information, including the download URL for the function's code. It then downloads the code as a ZIP file, extracts its contents into a dedicated directory, and removes the ZIP file afterward. The script includes error handling to manage issues such as failed AWS CLI commands or download errors, ensuring robust execution. This tool is useful for backing up or migrating Lambda functions efficiently.

