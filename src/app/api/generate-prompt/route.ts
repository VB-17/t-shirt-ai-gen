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
      input: `You are an expert prompt engineer specializing in image generation. Based on the user's answers to 13 design-related questions, generate a highly descriptive, specific, and professional prompt intended for creating a T-shirt design image.

      The final output should depict a white T-shirt **fully laid flat and facing the viewer**, with realistic fabric texture, soft shadows, and natural lighting. The design must appear **accurately printed** on the T-shirt in the exact position described, blending naturally with the folds and contours of the fabric. This is not a digital layout mockup—imagine a real photo of a white T-shirt with the artwork applied.
      
      Integrate all the relevant details from the user's input, including:
      - Motif and its action or pose
      - Scene and setting
      - Additional artistic elements
      - Art style (e.g., watercolor, cyberpunk, line art)
      - Composition (e.g., centered, minimal, full-width)
      - Color palette (specific colors or tones)
      - Vibe and mood
      - T-shirt design shape (e.g., circular, rectangular, irregular)
      - Placement details (provided below)
      - Target audience (style and tone should match)
      
      Avoid vague or generic phrases. Be precise and rich in detail. Ensure the description reads like a professional brief for an image-generation model (e.g., Midjourney, DALL·E, etc.).
      
      User Answers:
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
      
      Placement instructions: The design must be ${placementInstruction}, printed cleanly and proportionally on the white T-shirt.
      
      Return only the final image-generation prompt as a single formatted string, no explanation or surrounding text.
      `
    });

    const generatedResponse = response.output_text;

    console.log({ generatedResponse })
    return NextResponse.json({ prompt: generatedResponse }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-prompt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

