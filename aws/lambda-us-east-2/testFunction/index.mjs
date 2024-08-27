export const handler = async (event) => {
  const response = {
    statusCode: 200,
    //body: JSON.stringify('Hello from Lambda!'),
    // body: JSON.stringify(event),
    body: JSON.stringify(event.body),
  };
  return response;
};