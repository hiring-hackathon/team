import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // Log the entire event

  // Ensure you're using the correct path parameter name
  const id = event.pathParameters?.id; // Use optional chaining to handle undefined cases

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Id is required' }),
    };
  }

  const params = {
    TableName: 'Comments',
    KeyConditionExpression: 'TranscriptId = :id',
    ExpressionAttributeValues: {
      ':id': id // Ensure this matches the schema type in DynamoDB
    }
  };

  console.log('DynamoDB query params:', JSON.stringify(params, null, 2)); // Log query params

  try {
    // Query the database to get all comments for the specific transcript
    const result = await dynamoDb.send(new QueryCommand(params));
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(result.Items),  // Return all comments
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Could not retrieve comments', details: error.message }),
    };
  }
};
