import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  const { transcriptId } = event.pathParameters;

  // Define the parameters for the query operation
  const params = {
    TableName: 'Comments',
    KeyConditionExpression: 'TranscriptId = :id',
    ExpressionAttributeValues: {
      ':id': transcriptId
    }
  };

  try {
    // Perform the query operation
    const result = await dynamoDb.send(new QueryCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve comments', details: error.message })
    };
  }
};
