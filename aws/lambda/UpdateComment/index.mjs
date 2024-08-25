import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// Create DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  try {
    // Extract commentId from the path parameters and transcriptId from query string parameters
    const { commentId } = event.pathParameters;
    const { transcriptId } = event.queryStringParameters;
    
    // Extract the updated fields from the request body
    const { commentText, location } = JSON.parse(event.body);  // Ensure body is parsed correctly

    // Define the parameters for the update operation
    const params = {
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
      ReturnValues: 'UPDATED_NEW'
    };

    // Perform the update operation
    const result = await dynamoDb.send(new UpdateCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update comment', details: error.message })
    };
  }
};
