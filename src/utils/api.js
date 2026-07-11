import { supabase } from './supabaseClient';

export const fetchCurriculum = async () => {
  const { data } = await supabase.from('curriculum').select('*').single();
  return data;
};

export const fetchGrammar = async () => {
  const { data } = await supabase.from('grammar').select('*');
  return data;
};

// Filter out junk entries: words that are only dashes/symbols, too short, or lack meaning
const isValidWord = (v) => {
  const w = (v.word || '').trim();
  if (w.length < 2 && w.toLowerCase() !== 'a' && w.toLowerCase() !== 'i') return false;
  
  const m = (v.meaning || v.translation || '').trim();
  if (m.length < 3 || m === '-' || m === '--') return false;

  return !/^[-–—\s]+$/.test(w) && /[a-zA-Z]/.test(w) && !/^[-_.]+/.test(w);
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
    // No search, fetch with extra buffer then filter client-side
    const start = (page - 1) * limit;
    const fetchSize = limit * 3; // fetch extra to account for filtered-out junk
    const { data, count } = await query.range(start, start + fetchSize - 1).order('word', { ascending: true });
    const cleaned = (data || []).filter(isValidWord).slice(0, limit);
    
    return {
      data: cleaned,
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
  // Ambil data quiz vocab dari Supabase
  const { data } = await supabase.from('quiz').select('*');
  const vocabQuizzes = (data || []).filter(q => q.category === 'vocab');

  // Ambil data vocabulary asli untuk men-generate Translate
  const { data: vocabData } = await supabase.from('vocabulary').select('*').limit(200);
  const validVocab = (vocabData || []).filter(isValidWord);
  
  const translateQuizzes = validVocab.slice(0, 50).map((v, i) => {
    // Cari 3 opsi salah acak
    let options = [v.meaning || v.translation];
    while(options.length < 4 && validVocab.length > 4) {
      let randItem = validVocab[Math.floor(Math.random() * validVocab.length)];
      let randMeaning = randItem.meaning || randItem.translation;
      if (randMeaning && !options.includes(randMeaning)) {
        options.push(randMeaning);
      }
    }
    // Jika tidak cukup opsi salah, fallback
    if (options.length < 4) options = [options[0], "Tidak tahu", "Mungkin sesuatu", "Pilihan lainnya"];
    
    // Shuffle the options
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }

    return {
      id: `t_${i}`,
      category: 'translate',
      question: `Apa arti dari kata bahasa Inggris ini: "${v.word}"?`,
      options: options,
      answer: v.meaning || v.translation,
      explanation: `Kata "${v.word}" berarti ${v.meaning || v.translation}.`
    };
  });

  const grammarQuizzes = [
    { id: 'g_1', category: 'grammar', question: 'She ___ to the store every day.', options: ['go', 'goes', 'going', 'gone'], answerHash: 'f1537d8de0bbe107268e2b4263ae6753d2de8a56cb6463b92d7df109079aad51', explanation: 'Subjek tunggal (she) pada Simple Present Tense menggunakan verb+s/es.' },
    { id: 'g_2', category: 'grammar', question: 'I have never ___ such a beautiful sunset.', options: ['see', 'saw', 'seen', 'seeing'], answerHash: '7208794c984ea1c75d13877c7427336fe98722c41a056eeee4f37360ec367123', explanation: 'Present Perfect Tense menggunakan have + verb 3 (seen).' },
    { id: 'g_3', category: 'grammar', question: 'They ___ playing football when it started to rain.', options: ['are', 'were', 'was', 'have been'], answerHash: '910adfb424646393d81506a4b18638c5ceafff0bb32994c97d916b600d04ecb5', explanation: 'Past Continuous tense dengan subjek jamak (they) menggunakan were.' },
    { id: 'g_4', category: 'grammar', question: 'If I ___ you, I would study harder.', options: ['am', 'was', 'were', 'been'], answerHash: '910adfb424646393d81506a4b18638c5ceafff0bb32994c97d916b600d04ecb5', explanation: 'Conditional sentence tipe 2 selalu menggunakan "were" untuk semua subjek.' },
    { id: 'g_5', category: 'grammar', question: 'The book ___ written by an anonymous author.', options: ['is', 'are', 'has', 'does'], answerHash: 'fa51fd49abf67705d6a35d18218c115ff5633aec1f9ebfdc9d5d4956416f57f6', explanation: 'Kalimat pasif (passive voice) singular menggunakan is + verb 3.' },
    { id: 'g_6', category: 'grammar', question: 'We look forward to ___ you next week.', options: ['see', 'seeing', 'seen', 'saw'], answerHash: '236707bfb83474fad55a3913e369ef229709959c7799a69b9b3bad94d7606456', explanation: 'Frasa "look forward to" selalu diikuti oleh gerund (verb-ing).' },
    { id: 'g_7', category: 'grammar', question: 'He is the man ___ car was stolen.', options: ['who', 'whom', 'whose', 'which'], answerHash: '55efa0938f9f52fb6de33f27375ee1916aa9c5d27367eac89ea1207026bb16f8', explanation: 'Relative pronoun untuk kepemilikan adalah whose.' },
    { id: 'g_8', category: 'grammar', question: 'I ___ my homework before the teacher arrived.', options: ['finished', 'have finished', 'had finished', 'finish'], answerHash: '733ea9caeaf050befda0a3c3f09e5878a67db8d02fcfda2637f389e3f6ca21b9', explanation: 'Aksi yang terjadi sebelum aksi lampau lainnya menggunakan Past Perfect (had + V3).' },
    { id: 'g_9', category: 'grammar', question: 'Neither the manager nor the employees ___ aware of the issue.', options: ['was', 'were', 'is', 'has been'], answerHash: '910adfb424646393d81506a4b18638c5ceafff0bb32994c97d916b600d04ecb5', explanation: 'Pada pola "neither... nor...", verb mengikuti subjek terdekat (the employees - plural).' },
    { id: 'g_10', category: 'grammar', question: 'She would rather ___ at home tonight.', options: ['stay', 'to stay', 'staying', 'stayed'], answerHash: '39be15289c7942a8e7765d75584b0bce0a4a39c29a356fbaee44f63848ba6cb0', explanation: '"Would rather" diikuti oleh bare infinitive (kata kerja dasar tanpa to).' }
  ];

  // Dynamically hash answers for vocab and translate to avoid sending plaintext to UI component state
  const { sha256 } = await import('./helpers');
  
  for (const q of vocabQuizzes) {
    if (q.answer) {
      q.answerHash = await sha256(q.answer);
      delete q.answer;
    }
  }
  
  for (const q of translateQuizzes) {
    if (q.answer) {
      q.answerHash = await sha256(q.answer);
      delete q.answer;
    }
  }

  const formatted = {
    vocab: vocabQuizzes,
    grammar: grammarQuizzes,
    translate: translateQuizzes,
  };
  return type ? formatted[type] : formatted;
};