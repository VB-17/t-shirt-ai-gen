import OpenAI from "openai";

import { FormSchema } from "@/hooks/use-questions-form";
import { NextResponse } from "next/server";
import { ServerResponse } from "@/lib/api";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<NextResponse<ServerResponse<{ prompt: string }>>> {
  try {
    const answers: FormSchema = await req.json();

    console.log({ answers })


    if (!answers || Object.keys(answers).length !== 13) {
      return NextResponse.json({ error: "Invalid input: All 13 answers are required" }, { status: 400 });
    }

    let placementInstruction = "";
    switch (answers.placement) {
      case "胸の中央":
        placementInstruction = "printed prominently on the center of the chest";
        break;
      case "ポケットの位置":
        placementInstruction = "printed in a smaller size near the pocket area on the right chest";
        break;
      case "全面印刷（Tシャツ全体に広がる）":
        placementInstruction = "printed across the entire front of the T-shirt, covering most of the surface";
        break;
      default:
        return NextResponse.json({ error: "Invalid placement value" }, { status: 400 });
    }


    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `
      You are an expert prompt engineer for image generation. Based on the user's answers to 13 questions, create a concise, descriptive, and high-quality prompt for generating a T-shirt design image. The prompt should be optimized for image generation, incorporating all relevant details from the answers, including the T-shirt placement. Ensure the prompt is clear, specific, and includes the art style, color palette, vibe, mood, composition, shape, and placement details. Avoid vague terms and prioritize clarity. The image should depict the design printed on a high-quality white T-shirt with realistic fabric texture and lighting, fitting the specified placement naturally.

            The answers are:
            1. Motif: ${answers.motif}
            2. Motif Action: ${answers.motifAction}
            3. Scene: ${answers.scene}
            4. Additional Elements: ${answers.additionalElements}
            5. Art Style: ${answers.artStyle}
            6. Composition: ${answers.composition}
            7. Color Palette: ${answers.colorPalette}
            8. Vibe: ${answers.vibe}
            9. Mood: ${answers.mood}
            10. Placement: ${answers.placement}
            11. Shape: ${answers.shape}
            12. Decorations: ${answers.decorations}
            13. Target Audience: ${answers.targetAudience}

            The placement instruction is: ${placementInstruction}

            Return only the prompt as a single string, formatted for image generation.`
    });

    const generatedResponse = response.output_text;

    console.log({ generatedResponse })
    return NextResponse.json({ prompt: generatedResponse }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-prompt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

