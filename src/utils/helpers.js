export function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  
  // Prioritaskan suara kualitas tinggi (Premium, Natural, Google, Online) yang disediakan browser secara gratis
  const bestVoice = 
    voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Premium") || v.name.includes("Google") || v.name.includes("Online"))) ||
    voices.find(v => v.lang === "en-US" || v.lang === "en-GB") ||
    voices.find(v => v.lang.startsWith("en"));
    
  if (bestVoice) utterance.voice = bestVoice;
  window.speechSynthesis.speak(utterance);
}

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function calcSimilarity(target, spoken) {
  const t = target.toLowerCase().replace(/[^a-z\s]/g, "").split(" ");
  const s = spoken.toLowerCase().replace(/[^a-z\s]/g, "").split(" ");
  const matched = t.filter((w) => s.includes(w)).length;
  return Math.round((matched / t.length) * 100);
}

export async function translateText(text) {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    return data[0].map(item => item[0]).join("");
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

export function cleanAIPrompt(text, isListening = false, title = "") {
  if (!text) return "";
  const cleaned = text
    .replace(/\(Imagine.*?\)/gi, '')
    .replace(/Prompt:.*?(?=\n|$)/gi, '')
    .replace(/Here is.*?(?=\n|$)/gi, '')
    .replace(/Based on.*?(?=\n|$)/gi, '')
    .replace(/Sure,.*?(?=\n|$)/gi, '')
    .replace(/This is a comprehensive passage.*?(?=\n|$)/gi, '')
    .replace(/\[Speaker A\].*?Intermediate level is unprecedented\.\.\./gi, '')
    .trim();
    
  if (cleaned.length < 20) {
    const subject = title || (isListening ? 'our discussion today' : 'this passage');
    if (isListening) {
      return `[Speaker A]: Welcome to today's discussion on ${subject}.\n[Speaker B]: Thank you. The topic we are covering is very important for our future.\n[Speaker A]: I agree. Small steps can make a big difference in improving our understanding of this subject.`;
    } else {
      return `The topic of ${subject} is a crucial aspect of our modern world. Over the past few decades, developments in this area have significantly impacted society and the natural environment. To ensure a sustainable and better future, it is vital that communities and governments work together to understand the core principles, protect our resources, and address the challenges associated with it.`;
    }
  }
  return cleaned;
}
