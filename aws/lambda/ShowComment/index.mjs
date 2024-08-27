import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  // Extract path parameters
  const transcriptId = event.pathParameters?.id; // Get the transcript ID from path parameters
  const commentId = event.pathParameters?.commentId; // Get the comment ID from path parameters

  // Validate input
  if (!transcriptId || !commentId) {
    return { 
      statusCode: 400, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Invalid input: TranscriptId and CommentId are required' }) 
    };
  }

  // Define the parameters for the GetCommand
  const params = {
    TableName: 'Comments',
    Key: {
      TranscriptId: transcriptId,
      CommentId: commentId
    }
  };

  try {
    // Perform the get operation
    const { Item } = await dynamoDb.send(new GetCommand(params));

    if (Item) {
      // Return the retrieved item with CORS headers
      return { 
        statusCode: 200, 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, GET',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ item: Item })
      };
    } else {
      // Return a 404 if no item is found
      return { 
        statusCode: 404, 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS, GET',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'Comment not found' }) 
      };
    }
  } catch (error) {
    console.error('Error:', error); // Log error details
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Could not retrieve comment', details: error.message }) 
    };
  }
};
