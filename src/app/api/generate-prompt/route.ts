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

    if (!answers || Object.keys(answers).length !== 10) {
      return NextResponse.json({ error: "Invalid input: All 10 answers are required" }, { status: 400 });
    }

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `You are an expert prompt engineer specializing in photorealistic image generation for merchandise. Create a detailed and specific image-generation prompt for a T-shirt design based on the user’s responses.
    
    The output must be a **high-resolution PNG file with a completely transparent background**, containing **only the design itself**—with **no T-shirt, no fabric texture, no human models, no mockups, no overlays, no props, and absolutely no background**.
    
    This must be a production-ready, isolated design artwork prepared for professional screen-printing or DTG-printing. The artwork should be:
    - **Photorealistic and digitally crisp**
    - **Perfectly centered, clean-edged, and sharp**
    - **Free of shadows, borders, artifacts, or glow**
    - **Accurately proportioned** to fit a T-shirt front placement
    - **Exported as a transparent-background image (like a PNG)**—not rendered on any fabric or scene
    
    This design will be laid over a white T-shirt later. It must be rendered as if directly exported from professional design software (e.g., Illustrator, Photoshop, or Procreate).
    
    Incorporate the following user-specified visual elements with maximum clarity and precision:
    
    1. Motif: ${answers.motif}
    2. Motif Action: ${answers.motifAction}
    3. Scene: ${answers.scene}
    4. Additional Elements: ${answers.additionalElements}
    5. Art Style: ${answers.artStyle}
    6. Composition: ${answers.composition}
    7. Color Palette: ${answers.colorPalette}
    8. Vibe: ${answers.vibe}
    9. Mood: ${answers.mood}
    10. Other Details: ${answers.otherDetails}
    
    Do not include any garment, mockup, background, or context in the image. Just the **pure design** on a **fully transparent canvas**, centered and ready for production.
    
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