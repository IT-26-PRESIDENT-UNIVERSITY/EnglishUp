import { supabase } from './supabaseClient';

export const fetchCurriculum = async () => {
  const { data } = await supabase.from('curriculum').select('*').single();
  return data;
};

export const fetchGrammar = async () => {
  const { data } = await supabase.from('grammar').select('*');
  return data;
};

export const fetchVocabulary = async (page = 1, limit = 50, search = '') => {
  let query = supabase.from('vocabulary').select('*', { count: 'exact' });

  if (search) {
    let queryToUse = search.toLowerCase();
    
    // Auto-translate ID to EN logic
    try {
      const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(search)}`);
      const transData = await transRes.json();
      const translatedS = transData[0].map(item => item[0]).join("").toLowerCase().trim();
      if (translatedS && translatedS !== queryToUse) {
        queryToUse = translatedS;
      }
    } catch (e) {
      console.error("Translation fallback failed", e);
    }

    // Fetch up to 200 matches from Supabase
    const { data: rawMatches } = await supabase
      .from('vocabulary')
      .select('*')
      .or(`word.ilike.%${queryToUse}%,meaning.ilike.%${queryToUse}%`)
      .limit(200);

    const getScore = (v, query) => {
      const w = v.word.toLowerCase();
      if (w === query) return 100;
      if (w.startsWith(query)) return 50;
      
      const exactWordRegex = new RegExp(`\\b${query}\\b`, 'i');
      const m = (v.meaning || "").toLowerCase();
      
      if (exactWordRegex.test(w)) return 20;
      if (w.includes(query)) return 10;
      if (exactWordRegex.test(m)) return 5;
      if (m.includes(query)) return 1;
      return 0;
    };

    const scored = (rawMatches || []).map(v => ({ v, score: getScore(v, queryToUse) })).filter(item => item.score > 0);
    
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.v.word.localeCompare(b.v.word);
    });

    const total = scored.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = scored.slice(start, start + limit).map(item => item.v);

    return { data, total, pages };
  } else {
    // No search, just paginate directly via Supabase
    const start = (page - 1) * limit;
    const { data, count } = await query.range(start, start + limit - 1).order('word', { ascending: true });
    
    return {
      data: data || [],
      total: count || 0,
      pages: Math.ceil((count || 0) / limit)
    };
  }
};

export const fetchReading = async () => {
  const { data } = await supabase.from('reading').select('*');
  return data;
};

export const fetchListening = async () => {
  const { data } = await supabase.from('listening').select('*');
  return data;
};

export const fetchSpeaking = async () => {
  const { data } = await supabase.from('speaking').select('*');
  return data;
};

export const fetchWriting = async () => {
  const { data } = await supabase.from('writing').select('*');
  return data;
};

export const fetchQuiz = async (type) => {
  // Supabase limits to 1000 rows by default which is perfect for shuffling
  const { data } = await supabase.from('quiz').select('*');
  const formatted = {
    vocab: (data || []).filter(q => q.category === 'vocab'),
    grammar: (data || []).filter(q => q.category === 'grammar'),
    translate: (data || []).filter(q => q.category === 'translate'),
  };
  return type ? formatted[type] : formatted;
};