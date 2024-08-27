import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const { transcriptText } = JSON.parse(event.body);

  const params = {
    TableName: 'Transcriptions',
    Key: { TranscriptId: id },
    UpdateExpression: 'set TranscriptText = :t',
    ExpressionAttributeValues: {
      ':t': transcriptText
    },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await dynamoDb.send(new UpdateCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "PUT, OPTIONS", // Allow PUT and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update transcript', details: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "PUT, OPTIONS", // Allow PUT and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
      }
    };
  }
};
