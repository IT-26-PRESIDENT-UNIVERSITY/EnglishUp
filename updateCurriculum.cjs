const fs = require('fs');

function updateCurriculum() {
  console.log("Updating curriculum for General Students from 0 to IELTS/TOEFL...");
  const dbPath = 'db.json';
  const dbRaw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbRaw);

  const newPhases = [
    {
      id: 1,
      label: "Phase 1: Absolute Beginner",
      range: "Hari 1 - 15",
      desc: "Pengenalan Alphabet, Angka, dan Kosakata Dasar (0 to A1)",
      days: [1, 15]
    },
    {
      id: 2,
      label: "Phase 2: Basic Survival",
      range: "Hari 16 - 30",
      desc: "Percakapan sehari-hari, Perkenalan diri, dan Grammar Dasar (A1 to A2)",
      days: [16, 30]
    },
    {
      id: 3,
      label: "Phase 3: Pre-Intermediate",
      range: "Hari 31 - 45",
      desc: "Bercerita masa lalu, opini, dan mendeskripsikan sesuatu (A2 to B1)",
      days: [31, 45]
    },
    {
      id: 4,
      label: "Phase 4: Intermediate Mastery",
      range: "Hari 46 - 60",
      desc: "Diskusi topik umum, berita, dan idiom sehari-hari (B1 to B2)",
      days: [46, 60]
    },
    {
      id: 5,
      label: "Phase 5: Upper-Intermediate",
      range: "Hari 61 - 75",
      desc: "Bahasa Akademik, Esai, dan Topik Kompleks (B2 to C1)",
      days: [61, 75]
    },
    {
      id: 6,
      label: "Phase 6: TOEFL/IELTS Preparation",
      range: "Hari 76 - 90",
      desc: "Latihan intensif Reading, Listening, Speaking untuk skor tinggi",
      days: [76, 90]
    }
  ];

  const newDailyPlan = [];
  const vocabTopics = ["basic", "numbers", "family", "food", "travel", "work", "school", "health", "science", "arts", "environment", "business", "technology", "society"];
  const methods = ["flashcard", "shadowing", "writing", "listening"];
  const challenges = [
    "Dengarkan 1 podcast bahasa Inggris hari ini",
    "Baca 1 artikel bahasa Inggris",
    "Bicara di depan cermin bahasa Inggris 2 menit",
    "Tulis 3 kalimat tentang harimu",
    "Ganti bahasa HP ke English",
    "Tonton video YouTube tanpa subtitle",
    "Catat 5 kata sulit yang kamu temui"
  ];

  for (let i = 1; i <= 90; i++) {
    let phase = 1;
    if (i > 15) phase = 2;
    if (i > 30) phase = 3;
    if (i > 45) phase = 4;
    if (i > 60) phase = 5;
    if (i > 75) phase = 6;

    let vocabTopic = vocabTopics[Math.floor(Math.random() * vocabTopics.length)];
    // gradually harder vocabulary topics
    if (phase <= 2) vocabTopic = vocabTopics[i % 4]; // basic, numbers, family, food
    else if (phase <= 4) vocabTopic = vocabTopics[4 + (i % 4)]; // travel, work, school, health
    else vocabTopic = vocabTopics[8 + (i % 6)]; // science, arts, environment, business, technology, society

    newDailyPlan.push({
      day: i,
      phase: phase,
      vocabTopic: vocabTopic,
      grammar: i <= 25 ? `g_${i}` : `g_${(i % 25) + 1}`, // looping grammar lessons or scaling
      method: methods[i % methods.length],
      challenge: challenges[i % challenges.length]
    });
  }

  db.curriculum = {
    startDate: db.curriculum.startDate,
    phases: newPhases,
    dailyPlan: newDailyPlan
  };

  // Also replace any mention of IT in constants or anywhere?
  // db.grammar is probably fine as it was just general grammar.
  // Wait, let's just make sure we save the DB.
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Curriculum updated successfully to general university level! 🚀");
}

updateCurriculum();
