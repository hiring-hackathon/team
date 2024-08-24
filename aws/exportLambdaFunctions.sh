#!/usr/bin/env bash -x

# Original sources and references:
# https://disaster-recovery.workshop.aws/en/labs/basics/lambda.html
# https://www.reddit.com/r/aws/comments/amyhy7/is_there_any_way_export_all_my_lambda_functions
# https://gist.github.com/TheNetJedi/0847ba0ec1da9879b4fa1d8f3276b004

# Credits to 
# Credits Reddit u/TheNetJedi and corresponding GitHub User @TheNetJedi for the original script
# Credits to Reddit user u/aa93 for the original suggestions
# Credits to GitHub user @kitobelix for the jq suggestion:
# "I had to patch it because the output from get-function doesn't always came in the same order.
# I used jq as: aws lambda get-function --function-name $name | jq -r '.Code.Location' | xargs wget -O ./code/$name.zip
# in line 10 and it worked flawlessly."

# Enhanced script with improvements and robustness

# Install AWS CLI via Mac Homebrew
# brew install awscli

# Requirements:
# - AWS CLI installed and configured
# - jq installed (for JSON parsing)
# - curl installed (for downloading)

# Create output directory

output_dir="lambda_exports"
mkdir -p "$output_dir"

AWS_REGION="us-east-1"

functions_output=$(aws lambda list-functions --region $AWS_REGION --output json)

echo "$functions_output" | jq -r '.Functions[].FunctionName' | while read -r name; do
    echo "Exporting function: $name"
    
    function_details=$(aws lambda get-function --function-name "$name" --region $AWS_REGION)
    
    if [ $? -eq 0 ]; then
        echo "$function_details" > "$output_dir/$name.json"
        
        # Print the content of the JSON file for debugging
        echo "Content of $output_dir/$name.json:"
        cat "$output_dir/$name.json"
        
        # Extract and download the code
        code_url=$(echo "$function_details" | jq -r '.Code.Location' 2>/dev/null)
        if [ $? -eq 0 ] && [ "$code_url" != "null" ]; then
            curl -sSL "$code_url" --output "$output_dir/$name.zip"
            echo "Downloaded function code to $output_dir/$name.zip"
        else
            echo "Failed to extract code URL for function: $name"
        fi
        
        # Extract function configuration
        echo "$function_details" | jq '.Configuration' 2>/dev/null > "$output_dir/$name.config.json"
        if [ $? -eq 0 ]; then
            echo "Extracted configuration to $output_dir/$name.config.json"
        else
            echo "Failed to extract configuration for function: $name"
        fi
        
        echo "Exported: $name"
    else
        echo "Failed to get details for function: $name"
    fi
    
    echo "-------------------"
done

echo "Export completed. Check the '$output_dir' directory for results."