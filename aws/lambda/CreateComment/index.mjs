import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const handler = async (event) => {
  // Extract data from the event body
  const { commentText, location } = JSON.parse(event.body);
  const transcriptId = event.pathParameters?.id; // Get the ID from path parameters
  const commentId = generateUniqueId();
  const createdAt = new Date().toISOString();
 
  const item = {
    TranscriptId: transcriptId,
    CommentId: commentId,
    CommentText: commentText,
    Location: location, // Ensure this matches the expected schema
    CreatedAt: createdAt
  };

  const params = {
    TableName: 'Comments',
    Item: item
  };

  try {
    // Perform the put operation
    await dynamoDb.send(new PutCommand(params));
    
    // Return the inserted item with CORS headers
    return { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ item: item })
    };
  } catch (error) {
    console.error('Error:', error); // Log error details
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Could not create comment', details: error.message }) 
    };
  }
};
