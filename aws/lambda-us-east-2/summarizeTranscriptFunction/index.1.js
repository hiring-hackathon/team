import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY
});

export const handler = async (event) => {
    console.log('Event:', JSON.stringify(event));
    console.log('Event body:', event.body);
    try {
        //boiler plate code
        
        // Make an HTTP GET request using axios
        //const response = await axios.get('https://api.example.com/data');
        
        // Log the response data
        //console.log('Data from API:', response.data);
        
        // Create a response message
        //const responseMessage = {
            //message: 'Request to external API was successful!',
            //data: response.data
        //};
        
        let body;
        if(event.body) {
            // if the event has a body property, it's from API Gateway
            body = JSON.parse(event.body);
        }
        else {
            // if there's no body property, assume it's a direct Lambda invocation
            body = event;
        }
        
        console.log('Parsed body: ', JSON.stringify(body));
        
        // const body = event;
        // console.log(body);
        
        const textToSummarize = body.text;
        console.log('textToSummarize: ', textToSummarize);
        
        if(!textToSummarize) {
            throw new Error('No message provided to summarize');
        }
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-4" if you have access
            messages: [
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": `Please summarize the following text: ${textToSummarize}`}
            ]
        });
        
        // Extract the summary from the OpenAI response
        console.log('completion: ', JSON.stringify(completion));
        //console.log('completetion: ', completion);
        // console.log('completion message obj: ', completion.choices[0].message);
        const summary = completion.choices[0].message.content;
        console.log('summary: ', summary);
        
        // Return a successful response
        return {
            statusCode: 200,
            //body: JSON.stringify(responseMessage),
            
            //for AWS testing
            //body: JSON.stringify(event),
            
            //for remote endpoint access
            //body: JSON.stringify(event.body),
            
            body: JSON.stringify({
                //originalMessage: textToSummarize,
                // originalMessage2: event.message,
                summary: summary,
                // completion: completion,
            }),
            // body: JSON.stringify({
            //     // message string
            //     // event_body_message: event.body.message,
                
            //     // message object
            //     //event_body: event.body,
                
            //     // event_message: event.message,
            //     // event: event,
            // }),
        };
    } catch (error) {
        // Handle any errors and return a 500 response
        console.error('Error making request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'An error occurred while processing your request.' }),
        };
    }
};
