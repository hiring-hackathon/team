import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const handler = async (event) => {
  const { transcriptText } = JSON.parse(event.body);
  const transcriptId = generateUniqueId();

  const params = {
    TableName: 'Transcriptions',
    Item: {
      TranscriptId: transcriptId,
      TranscriptText: transcriptText
    }
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Transcript created successfully',
        transcriptId: transcriptId, // Include the generated ID in the response
        transcriptText: transcriptText // Include the transcript text in the response
      })
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not create transcript',
        details: error.message
      })
    };
  }
};
