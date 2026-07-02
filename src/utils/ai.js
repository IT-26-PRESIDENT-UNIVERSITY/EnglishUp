const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; 
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.0-flash:generateContent";


export async function evaluateWriting(prompt, text, taskType = 2) {
  if (!OPENROUTER_API_KEY) throw new Error("OpenRouter API Key missing");

  const systemInstruction = `You are a certified, strict IELTS Examiner evaluating an Academic Writing Task ${taskType} essay. 
The student was given the prompt: "${prompt}".

Thoroughly evaluate the student's submission based strictly on the four official IELTS assessment criteria.
You must return your evaluation EXACTLY as a raw JSON object. Do not include markdown wraps like \`\`\`json. 

JSON structure required:
{
  "score": 0.0,
  "taskAchievement": {
    "score": 0.0,
    "critique": "Detailed feedback focusing on arguments, overview, or details based on Task ${taskType} requirements."
  },
  "coherenceCohesion": {
    "score": 0.0,
    "critique": "Detailed feedback on paragraphing, cohesive devices, and logical progression."
  },
  "vocabScore": {
    "score": 0.0,
    "critique": "Detailed feedback on Lexical Resource: range, precision, vocabulary choices, and spelling errors."
  },
  "grammarScore": {
    "score": 0.0,
    "critique": "Detailed feedback on Grammatical Range and Accuracy: sentence structures, complex grammar usage, and punctuation errors."
  },
  "message": "A 2-3 sentence summary of the essay's major strengths and primary areas for immediate improvement.",
  "correctedEssay": "The student's original essay rewritten with inline corrections or improvements highlighted."
}
All scores must follow standard IELTS band scores (0.0 to 9.0 in increments of 0.5).`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://president.ac.id", 
      "X-Title": "EnglishUp President University"
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: `Here is my essay text:\n\n${text}` }
      ],
      temperature: 0.3, 
      response_format: { type: "json_object" }
    })
  });

  if (!res.ok) {
    throw new Error("Failed to evaluate writing with OpenRouter");
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
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
      "id": 1,
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

  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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