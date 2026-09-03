import { getRandomMixedGrammarQuestions, getRandomLessonQuestions } from "../data/grammarQuestionsBank";

const GUTSAI_API_KEY = import.meta.env.VITE_GUTSAI_API_KEY || "sk-guts-83d0dcdcfcf1dc76ae8aaf946815626cbf04ebd3";
const GUTSAI_BASE_URL = import.meta.env.VITE_GUTSAI_BASE_URL || "https://api.gutsai.id/v1";
const PREFERRED_MODEL = import.meta.env.VITE_AI_MODEL || "glm-5.3-flash";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Provider & model candidates
const AI_PROVIDERS = [
  {
    name: "Guts AI",
    baseUrl: GUTSAI_BASE_URL,
    apiKey: GUTSAI_API_KEY,
    models: [PREFERRED_MODEL, "minimax-m2.7", "qwen-3.8-max", "glm-5.3-flash"]
  },
  {
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
    models: ["nvidia/nemotron-3-super-120b-a12b:free", "minimax/minimax-m2.7:free", "liquid/lfm-2.5-2.6b:free"]
  }
];

function fetchWithTimeout(url, options, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

function cleanJSON(rawContent) {
  let content = rawContent.trim();
  // Remove markdown wraps
  content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // Find valid JSON envelope
  const firstBracket = content.indexOf('{');
  const firstSquare = content.indexOf('[');
  let startIdx = -1;
  if (firstBracket !== -1 && (firstSquare === -1 || firstBracket < firstSquare)) {
    startIdx = firstBracket;
  } else if (firstSquare !== -1) {
    startIdx = firstSquare;
  }

  if (startIdx !== -1) {
    const lastBracket = content.lastIndexOf('}');
    const lastSquare = content.lastIndexOf(']');
    const endIdx = Math.max(lastBracket, lastSquare);
    if (endIdx > startIdx) {
      content = content.substring(startIdx, endIdx + 1);
    }
  }

  return JSON.parse(content);
}

async function callAI(systemInstruction, userPrompt, temperature = 0.8) {
  let lastError = null;

  for (const provider of AI_PROVIDERS) {
    if (!provider.apiKey) continue;

    for (const model of provider.models) {
      try {
        const res = await fetchWithTimeout(`${provider.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://president.ac.id",
            "X-Title": "EnglishUp President University"
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemInstruction },
              { role: "user", content: userPrompt }
            ],
            temperature
          })
        }, 15000);

        if (!res.ok) {
          lastError = new Error(`${provider.name} (${model}) returned HTTP ${res.status}`);
          continue;
        }

        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content?.trim();
        if (!rawContent) {
          lastError = new Error(`${provider.name} (${model}) returned empty content`);
          continue;
        }

        return cleanJSON(rawContent);
      } catch (err) {
        lastError = err;
      }
    }
  }

  throw lastError || new Error("All AI providers and models failed");
}

export async function evaluateWriting(prompt, text, taskType = 2) {
  const systemInstruction = `You are a certified, strict IELTS Examiner evaluating an Academic Writing Task ${taskType} essay. 
The student was given the prompt: "${prompt}".

Thoroughly evaluate the student's submission based strictly on the four official IELTS assessment criteria.
Return EXACTLY a raw JSON object. Do not include markdown formatting.

JSON structure required:
{
  "score": 0.0,
  "taskAchievement": {
    "score": 0.0,
    "critique": "Detailed feedback on Task ${taskType} requirements."
  },
  "coherenceCohesion": {
    "score": 0.0,
    "critique": "Detailed feedback on paragraphing and cohesion."
  },
  "vocabScore": {
    "score": 0.0,
    "critique": "Detailed feedback on Lexical Resource."
  },
  "grammarScore": {
    "score": 0.0,
    "critique": "Detailed feedback on Grammatical Range and Accuracy."
  },
  "message": "A 2-3 sentence summary of strengths and areas for improvement.",
  "correctedEssay": "The student's original essay rewritten with inline corrections."
}
All scores must follow standard IELTS band scores (0.0 to 9.0 in increments of 0.5).`;

  try {
    return await callAI(systemInstruction, `Here is my essay text:\n\n${text}`, 0.3);
  } catch (err) {
    console.error("evaluateWriting AI error:", err);
    throw err;
  }
}

export async function generateDynamicText(type, title, questions) {
  const isReading = type === 'reading';
  const systemInstruction = `You are an expert English teacher. Create a ${isReading ? 'reading comprehension passage' : 'listening transcript / dialogue'} for the topic: "${title}".
REQUIREMENTS:
1. ${isReading ? 'The passage MUST be at least 7 paragraphs long.' : 'The transcript MUST be a detailed conversation between 2 or more people, or a long lecture.'}
2. It MUST contain the explicit information needed to correctly answer these questions: ${JSON.stringify(questions.map(q => ({ q: q.q, answer: q.answer })))}
3. The content must be unique, engaging, and not repetitive.
4. Respond in STRICT JSON format: { "text": "<string: the generated text>" }`;

  try {
    const res = await callAI(systemInstruction, `Generate the text now. Seed: ${Date.now()}`, 0.8);
    return res.text || res;
  } catch (err) {
    console.error("generateDynamicText error:", err);
    throw err;
  }
}

export async function generateGrammarPractice(topicOrTopics = [], lessonId = null) {
  let topicsStr = "";
  if (Array.isArray(topicOrTopics)) {
    topicsStr = topicOrTopics.length > 0 ? topicOrTopics.join(", ") : "All Grammar Topics (Tenses, Conditionals, Modals, Passive Voice, Clauses, Agreement)";
  } else if (typeof topicOrTopics === "string") {
    topicsStr = topicOrTopics;
  } else {
    topicsStr = "Tenses, Passive Voice, Conditional Sentences, Gerunds & Infinitives, Relative Clauses, Subject-Verb Agreement";
  }

  const randomSeed = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const systemInstruction = `You are a professional English Grammar Examiner. Generate 5 brand-new, fresh, and high-quality multiple choice English grammar practice questions covering: ${topicsStr}.

STRICT REQUIREMENTS:
1. Generate exactly 5 distinct multiple-choice questions testing realistic grammar usage in everyday or academic English.
2. Each question MUST have 4 options and 1 exact matching correct answer string from the options.
3. Shuffle option positions so the correct answer is not always at the same position.
4. Provide a clear, educational explanation in Indonesian for why the answer is correct and why other key options are incorrect.
5. Return ONLY a valid JSON object.

JSON Format:
{
  "questions": [
    {
      "q": "Sentence with ___ blank space",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option B",
      "explanation": "Penjelasan singkat dalam bahasa Indonesia..."
    }
  ]
}`;

  const userPrompt = `Generate 5 fresh and challenging grammar practice questions for: "${topicsStr}". Random ID: ${randomSeed}`;

  try {
    const parsed = await callAI(systemInstruction, userPrompt, 0.85);
    const questions = parsed.questions || (Array.isArray(parsed) ? parsed : null);

    if (Array.isArray(questions) && questions.length > 0) {
      const validQs = questions.filter(q => q && q.q && Array.isArray(q.options) && q.options.length >= 2 && q.answer).map(q => {
        if (!q.options.includes(q.answer)) {
          q.options[0] = q.answer;
        }
        q.options = [...q.options].sort(() => Math.random() - 0.5);
        return {
          q: q.q,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation || "Jawaban yang benar sesuai dengan kaidah tata bahasa Inggris."
        };
      });

      if (validQs.length >= 3) {
        return validQs;
      }
    }
    throw new Error("Invalid questions array returned from AI");
  } catch (err) {
    console.warn("AI generation failed or timed out, using randomized fallback bank:", err.message);
    if (lessonId) {
      const lessonQs = getRandomLessonQuestions(lessonId, 5);
      if (lessonQs.length > 0) return lessonQs;
    }
    return getRandomMixedGrammarQuestions(5);
  }
}