import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 },
      );
    }

    const buffer = await image.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Analyze this chat screenshot and extract the conversation into a JSON array of message objects.
      Each object must have the following keys:
      - "id" (number, start from 0)
      - "sender" (string, if it's the right-side bubble infer as "Me" or the user, left side is the other person's name)
      - "content" (string, the message text)
      - "type" (string, strictly "text" or "system")

      Output ONLY a valid JSON array, without any markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: image.type,
        },
      },
    ]);

    const responseText = result.response.text();

    let parsedMessages = [];
    try {
      // Remove any markdown code block wrappers if they exist
      const cleanText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsedMessages = JSON.parse(cleanText);

      // Provide a default timestamp for frontend compatibility
      parsedMessages = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date().toISOString(),
      }));
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", responseText);
      return NextResponse.json(
        { error: "Failed to parse conversation from image." },
        { status: 500 },
      );
    }

    return NextResponse.json(parsedMessages);
  } catch (error) {
    console.error("Image Parse Error:", error);
    return NextResponse.json(
      { error: "An error occurred while parsing the image." },
      { status: 500 },
    );
  }
}
