import { ServerResponse } from "@/lib/api";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request): Promise<NextResponse<ServerResponse<{ image: string }>>> {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Invalid input: Prompt is required" }, { status: 400 });
    }


    const result = await client.images.generate({
      model: "dall-e-3",
      prompt
    });

    if (!result.data || result.data.length === 0) {
      return NextResponse.json({ error: "Image generation failed" }, { status: 400 });
    }


    const generatedImage = result.data[0].url!;

    return NextResponse.json({ image: generatedImage }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

