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
    const subject = title.replace(/Beginner Reading:|Intermediate Reading:|Advanced Reading:|Master Reading:|IELTS Reading:|TOEFL Reading:/gi, '').trim() || (isListening ? 'our discussion today' : 'this passage');
    
    // Hash string to pick a deterministic fallback
    const hash = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    if (isListening) {
      const listeningFallbacks = [
        `[Speaker A]: Welcome to today's discussion on ${subject}.\n[Speaker B]: Thank you. The topic we are covering is very important for our future.\n[Speaker A]: I agree. Small steps can make a big difference in improving our understanding of this subject.`,
        `[Interviewer]: Hello everyone, today we have a special guest to talk about ${subject}.\n[Guest]: Hi, thanks for having me! It's a fascinating area to explore, especially with recent discoveries.\n[Interviewer]: Absolutely. Could you share your insights on the primary challenges we face in this field?`,
        `[Professor]: Good morning class. Today's lecture will focus on ${subject}.\n[Student]: Professor, will we cover the historical context as well?\n[Professor]: Yes, understanding the history is essential before we dive into the modern applications and theories.`,
        `[Host]: Welcome back to our podcast. Our topic today is ${subject}.\n[Co-host]: I've been looking forward to this! It's something that affects our daily lives in ways we often don't realize.\n[Host]: Exactly. Let's start by breaking down the fundamental concepts for our listeners.`
      ];
      return listeningFallbacks[hash % listeningFallbacks.length];
    } else {
      const readingFallbacks = [
        `The topic of ${subject} is a crucial aspect of our modern world. Over the past few decades, developments in this area have significantly impacted society and the natural environment. To ensure a sustainable and better future, it is vital that communities and governments work together to understand the core principles, protect our resources, and address the challenges associated with it.`,
        `Historically, the study of ${subject} has driven remarkable progress in human civilization. From ancient philosophies to cutting-edge technological innovations, it continues to shape our understanding of the universe. Researchers emphasize the importance of continued investment in this field to unlock further breakthroughs that could revolutionize our daily lives.`,
        `In contemporary debates, ${subject} often emerges as a highly controversial yet essential subject. Experts argue that balancing economic growth with ethical considerations is the key to mastering this domain. As globalization accelerates, understanding the diverse perspectives surrounding this issue is more critical than ever for policymakers and citizens alike.`,
        `The intersection of technology and ${subject} has created unprecedented opportunities in recent years. Analysts predict that the next decade will see exponential growth driven by automated systems and data analytics. However, experts warn that we must remain vigilant against potential risks, ensuring that innovation benefits all layers of society equally.`,
        `When exploring the fundamentals of ${subject}, one must consider both the theoretical frameworks and practical applications. Educational institutions are increasingly integrating this topic into their core curricula to prepare students for the complexities of the modern workforce. Mastering these concepts early on provides a significant competitive advantage.`
      ];
      return readingFallbacks[hash % readingFallbacks.length];
    }
  }
  return cleaned;
}

export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
