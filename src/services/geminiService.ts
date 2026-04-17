import { GoogleGenAI } from "@google/genai";
import { Question } from "../data";

const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function generateQuestion(category: string, prompt?: string): Promise<Partial<Question>> {
  const client = getGeminiClient();
  
  const systemPrompt = `You are an expert technical interviewer and content creator.
  Generate a technical interview question and a detailed, high-quality answer.
  Category: ${category}
  ${prompt ? `Specific requirements/topic: ${prompt}` : `Topic: Choose a relevant, important concept in ${category}.`}
  
  You MUST provide the question and answer in 3 languages: Vietnamese (vi), English (en), and Japanese (ja).
  The 'question' and 'answer' root properties should contain the Vietnamese version as the default.
  
  Return the response as a JSON object with the following structure:
  {
    "question": "The interview question in Vietnamese",
    "answer": "The detailed answer in Markdown format in Vietnamese",
    "translations": {
      "vi": {
        "question": "The interview question in Vietnamese",
        "answer": "The detailed answer in Markdown format in Vietnamese"
      },
      "en": {
        "question": "The interview question in English",
        "answer": "The detailed answer in Markdown format in English"
      },
      "ja": {
        "question": "The interview question in Japanese",
        "answer": "The detailed answer in Markdown format in Japanese"
      }
    },
    "difficulty": "Easy" | "Medium" | "Hard",
    "tags": ["tag1", "tag2"]
  }`;

  const response = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: systemPrompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  const text = response.text?.trim();
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text);
}

export async function generateImageForAnswer(answer: string): Promise<string> {
  const client = getGeminiClient();

  // Step 1: Generate a prompt describing the answer
  const promptResponse = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert at creating prompts for image generation models. 
    Read the following technical answer and write a short, descriptive prompt (max 2 sentences) 
    that would generate a suitable, professional, and clear illustration or diagram concept for this topic.
    Do not include any text in the image prompt, just describe the visual elements.
    
    Answer:
    ${answer.substring(0, 1000)}...
    
    Prompt:`,
  });

  const imagePrompt = promptResponse.text?.trim() || "A professional technical illustration";

  // Step 2: Generate the image using gemini-2.5-flash-image
  const imageResponse = await client.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: imagePrompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      }
    }
  });

  const parts = imageResponse.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      return `data:image/jpeg;base64,${base64EncodeString}`;
    }
  }

  throw new Error("No image generated");
}

export async function semanticSearch(query: string, questions: {id: string, question: string, tags: string[]}[]): Promise<string[]> {
  const client = getGeminiClient();
  
  const prompt = `You are an AI search assistant for a technical interview prep platform.
The user is asking a conversational question: "${query}"

Here is the list of available questions in JSON format:
${JSON.stringify(questions)}

Analyze the user's intent and find the most relevant questions.
Return a JSON array of strings containing ONLY the 'id's of the top 5 most relevant questions, ordered by relevance.
If none are relevant, return an empty array [].`;

  const response = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  const text = response.text?.trim();
  if (!text) return [];
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse semantic search response", e);
    return [];
  }
}
