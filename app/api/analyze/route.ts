import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 },
      );
    }

    if (!text) {
      return NextResponse.json(
        { error: "No conversation text provided." },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analyze the following chat conversation and provide insights. Respond strictly in JSON format with the following keys:
- "sentiment": A short sentence describing the overall emotional tone of the conversation.
- "summary": A brief paragraph summarizing the main points and trajectory of the discussion.
- "topics": A comma-separated list of the 3-5 most frequently discussed subjects.

Do not include any Markdown formatting or extra text outside of the JSON object.

Conversation context (may be truncated):
${text.substring(0, 60000)}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let parsedData;
    try {
      // Extract JSON if it got wrapped in markdown block
      const jsonMatch =
        responseText.match(/```json\n([\s\S]*?)\n```/) ||
        responseText.match(/({[\s\S]*})/);
      const jsonString = jsonMatch
        ? jsonMatch[1] || jsonMatch[0]
        : responseText;
      parsedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON:", responseText);
      parsedData = {
        sentiment: "Could not parse sentiment.",
        summary: responseText.substring(0, 500),
        topics: "Could not extract topics.",
      };
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("API Analysis Error:", error);
    return NextResponse.json(
      { error: "An error occurred while analyzing the conversation." },
      { status: 500 },
    );
  }
}
