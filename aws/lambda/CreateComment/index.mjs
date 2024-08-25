import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";


// Create DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());
const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const handler = async (event) => {
  // Extract data from the event body
  const { transcriptId, commentText, location } = JSON.parse(event.body);
  const commentId = generateUniqueId();
 
  const params = {
    TableName: 'Comments',
    Item: {
      TranscriptId: transcriptId,
      CommentId: commentId,  // Generate a unique CommentId
      CommentText: commentText,
      Location: location
    }
  };

  try {
    // Perform the put operation
    await dynamoDb.send(new PutCommand(params));
    return { statusCode: 200, body: JSON.stringify({ message: 'Comment created successfully' }) };
  } catch (error) {
    console.error('Error:', error); // Log error details
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not create comment', details: error.message }) };
  }
};
