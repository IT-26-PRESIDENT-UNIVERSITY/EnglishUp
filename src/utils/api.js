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
      const s = search.toLowerCase();
      filtered = vocabCache.filter(v => 
        v.word.toLowerCase().includes(s) || 
        (v.meaning && v.meaning.toLowerCase().includes(s))
      );
      
      // Auto-translate Indonesian search query to English if 0 results
      if (filtered.length === 0) {
        try {
          const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(search)}`);
          const transData = await transRes.json();
          const translatedS = transData[0].map(item => item[0]).join("").toLowerCase().trim();
          
          if (translatedS && translatedS !== s) {
            filtered = vocabCache.filter(v => 
              v.word.toLowerCase().includes(translatedS) || 
              (v.meaning && v.meaning.toLowerCase().includes(translatedS))
            );
          }
        } catch (e) {
          console.error("Translation fallback failed", e);
        }
      }
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