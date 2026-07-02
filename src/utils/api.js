import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchCurriculum = async () => {
  const res = await axios.get(`${API_URL}/curriculum`);
  return res.data;
};

export const fetchGrammar = async () => {
  const res = await axios.get(`${API_URL}/grammar`);
  return res.data;
};

let vocabCache = null;

export const fetchVocabulary = async (page = 1, limit = 50, search = '') => {
  if (!vocabCache) {
    const res = await axios.get(`${API_URL}/vocabulary`);
    vocabCache = res.data;
  }
  
  let filtered = vocabCache;
  if (search) {
      const getScore = (v, query) => {
        const w = v.word.toLowerCase();
        if (w === query) return 100;
        if (w.startsWith(query)) return 50;
        
        // Exact whole word match in meaning
        const exactWordRegex = new RegExp(`\\b${query}\\b`, 'i');
        const m = (v.meaning || "").toLowerCase();
        
        if (exactWordRegex.test(w)) return 20;
        if (w.includes(query)) return 10;
        if (exactWordRegex.test(m)) return 5;
        if (m.includes(query)) return 1;
        return 0;
      };

      let queryToUse = search.toLowerCase();
      let scored = vocabCache.map(v => ({ v, score: getScore(v, queryToUse) })).filter(item => item.score > 0);

      // Auto-translate Indonesian search query to English if 0 results
      if (scored.length === 0) {
        try {
          const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(search)}`);
          const transData = await transRes.json();
          const translatedS = transData[0].map(item => item[0]).join("").toLowerCase().trim();
          
          if (translatedS && translatedS !== queryToUse) {
            queryToUse = translatedS;
            scored = vocabCache.map(v => ({ v, score: getScore(v, queryToUse) })).filter(item => item.score > 0);
          }
        } catch (e) {
          console.error("Translation fallback failed", e);
        }
      }

      scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.v.word.localeCompare(b.v.word);
      });

      filtered = scored.map(item => item.v);
  }

  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  
  return { data, total, pages };
};

export const fetchReading = async () => {
  const res = await axios.get(`${API_URL}/reading`);
  return res.data;
};

export const fetchListening = async () => {
  const res = await axios.get(`${API_URL}/listening`);
  return res.data;
};

export const fetchSpeaking = async () => {
  const res = await axios.get(`${API_URL}/speaking`);
  return res.data;
};

export const fetchWriting = async () => {
  const res = await axios.get(`${API_URL}/writing`);
  return res.data;
};

export const fetchQuiz = async (type) => {
  const res = await axios.get(`${API_URL}/quiz`);
  return type ? res.data[type] : res.data;
};