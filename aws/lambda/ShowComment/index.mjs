import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  const { transcriptId, commentId } = event.pathParameters;

  // Define the parameters for the query operation
  const params = {
    TableName: 'Comments',
    KeyConditionExpression: 'TranscriptId = :id and CommentId = :commentId',
    ExpressionAttributeValues: {
      ':id': transcriptId,
      ':commentId': commentId
    }
  };

  try {
    // Perform the query operation
    const result = await dynamoDb.send(new QueryCommand(params));
    if (result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Comment not found' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve comment', details: error.message })
    };
  }
};
