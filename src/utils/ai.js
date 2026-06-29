const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent";

export async function evaluateWriting(prompt, text) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API Key missing");

  const systemInstruction = `You are an expert English teacher evaluating a student's essay. 
The student was given the prompt: "${prompt}".
Analyze their text. You must respond in STRICT JSON format exactly matching this schema:
{
  "score": <number 0-100 overall score>,
  "grammarScore": <number 0-100>,
  "vocabScore": <number 0-100>,
  "message": "<string: 2-3 sentences of constructive feedback, pointing out specific mistakes if any>"
}
Do not include markdown blocks or any other text outside the JSON.`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: text }]
      }
    ],
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error("Failed to evaluate writing");
  }

  const data = await res.json();
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
}

export async function generateReadingContent(levelTitle) {
  if (!GEMINI_API_KEY) throw new Error("Gemini API Key missing");

  const systemInstruction = `You are an English test creator. Create a reading comprehension exercise suitable for a student at level: "${levelTitle}".
Respond in STRICT JSON format exactly matching this schema:
{
  "title": "<string: catchy title of the story>",
  "text": "<string: 3-4 paragraphs of reading material>",
  "questions": [
    {
      "id": <number 1, 2, 3>,
      "q": "<string: multiple choice question>",
      "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
      "answer": "<exact string from options that is correct>"
    }
  ]
}
Ensure there are exactly 3 questions. Do not include markdown blocks outside the JSON.`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: "Generate a reading exercise." }]
      }
    ],
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error("Failed to generate reading content");
  }

  const data = await res.json();
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
}
