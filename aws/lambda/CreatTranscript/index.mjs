import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

// Function to generate a unique ID
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// Main handler function
export const handler = async (event) => {
  try {
    // Parse the request body and handle empty body
    const body = JSON.parse(event.body || '{}');
    const { transcriptText } = body;
    const transcriptId = generateUniqueId();

    // Check if transcriptText is provided
    if (!transcriptText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Transcript text is required' }),
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow requests from any origin
          "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
          "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
        }
      };
    }

    // Insert the transcript into DynamoDB
    await dynamoDb.send(new PutCommand({
      TableName: 'Transcriptions',
      Item: {
        TranscriptId: transcriptId,
        TranscriptText: transcriptText
      }
    }));

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ transcriptId, transcriptText }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
      }
    };
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create transcript', details: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
      }
    };
  }
};
