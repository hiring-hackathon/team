import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  const transcriptId = event.pathParameters?.id; // Get the transcript ID from path parameters
  const commentId = event.pathParameters?.commentId;

  // Define parameters to retrieve the item
  const getParams = {
    TableName: 'Comments',
    Key: {
      TranscriptId: transcriptId,
      CommentId: commentId
    }
  };

  try {
    // Retrieve the item to get its details
    const getResult = await dynamoDb.send(new GetCommand(getParams));
    const item = getResult.Item;

    if (!item) {
      return { 
        statusCode: 404, 
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE, GET', // Allow methods
          'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
        },
        body: JSON.stringify({ error: 'Comment not found' }) 
      };
    }

    // Perform the delete operation
    const deleteParams = {
      TableName: 'Comments',
      Key: {
        TranscriptId: transcriptId,
        CommentId: commentId
      }
    };
    await dynamoDb.send(new DeleteCommand(deleteParams));

    // Return detailed information about the deleted item
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE, GET', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
      },
      body: JSON.stringify({
        message: 'Comment deleted successfully',
        item // Include the details of the deleted item
      })
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, DELETE, GET', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
      },
      body: JSON.stringify({ 
        error: 'Could not delete comment', 
        details: error.message 
      }) 
    };
  }
};
