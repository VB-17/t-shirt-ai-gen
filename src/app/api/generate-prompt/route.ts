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
      input: `You are an expert prompt engineer specializing in photorealistic image generation for merchandise. Create a detailed and specific image-generation prompt for a T-shirt design based on the user’s responses. 
    
    The output must always be a **high-resolution photorealistic image** of a **plain white T-shirt**, completely **laid flat on a neutral light gray or off-white studio background**, with **soft, natural lighting and visible fabric texture** (such as cotton wrinkles and folds). 
    
    **The T-shirt must face the viewer directly**, centered in the image, and there must be **nothing else visible—no models, no props, no background clutter**. 
    
    The design must appear **directly printed on the T-shirt**, conforming to the **natural folds, shadows, and contours of the fabric**, and must be placed **exactly** according to the user’s placement instructions. The print should **blend seamlessly** as if screen-printed or DTG-printed on the fabric. 
    
    The design should match all 13 user-specified elements below. Avoid vague terms. Use concrete visual language. This is not a mockup. The result must look like a professional studio photograph of a real printed T-shirt.
    
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
    
    Placement instructions: The design must be ${placementInstruction}, precisely proportioned and aligned as if screen-printed onto the laid-flat white T-shirt.
    
    Return only the final prompt as a cleanly formatted string. Do not return explanations, JSON, or metadata—just the prompt string for the image generation model.`
    });
    const generatedResponse = response.output_text;

    console.log({ generatedResponse })
    return NextResponse.json({ prompt: generatedResponse }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-prompt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

