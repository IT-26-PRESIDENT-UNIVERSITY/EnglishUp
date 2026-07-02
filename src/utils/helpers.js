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
