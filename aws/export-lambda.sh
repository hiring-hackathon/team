#!/bin/sh

# You need to have aws-cli installed and configured

# Ensure the 'lambda' directory exists
mkdir -p lambda

# Ensure AWS CLI outputs JSON
export AWS_DEFAULT_OUTPUT=json

# Fetch the list of all Lambda functions
echo "Fetching the list of Lambda functions..."
function_list=$(aws lambda list-functions)

# Check if the function list was fetched correctly
if [ $? -ne 0 ]; then
    echo "Failed to fetch Lambda function list. Please check your AWS CLI configuration and permissions."
    exit 1
fi

# Parse the function names from the JSON output
echo "Parsing function names..."
echo "$function_list" | jq -r '.Functions[].FunctionName' | while read -r name; do
    echo "Processing function: $name"

    # Fetch the function details
    function_details=$(aws lambda get-function --function-name "$name")

    # Check if fetching function details was successful
    if [ $? -ne 0 ]; then
        echo "Failed to get details for function: $name. Skipping..."
        continue
    fi

    echo "Function details fetched for $name: $function_details"

    # Extract the download URL
    url=$(echo "$function_details" | jq -r '.Code.Location')

    # Verify if the URL was extracted correctly
    if [ -z "$url" ]; then
        echo "No URL found for function: $name. Skipping..."
        continue
    fi

    echo "Download URL for $name: $url"

    # Attempt to download the Lambda function code
    echo "Downloading $name from $url..."
    wget -q -O "./lambda/$name.zip" "$url"

    # Check if wget was successful
    if [ $? -ne 0 ]; then
        echo "Failed to download code for $name from $url. Please check the URL or network connection."
    else
        echo "Successfully downloaded $name."
    fi

    mkdir -p "./lambda/$name"

    cd "./lambda/$name"

    unzip -o "../$name.zip"

    rm "../$name.zip"

    cd ../..

done
