import { NextResponse } from 'next/server';
import axios from 'axios';
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.Index("hackathon");

// Process each transcript and generate embeddings

async function processTranscript(transcriptions) {
  try {
    const results = [];

    for (const transcript of transcriptions) {
      const transcriptText = transcript.TranscriptText;
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: transcriptText,
        encoding_format: "float",
      });

      const embedding = embeddingResponse.data[0].embedding;
      console.log(`Embedding: ${embedding}`);

      results.push({
        values: embedding,
        id: transcript.TranscriptId,
        metadata: {
          transcriptText: transcriptText
        },
      });
    }

    return results;
  } catch (error) {
    console.error(`Error processing transcripts:`, error);
    throw new Error(`Failed to process transcripts`);
  }
}

// Handle the POST request
export async function POST(req, res) {
  try {
    const { data } = await axios.get('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions');
    const transcriptions = JSON.parse(data.body);
    console.log(`Data to be upserted into Pinecone:`, transcriptions);

    const processedData = await processTranscript(transcriptions);
    await index.namespace("ns1").upsert(processedData);

    return NextResponse.json({
      message: `Scraping successful!`,
      success: true,
    });
  } catch (error) {
    console.error(`Error during POST request processing:`, error);
    return NextResponse.json({
      message: `Scraping failed!`,
      success: false,
    });
  }
}
