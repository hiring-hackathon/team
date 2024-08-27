import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async () => {
  const params = {
    TableName: 'Transcriptions',
  };

  try {
    // Scan the table to get all items
    const result = await dynamoDb.send(new ScanCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve transcripts', details: error.message })
    };
  }
};
