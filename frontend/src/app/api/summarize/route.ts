import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialise OpenAI
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Define systemPrompt
const systemMessage = 'You are a smart summary generator. Create a concise summary of the conversation based on the given transcript data.';

// POST route
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { transcripts } = body;

    console.log('Received transcripts:', transcripts);
    const transcriptTexts = transcripts.map((t: { text: string; timestamp: string }) =>
      `${new Date(t.timestamp).toLocaleString()}: ${t.text}`
    ).join('\n\n');

    console.log('Processed transcripts:', transcriptTexts);

    console.log('Sending request to OpenAI');
    const completion = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Please summarize the following conversation:\n\n${transcriptTexts}` }
      ],
      // max_tokens: 100,
      // temperature: 0.7,
    });

    console.log('Received response from OpenAI:', completion);

    const summary = completion.choices[0].message.content?.trim() || 'Sorry, I couldn\'t generate a summary this time.';

    console.log('Generated summary:', summary);
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Detailed error in API route:', error);
    return NextResponse.json({ error: 'Failed to generate summary', details: error.message }, { status: 500 });
  }
}
