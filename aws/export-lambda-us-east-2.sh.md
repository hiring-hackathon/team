## [export-lambda-us-east-2.sh](export-lambda-us-east-2.sh)

### Script to export AWS Lambda functions from the us-east-2 region

This script automates the process of exporting AWS Lambda functions from the `us-east-2` region. It sets the AWS region and output format, ensures the necessary directory structure exists, and retrieves a list of all Lambda functions in the specified region using the AWS CLI. For each Lambda function, it fetches detailed information, extracts the download URL for the function's code, and downloads the code as a ZIP file. The script then unzips the downloaded file into a designated directory and cleans up the ZIP file. This tool is useful for backing up or migrating Lambda functions, and requires the AWS CLI to be installed and configured properly.

[Back to (root)](#root) | [Back to top](#table-of-contents)
