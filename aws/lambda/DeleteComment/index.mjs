import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient , DeleteCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
  const { commentId } = event.pathParameters;
  const { transcriptId } = event.queryStringParameters;

  const params = {
    TableName: 'Comments',
    Key: {
      TranscriptId: transcriptId,
      CommentId: commentId
    }
  };

  try {
    // Perform the delete operation
    await dynamoDb.send(new DeleteCommand(params));
    return { 
      statusCode: 200, 
      body: JSON.stringify({ message: 'Comment deleted successfully' }) 
    };
  } catch (error) {
    console.error('Error:', error); // Log the error details
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        error: 'Could not delete comment', 
        details: error.message 
      }) 
    };
  }
};
