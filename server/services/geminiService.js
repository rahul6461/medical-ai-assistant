import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeMedicalText = async (extractedText) => {
  try {
    // Updated to use the active stable production model identifier
    const model = ai.getGenerativeModel({
      model: 'gemini-2.5-flash', 
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
      You are a medical AI assistant. Analyze the following medical report text and extract structural data.
      
      You must return your response matching this JSON structure exactly:
      {
        "summary": "A clean, empathetic explanation of what this report means overall.",
        "abnormalValues": ["List item 1 with its unit", "List item 2 with its unit"],
        "keyIndicators": ["Important normal parameters found."],
        "concerns": ["Potential lifestyle/health items to watch out for, keeping it completely objective."]
      }

      Medical Report Text to Analyze:
      "${extractedText}"
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    if (!responseText) {
      throw new Error("Received an empty response payload from Gemini.");
    }

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Detailed Gemini Service Layer Error:", error);
    throw new Error(`Failed to analyze medical report with AI: ${error.message}`);
  }
};