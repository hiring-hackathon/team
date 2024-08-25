# Step-by-Step Guide: Amazon S3 REST API Integration

## 1. Create an AWS account

1. Go to the AWS website (aws.amazon.com)
2. Click on "Create an AWS Account"
3. Follow the prompts to provide necessary information
4. Choose a support plan
5. Verify your identity

## 2. Declare IAM permissions for the API

1. Sign in to the AWS Management Console
2. Navigate to the IAM service
3. Create a new IAM role:
   - Click "Roles" in the left sidebar
   - Click "Create role"
   - Choose "API Gateway" as the service that will use this role
4. Attach policies:
   - Search for and attach "AmazonS3FullAccess" (or a more restricted policy if needed)
5. Name and create the role

## 3. Create and establish API resources

1. Go to the API Gateway console
2. Click "Create API" and choose "REST API"
3. Set up your new API:
   - Choose "New API"
   - Give it a name (e.g., "S3Integration")
   - Choose an endpoint type (usually Regional)
4. Create resources:
   - Click "Actions" > "Create Resource"
   - Name it (e.g., "buckets" for listing buckets)
   - Repeat for other resources you need (e.g., "objects" for bucket contents)

## 4. Create and initialize an API method

1. With your resource selected, click "Actions" > "Create Method"
2. Choose the HTTP method (e.g., GET for listing buckets)
3. Set up the method:
   - Integration type: AWS Service
   - AWS Region: your S3 region
   - AWS Service: S3
   - HTTP method: GET (or appropriate method)
   - Action Type: Use path override
   - Path override: / (for listing buckets)
   - Execution role: ARN of the IAM role you created earlier

## 5. Expose the API method's access to an S3 bucket

1. In the method execution pane, click on "Integration Request"
2. Scroll down to "HTTP Headers" and add:
   - Name: "x-amz-date"
   - Mapped from: "$context.requestTime"
3. Under "Mapping Templates":
   - Content-Type: application/json
   - Template:
     ```
     {
       "Bucket": "$input.params('bucket')"
     }
     ```

## 6. Render API methods to access an object in an S3 bucket

1. Create a new resource under your API (e.g., /{bucket}/{object})
2. Create a GET method for this resource
3. Set up the method similar to step 4, but:
   - Path override: /{bucket}/{object}
4. In the Integration Request:
   - Add "x-amz-date" header as before
   - Mapping template:
     ```
     {
       "Bucket": "$input.params('bucket')",
       "Key": "$input.params('object')"
     }
     ```

## 7. Deploy the API

1. Click "Actions" > "Deploy API"
2. Choose a stage name (e.g., "prod")
3. Note the invoke URL provided

## 8. Test the API

1. Use a tool like Postman or curl to send requests to your API
2. For listing buckets: GET {invoke-url}/buckets
3. For getting an object: GET {invoke-url}/{bucket-name}/{object-key}

Remember to replace placeholders with your actual values.

Note: This guide provides a basic setup. In a production environment, you'd want to add proper error handling, logging, and potentially caching.
