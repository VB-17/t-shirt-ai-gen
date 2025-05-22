import { ServerResponse } from "@/lib/api";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: Request): Promise<NextResponse<ServerResponse<{ images: string[] }>>> {
  try {
    const { prompts } = await req.json();

    if (!prompts) {
      return NextResponse.json({ error: "Invalid input: Prompts is required" }, { status: 400 });
    }


    const generatedImages: string[] = [];



    for (const prompt of prompts) {
      const result = await client.images.generate({
        model: "gpt-image-1",
        prompt,

      });

      if (!result.data || result.data.length === 0) {
        return NextResponse.json({ error: "Image generation failed" }, { status: 400 });
      }

      const image_b64 = result.data[0].b64_json!;

      generatedImages.push(image_b64);
    }



    return NextResponse.json({ images: generatedImages }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

