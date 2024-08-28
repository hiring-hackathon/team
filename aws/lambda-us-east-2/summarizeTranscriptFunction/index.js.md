## [index.js](index.js)

### Lambda function for summarizing sales conversations using OpenAI's GPT model

This code defines an AWS Lambda function that processes incoming events to summarize sales conversations using OpenAI's GPT-3.5-turbo model. The function starts by importing necessary modules, including `axios` for making HTTP requests and `OpenAI` for interacting with OpenAI's API. The OpenAI instance is initialized with an API key from environment variables.

The main function, `handler`, is an asynchronous function that logs the incoming event and its body. It then parses the event body, which can come from either an API Gateway or a direct Lambda invocation. The parsed body is expected to contain a `text` field with the conversation to be summarized.

If the `text` field is missing, the function throws an error. Otherwise, it sends a request to OpenAI's API to generate a summary of the conversation. The prompt instructs the model to summarize the conversation in a specific format, highlighting what the employee did well, areas for improvement, and advice for better sales strategies.

The function logs the response from OpenAI and extracts the summary. It then returns a successful HTTP response with the summary included in the body. If any errors occur during processing, the function catches them and returns a 500 HTTP response with an error message.

[Back to (root)](#root) | [Back to top](#table-of-contents)
