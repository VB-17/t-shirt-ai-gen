import OpenAI from "openai";

import { FormSchema } from "@/hooks/use-questions-form";
import { NextResponse } from "next/server";
import { ServerResponse } from "@/lib/api";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<NextResponse<ServerResponse<{ prompts: string[] }>>> {
  try {
    const answers: FormSchema = await req.json();
    console.log({ answers })

    if (!answers || Object.keys(answers).length !== 10) {
      return NextResponse.json({ error: "Invalid input: All 10 answers are required" }, { status: 400 });
    }

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `You are an expert prompt engineer specializing in photorealistic image generation for merchandise. Create **three distinct and detailed image-generation prompts** for **T-shirt designs**, all based on the same user responses below.

Each prompt must describe a **unique variation** of the design concept while strictly adhering to the following requirements:

- The output must be a **high-resolution PNG file with a completely transparent background**
- Each image must contain **only the design itself**—with **no T-shirt, no fabric texture, no human models, no mockups, no overlays, no props, and absolutely no background**
- The artwork must be:
  - **Photorealistic and digitally crisp**
  - **Perfectly centered, clean-edged, and sharp**
  - **Free of shadows, borders, artifacts, or glow**
  - **Accurately proportioned** for standard front placement on a T-shirt
  - **Rendered as if directly exported from professional design software (e.g., Illustrator, Photoshop, or Procreate)**

These designs will be **used for production and laid over a white T-shirt later**. Treat the transparent canvas as a final artwork export.

Each of the 3 prompts should use **highly specific, vivid, and visual language**, reflecting the user inputs below, but expressed in three different artistic compositions or creative interpretations.

User Inputs:
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

Do not include any garment, mockup, background, or context in the image. Just the **pure isolated design**, centered and ready for screen printing or DTG printing.

Return only the three final prompts as cleanly formatted strings—labeled Prompt 1, Prompt 2, and Prompt 3. Do not return explanations, JSON, or metadata—just the three prompt strings.`
    });


    const data = response.output_text;
    const processedData = data.split("\n\n").map(item => item.split("\n")[1]);

    return NextResponse.json({ prompts: processedData }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate-prompt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}