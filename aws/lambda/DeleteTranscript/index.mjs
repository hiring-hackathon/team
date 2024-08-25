import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  // Extract the TranscriptId from the path parameters
  const { id } = event.pathParameters;  // ID from path parameters

  // Define the parameters for the delete operation
  const params = {
    TableName: 'Transcriptions',
    Key: {
      TranscriptId: id  // Use the TranscriptId from path parameters
    }
  };

  try {
    // Perform the delete operation
    await dynamoDb.send(new DeleteCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Transcript deleted successfully' })
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete transcript', details: error.message })
    };
  }
};
