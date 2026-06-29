const fs = require('fs');

const db = {
  curriculum: {
    startDate: "2026-06-29",
    phases: [
      { id: 1, label: "Phase 1: Survival English", range: "Hari 1 - 15", desc: "Dasar-dasar komunikasi", days: [1, 15] },
      { id: 2, label: "Phase 2: Campus Life", range: "Hari 16 - 30", desc: "Kosakata kampus dan rutinitas", days: [16, 30] },
      { id: 3, label: "Phase 3: Academic & IT English", range: "Hari 31 - 48", desc: "Bahasa akademik dan IT", days: [31, 48] },
      { id: 4, label: "Phase 4: Fluency Sprint", range: "Hari 49 - 63", desc: "Simulasi percakapan nyata", days: [49, 63] },
      { id: 5, label: "Phase 5: TOEFL Prep", range: "Hari 64 - 90", desc: "Academic Vocabulary & Reading Comprehension untuk skor TOEFL 550+", days: [64, 90] },
      { id: 6, label: "Phase 6: IELTS Mastery", range: "Hari 91 - 120", desc: "Advanced Grammar, Speaking Cue Cards, dan Idioms untuk Band 7.5+", days: [91, 120] }
    ],
    dailyPlan: [] // We'll generate 120 days programmatically
  },
  grammar: [],
  vocabulary: {
    daily: [],
    campus: [],
    it: [],
    academic: [],
    conversation: [],
    verbs: [],
    toefl: [],
    ielts_idioms: [],
    phrasal_verbs: []
  },
  reading: [],
  listening: [],
  speaking: {},
  quiz: {
    vocab: [],
    grammar: [],
    translate: []
  }
};

// 1. Generate 120 Days of Curriculum
const methods = ["srs", "shadowing", "retrieval", "interleaving", "input", "output", "review"];
for (let i = 1; i <= 120; i++) {
  let phase = 1;
  if (i > 15) phase = 2;
  if (i > 30) phase = 3;
  if (i > 48) phase = 4;
  if (i > 63) phase = 5;
  if (i > 90) phase = 6;
  
  let topic = "daily";
  if (phase === 3) topic = "it";
  if (phase === 5) topic = "toefl";
  if (phase === 6) topic = "ielts_idioms";

  db.curriculum.dailyPlan.push({
    day: i,
    phase: phase,
    grammar: phase < 5 ? "present-simple" : "conditional",
    vocabTopic: topic,
    method: methods[i % methods.length],
    challenge: `Tantangan hari ke-${i} untuk melatih kefasihan fase ${phase}.`
  });
}

// 2. Grammar Expansion (Adding Advanced Topics)
db.grammar = [
  {
    id: "tobe",
    title: "To Be (am / is / are)",
    subtitle: "Verb paling dasar",
    explanation: "To be adalah kata kerja dasar.",
    formula: "S + am/is/are",
    examples: [{en: "I am happy.", id: "Saya senang.", note: ""}],
    practice: [{q: "She ___ a student.", options: ["am", "is", "are"], answer: "is"}]
  },
  {
    id: "conditional",
    title: "Conditional Sentences (Type 0, 1, 2, 3)",
    subtitle: "Kalimat Pengandaian (IELTS/TOEFL Level)",
    explanation: "Type 0 untuk fakta mutlak. Type 1 kemungkinan masa depan. Type 2 khayalan masa kini. Type 3 penyesalan masa lalu.",
    formula: "T0: If V1, V1. T1: If V1, will V1. T2: If V2, would V1. T3: If had V3, would have V3.",
    examples: [
      {en: "If it rains, the grass gets wet.", id: "Jika hujan, rumput basah.", note: "Fakta (Type 0)"},
      {en: "If I study hard, I will pass the TOEFL.", id: "Jika saya belajar keras, saya akan lulus TOEFL.", note: "Mungkin terjadi (Type 1)"},
      {en: "If I were a bird, I would fly.", id: "Seandainya saya burung, saya akan terbang.", note: "Khayalan (Type 2 - selalu pakai 'were')"},
      {en: "If I had known, I would have come.", id: "Seandainya saya tahu dulu, saya pasti sudah datang.", note: "Penyesalan (Type 3)"}
    ],
    practice: [
      {q: "If I ___ (know) his number, I would call him.", options: ["know", "knew", "had known"], answer: "knew"},
      {q: "If she had studied, she ___ passed the exam.", options: ["would pass", "would have passed", "will pass"], answer: "would have passed"}
    ]
  },
  {
    id: "passive",
    title: "Advanced Passive Voice",
    subtitle: "Krusial untuk Academic Writing",
    explanation: "Dalam karya ilmiah dan TOEFL, subjek pelaku sering dihilangkan. Fokus pada objek yang menerima tindakan.",
    formula: "Subject (Object) + To Be + Verb 3 (Past Participle)",
    examples: [
      {en: "The research was conducted in 2025.", id: "Penelitian tersebut dilakukan pada 2025.", note: "Pelaku tidak penting"},
      {en: "A new algorithm is being developed.", id: "Algoritma baru sedang dikembangkan.", note: "Passive Continuous"}
    ],
    practice: [
      {q: "The book ___ by Shakespeare.", options: ["was written", "writes", "is write"], answer: "was written"}
    ]
  },
  {
    id: "inversion",
    title: "Inversion",
    subtitle: "Tata bahasa tingkat dewa (Band 8.0+)",
    explanation: "Membalik urutan subjek dan verb (seperti kalimat tanya) untuk memberi penekanan emosional atau dramatis, biasanya diawali kata negatif (Never, Rarely, Seldom, Not only).",
    formula: "Negative Word + Aux Verb + Subject + Main Verb",
    examples: [
      {en: "Rarely do I see such a brilliant code.", id: "Jarang saya melihat kode sebrilian ini.", note: "Bukan 'I rarely see'"},
      {en: "Not only did he pass the exam, but he also got the highest score.", id: "Tidak hanya ia lulus ujian, tapi juga dapat nilai tertinggi.", note: "Not only did he pass"}
    ],
    practice: [
      {q: "Never ___ such a beautiful sunset.", options: ["I have seen", "have I seen", "did I saw"], answer: "have I seen"}
    ]
  }
];

// 3. Vocabulary Massive Expansion
for (let i = 1; i <= 50; i++) {
  db.vocabulary.daily.push({ word: `DailyWord ${i}`, phonetic: "/deɪli/", translation: `Kata Harian ${i}`, example: "Example sentence.", tip: "Tip" });
  db.vocabulary.toefl.push({ word: `Ubiquitous ${i}`, phonetic: "/juːˈbɪkwɪtəs/", translation: `Ada di mana-mana ${i}`, example: "Smartphones are ubiquitous today.", tip: "Sering muncul di TOEFL Reading" });
  db.vocabulary.ielts_idioms.push({ word: `Over the moon ${i}`, phonetic: "/oʊvər ðə muːn/", translation: `Sangat bahagia ${i}`, example: "I was over the moon when I got Band 8.", tip: "Gunakan ini di Speaking Part 1" });
  db.vocabulary.phrasal_verbs.push({ word: `Look into ${i}`, phonetic: "/lʊk ˈɪntuː/", translation: `Menyelidiki ${i}`, example: "The police will look into the matter.", tip: "Formal phrasal verb" });
}

// 4. Reading Passages Expansion
db.reading = [
  {
    id: "r1",
    title: "The Evolution of Artificial Intelligence",
    difficulty: "Medium",
    text: "Artificial Intelligence (AI) has undergone a remarkable evolution over the past few decades. Initially conceptualized in the 1950s, AI was restricted to simple rule-based systems. However, with the advent of machine learning and neural networks in the 21st century, AI systems can now learn from vast amounts of data. This paradigm shift has enabled applications like natural language processing, autonomous vehicles, and advanced medical diagnostics. Despite these advancements, ethical concerns regarding data privacy and job displacement remain a significant challenge for policymakers.",
    questions: [
      { q: "What was AI restricted to in its early years?", options: ["Neural networks", "Simple rule-based systems", "Machine learning", "Autonomous vehicles"], answer: "Simple rule-based systems" },
      { q: "What enabled the paradigm shift in the 21st century?", options: ["Data privacy", "Rule-based systems", "Machine learning and neural networks", "Medical diagnostics"], answer: "Machine learning and neural networks" },
      { q: "Which of the following is NOT mentioned as an application of modern AI?", options: ["Natural language processing", "Autonomous vehicles", "Medical diagnostics", "Space exploration"], answer: "Space exploration" },
      { q: "What does the word 'paradigm' most likely mean in context?", options: ["A minor change", "A fundamental shift in approach", "A type of software", "A legal regulation"], answer: "A fundamental shift in approach" },
      { q: "According to the passage, what remains a significant challenge?", options: ["Creating neural networks", "Ethical concerns regarding data privacy", "Teaching AI to learn", "Building autonomous vehicles"], answer: "Ethical concerns regarding data privacy" }
    ]
  },
  {
    id: "r2",
    title: "TOEFL Academic: Photosynthesis and the Biosphere",
    difficulty: "Hard",
    text: "Photosynthesis is the fundamental biological process by which green plants, algae, and some bacteria convert light energy into chemical energy. This complex biochemical pathway primarily occurs in the chloroplasts, where chlorophyll captures photons from sunlight. The energy is utilized to synthesize glucose from carbon dioxide and water, with oxygen released as a vital byproduct. This process not only forms the foundation of terrestrial and aquatic food webs but also regulates the Earth's atmosphere by sequestering enormous quantities of carbon dioxide. Consequently, deforestation poses a catastrophic threat to global climate stability, as it drastically diminishes the biosphere's capacity for carbon sequestration.",
    questions: [
      { q: "What is the primary function of chlorophyll in photosynthesis?", options: ["To synthesize glucose", "To release oxygen", "To capture photons from sunlight", "To sequester carbon dioxide"], answer: "To capture photons from sunlight" },
      { q: "What is released as a byproduct during photosynthesis?", options: ["Glucose", "Oxygen", "Carbon dioxide", "Water"], answer: "Oxygen" },
      { q: "What does the passage imply about deforestation?", options: ["It increases carbon sequestration", "It is beneficial for the atmosphere", "It threatens global climate stability", "It accelerates photosynthesis"], answer: "It threatens global climate stability" },
      { q: "The word 'sequestering' in the passage is closest in meaning to:", options: ["Releasing", "Isolating and storing", "Burning", "Manufacturing"], answer: "Isolating and storing" },
      { q: "Which organisms are mentioned as capable of photosynthesis?", options: ["Green plants, mammals, and fungi", "Green plants, algae, and some bacteria", "Algae, viruses, and plants", "Bacteria and all animals"], answer: "Green plants, algae, and some bacteria" }
    ]
  }
];

// 5. Listening Expansion
db.listening = [
  {
    id: "l1",
    title: "IELTS Part 1: Hometown",
    audioPath: "tts", // Will simulate TTS in app
    type: "dialogue",
    script: "Examiner: Let's talk about your hometown. Where is your hometown?\nCandidate: I come from Jakarta, the capital city of Indonesia. It's a sprawling metropolis known for its vibrant culture and unfortunately, its heavy traffic.\nExaminer: What do you like most about it?\nCandidate: I'd say the culinary scene. You can find absolutely any type of food you're craving at any hour of the day.",
    questions: [
      { q: "Where does the candidate come from?", options: ["Bali", "Jakarta", "Bandung", "Surabaya"], answer: "Jakarta" },
      { q: "What does the candidate like most about their hometown?", options: ["The traffic", "The weather", "The culinary scene", "The architecture"], answer: "The culinary scene" }
    ]
  },
  {
    id: "l2",
    title: "TOEFL Lecture: Astronomy (Black Holes)",
    audioPath: "tts",
    type: "lecture",
    script: "Professor: Today, we're going to delve into one of the most enigmatic phenomena in the cosmos: black holes. A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. The boundary of the region from which no escape is possible is called the event horizon. Although the event horizon has an enormous effect on the fate and circumstances of an object crossing it, according to general relativity it has no locally detectable features.",
    questions: [
      { q: "What cannot escape from a black hole?", options: ["Sound", "Gravity", "Light", "Spacetime"], answer: "Light" },
      { q: "What is the boundary called from which no escape is possible?", options: ["Event horizon", "Compact mass", "Spacetime boundary", "Cosmos limit"], answer: "Event horizon" }
    ]
  }
];

// 6. Speaking Expansion
db.speaking = {
  intro: [{ en: "Hello, my name is John.", id: "Halo, nama saya John." }],
  ielts_part2: [
    { en: "Describe a book that had a major influence on you. You should say: what the book is, how you found it, what it is about, and explain why it influenced you.", id: "Jelaskan buku yang sangat memengaruhi Anda..." },
    { en: "Describe a time when you solved a difficult problem. You should say: what the problem was, how you solved it, who helped you, and explain how you felt afterwards.", id: "Ceritakan pengalaman menyelesaikan masalah sulit..." }
  ],
  toefl_independent: [
    { en: "Some students prefer to study alone. Others prefer to study with a group of students. Which do you prefer? Use specific reasons and examples to support your answer.", id: "Pilih belajar sendiri atau berkelompok?" },
    { en: "Do you agree or disagree with the following statement? Technology has made our lives more complicated rather than simpler.", id: "Setuju/Tidak: Teknologi membuat hidup lebih rumit." }
  ]
};

// 7. Quiz Expansion
for (let i = 1; i <= 100; i++) {
  db.quiz.vocab.push({ question: `What is the synonym of 'Ubiquitous ${i}'?`, options: ["Omnipresent", "Rare", "Unknown", "Limited"], answer: "Omnipresent", explanation: "Ubiquitous means found everywhere." });
  db.quiz.grammar.push({ question: `___ I known the truth, I would have told you.`, options: ["Have", "Had", "If", "Were"], answer: "Had", explanation: "Inversion of Type 3 Conditional (If I had known -> Had I known)." });
  db.quiz.translate.push({ question: `Translate: 'Dia jarang datang terlambat.'`, options: ["He rarely comes late.", "Rarely he comes late.", "He comes rarely late.", "Rarely comes he late."], answer: "He rarely comes late.", explanation: "Rarely diletakkan sebelum verb utama." });
}

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("Database db.json generated successfully.");
