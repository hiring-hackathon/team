import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  try {
    // Extract commentId from the path parameters and transcriptId from query string parameters
    const transcriptId = event.pathParameters?.id; // Get the transcript ID from path parameters
    const commentId = event.pathParameters?.commentId;

    // Extract the updated fields from the request body
    const { commentText, location } = JSON.parse(event.body);  // Ensure body is parsed correctly

    // Define the parameters for the update operation
    const updateParams = {
      TableName: 'Comments',
      Key: {
        TranscriptId: transcriptId,
        CommentId: commentId
      },
      UpdateExpression: 'set #text = :text, #loc = :loc',
      ExpressionAttributeNames: {
        '#text': 'CommentText',
        '#loc': 'Location'
      },
      ExpressionAttributeValues: {
        ':text': commentText,
        ':loc': location
      },
      ReturnValues: 'ALL_NEW' // Return all attributes after the update
    };

    // Perform the update operation
    const updateResult = await dynamoDb.send(new UpdateCommand(updateParams));

    // Retrieve the updated item to include all attributes
    const getParams = {
      TableName: 'Comments',
      Key: {
        TranscriptId: transcriptId,
        CommentId: commentId
      }
    };
    
    const getResult = await dynamoDb.send(new GetCommand(getParams));
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, GET', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
      },
      body: JSON.stringify(getResult.Item) // Return all attributes including CreatedAt
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST, PUT, GET', // Allow methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
      },
      body: JSON.stringify({ error: 'Could not update comment', details: error.message })
    };
  }
};
