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

const TOPIC_WORDS = {
  "Daily Life": ["day", "morning", "afternoon", "evening", "night", "wake", "sleep", "eat", "drink", "work"],
  "Campus & University": ["campus", "university", "college", "student", "professor", "lecture", "assignment", "exam", "grade", "library"],
  "Academic Words": ["analyze", "evaluate", "concept", "theory", "method", "data", "research", "evidence", "thesis", "context"],
  "Spoken English": ["hello", "goodbye", "please", "thanks", "sorry", "excuse", "yes", "no", "maybe", "really"],
  "Essential Verbs": ["be", "have", "do", "say", "get", "make", "go", "know", "take", "see"],
  "TOEFL Academic": ["abandon", "aberrant", "abound", "abstract", "accommodate", "accumulate", "accuracy", "achieve", "acquire", "adapt"],
  "IELTS Idioms": ["piece", "cake", "moon", "weather", "leg", "bean", "music", "ice", "bush", "corner"],
  "Phrasal Verbs": ["give", "look", "take", "get", "make", "put", "bring", "come", "go", "turn"],
  "Basic Vocabulary": ["apple", "book", "cat", "dog", "house", "car", "tree", "water", "friend", "time"],
  "Numbers & Time": ["one", "two", "three", "ten", "hundred", "first", "second", "minute", "hour", "clock"],
  "Family & People": ["mother", "father", "brother", "sister", "son", "daughter", "child", "person", "man", "woman"],
  "Food & Dining": ["food", "meal", "breakfast", "lunch", "dinner", "restaurant", "menu", "plate", "fork", "spoon"],
  "Travel & Transport": ["travel", "journey", "trip", "ticket", "luggage", "airport", "train", "bus", "car", "flight"],
  "Work & Careers": ["job", "career", "office", "boss", "colleague", "meeting", "salary", "promotion", "company", "business"],
  "School & Education": ["school", "teacher", "student", "class", "lesson", "homework", "exam", "study", "learn", "read"],
  "Health & Medicine": ["health", "doctor", "nurse", "hospital", "medicine", "pill", "pain", "sick", "disease", "cure"],
  "Science": ["science", "experiment", "laboratory", "theory", "gravity", "energy", "matter", "biology", "physics", "chemistry"],
  "Arts & Culture": ["art", "music", "painting", "museum", "culture", "tradition", "history", "dance", "theater", "literature"],
  "Environment": ["nature", "tree", "forest", "ocean", "river", "climate", "pollution", "recycle", "earth", "animal"],
  "Business": ["market", "profit", "loss", "sale", "company", "strategy", "manager", "invest", "finance", "trade"],
  "Technology": ["computer", "software", "hardware", "internet", "network", "data", "screen", "keyboard", "mouse", "code"],
  "Society & Culture": ["society", "community", "culture", "law", "government", "politics", "citizen", "public", "private", "social"]
};

export const fetchVocabulary = async (page = 1, limit = 50, search = '') => {
  if (!vocabCache) {
    const res = await axios.get(`${API_URL}/vocabulary`);
    vocabCache = res.data;
  }
  let filtered = vocabCache;
  if (search) {
    // If the search perfectly matches a topic name, use predefined words
    const targetWords = TOPIC_WORDS[search];

    if (targetWords) {
      // Find these exact words in the cache
      filtered = [];
      targetWords.forEach(tw => {
        const found = vocabCache.find(v => v.word.toLowerCase() === tw.toLowerCase());
        if (found) filtered.push(found);
      });
      // If we couldn't find some words, fallback to general search just in case
      if (filtered.length === 0) {
        filtered = vocabCache.filter(v => v.word.toLowerCase().includes(search.toLowerCase()));
      }
    } else {
      // Normal search
      const s = search.toLowerCase();
      const regex = new RegExp('\\b' + s + '\\b', 'i');
      
      const exact = [];
      const starts = [];
      const others = [];

      for (let i = 0; i < vocabCache.length; i++) {
        const v = vocabCache[i];
        const w = v.word.toLowerCase();
        if (w === s) {
          exact.push(v);
        } else if (w.startsWith(s)) {
          starts.push(v);
        } else if (w.includes(s) || (v.meaning && regex.test(v.meaning))) {
          others.push(v);
        }
      }
      filtered = [...exact, ...starts, ...others];
    }
  }
  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  
  return {
    data,
    total,
    pages
  };
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
