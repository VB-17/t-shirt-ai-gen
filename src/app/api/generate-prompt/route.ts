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
        placementInstruction = "designed to be printed prominently on the center of the chest";
        break;
      case "ポケットの位置":
        placementInstruction = "designed to be printed in a smaller size near the pocket area on the right chest";
        break;
      case "全面印刷（Tシャツ全体に広がる）":
        placementInstruction = "designed to be printed across the entire front of the T-shirt, covering most of the surface";
        break;
      default:
        return NextResponse.json({ error: "Invalid placement value" }, { status: 400 });
    }

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `You are an expert prompt engineer specializing in photorealistic image generation for merchandise. Create a detailed and specific image-generation prompt for a T-shirt design based on the user’s responses. 
    
    The output must be a **high-resolution, photorealistic digital artwork** of the **T-shirt design only**, presented on a **completely transparent background**. The image must consist **solely of the design itself**, with **no T-shirt, no fabric texture, no human models, no mockups, no overlays, no props, and no background**—**only the isolated design** as if exported directly from a professional design software. It must be perfectly centered, sharp, clean, and ready for professional screen-printing or DTG-printing.
    
    This image will be used for production purposes and must be:
    - **Crisp, detailed, and vivid**
    - **Accurately shaped and proportioned** for its specified placement on a T-shirt
    - **Without any outer shadows, borders, or artifacts**
    - Fully compliant with print shop specifications
    
    The design must reflect all 13 user-specified elements below with precision. Avoid vagueness. Use highly specific visual language. The result should look like a finalized, production-ready artwork.
    
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
    
    Placement instructions: The design must be ${placementInstruction}, perfectly centered and dimensioned as if directly exported for print—**do not render it on or over a T-shirt**.
    
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