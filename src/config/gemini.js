import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);



const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    if (typeof prompt !== "string" || prompt.trim() === "") {
      throw new Error("Invalid input: Prompt must be a non-empty string.");
    }

    console.log("Sending input to Gemini API:", prompt);
    


    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    
    if (!result || !result.response) {
      throw new Error("No response received from Gemini API.");
    }

    
    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== "string") {
      throw new Error("Invalid response format. Expected a string.");
    }

    //console.log("Final Processed Response:", text);
    return text;
  } catch (error) {
    console.error("Error in run function:", error.message, error);
    return `Error: ${error.message}`;
  }
}

export default run;




