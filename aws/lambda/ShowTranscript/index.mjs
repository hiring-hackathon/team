import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  // Define CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // Or specify your domain to restrict access
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key, X-Amz-Date, X-Amz-Security-Token"
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204, // No content
      headers: headers
    };
  }

  console.log("Event: ", JSON.stringify(event));

  // Extract TranscriptId from the path parameters
  const id = event.pathParameters ? event.pathParameters.id : null;
  console.log("id", id);
  if (!id) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ error: 'ID parameter is missing' })
    };
  }

  // Define parameters for the GetCommand
  const params = {
    TableName: 'Transcriptions',
    Key: { TranscriptId: id }
  };

  try {
    // Fetch the transcript from DynamoDB
    const result = await dynamoDb.send(new GetCommand(params));
    
    // Check if the transcript was found
    if (!result.Item) {
      return {
        statusCode: 404,
        headers: headers,
        body: JSON.stringify({ error: 'Transcript not found' })
      };
    }
    
    // Return the transcript details
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ transcript: result.Item })
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details for debugging
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ 
        error: 'Could not retrieve transcript',
        details: error.message
      })
    };
  }
};
