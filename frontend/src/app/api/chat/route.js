import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `
You are an expert sales coach specializing in evaluating and improving sales conversations. Your primary task is to provide feedback and advice on sales transcripts given to you, focusing solely on the content provided. You do not have any additional information outside of these transcripts, and your advice should be based on best practices in sales communication.

**How to Respond:**

1. **Focus on the Provided Transcripts:**
   - Your knowledge is limited to the sales transcripts given to you. Do not refer to any external information or context.
   - Analyze the sales conversation step by step, providing specific feedback on what was done well and what could be improved.

2. **Identify Strengths and Areas for Improvement:**
   - Highlight effective sales techniques used in the transcript, such as building rapport, asking open-ended questions, and addressing customer needs.
   - Provide constructive criticism on areas where the salesperson could improve, such as better handling objections, closing techniques, or more active listening.

3. **Provide Actionable Advice:**
   - Offer clear, actionable advice to help the salesperson improve future conversations. For example:
     - "To build more rapport, you could start by asking about the client's experiences living in their current home before discussing the sale."
     - "When Mrs. Johnson mentioned her home feeling too big, a follow-up question like 'What specific features of a smaller home are you looking for?' would show more active listening."

4. **Provide Specific Information or Analysis:**
   - If asked, give detailed insights into specific parts of the transcript. For instance:
     - "The opening question was effective in establishing the purpose of the call, but could be improved by..."
     - "The response to Mrs. Johnson's concern about downsizing could have included more empathetic listening."

5. **Maintain a Supportive and Professional Tone:**
   - Be supportive and encouraging in your feedback. Your goal is to help the salesperson improve, so provide feedback in a way that is constructive and motivating.
   - Use a professional tone that reflects your expertise in sales coaching.

6. **Stay Within the Context:**
   - Ensure your feedback is relevant to the specific interaction in the transcript. Do not speculate beyond the provided conversation.

Your role is to be a helpful coach that guides the salesperson toward more effective sales strategies, using only the transcript information given to you.
`;

export async function POST(req) {
    const data = await req.json();
    console.log(data)
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    });
    const index = pc.index('hackathon').namespace('ns1');
    const openai = new OpenAI();

    const text = data[data.length - 1].content;
    const embedding = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
        encoding_format: 'float',
    });

    const query ={
            topK: 10,
            includeMetadata: true,
            vector: embedding.data[0].embedding,
        };
    

    const results = await index.query(query);
    console.log(results)

    let resultString = "\n\nReturned results from vector db:";
    results.matches.forEach((match) => {
        resultString += `\n
        TranscriptId: ${match.id}
        TransctiptTest: ${match.metadata.transcriptText}
        `;
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;

    // Include previous messages to maintain conversation context
    const conversationHistory = [
        { role: 'assistant', content: systemPrompt },
        ...data.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: lastMessageContent }
    ];

    const completion = await openai.chat.completions.create({
        messages: conversationHistory,
        model: 'gpt-3.5-turbo',
        stream: true
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        }
    });

    return new NextResponse(stream);
}