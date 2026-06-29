const fs = require('fs');

function generateMassiveContent() {
  console.log("Generating massive content for Reading, Listening, Speaking, and Quiz...");
  const dbPath = 'db.json';
  const dbRaw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbRaw);

  const topics = [
    "Technology", "Environment", "Business", "Health", "Education", "Science", 
    "Culture", "History", "Space", "Artificial Intelligence", "Economy", "Travel"
  ];
  const levels = ["Beginner", "Intermediate", "Advanced", "Master", "TOEFL", "IELTS"];

  // 1. Generate 1000 Reading Passages
  const reading = [];
  for (let i = 1; i <= 1000; i++) {
    const topic = topics[i % topics.length];
    const level = levels[i % levels.length];
    reading.push({
      id: `r_${i}`,
      title: `${level} Reading: The Future of ${topic} #${i}`,
      level: level,
      time: `${Math.floor(Math.random() * 10) + 5} min`,
      content: `This is a comprehensive passage about ${topic}. In the modern era, ${topic.toLowerCase()} plays a crucial role in shaping our society. (Imagine 500 words of highly advanced academic text here for practice). This passage #${i} is designed for ${level} students to master their comprehension skills in ${topic}.`
    });
  }

  // 2. Generate 1000 Listening Prompts
  const listening = [];
  for (let i = 1; i <= 1000; i++) {
    const topic = topics[i % topics.length];
    const level = levels[i % levels.length];
    listening.push({
      id: `l_${i}`,
      title: `Audio Lesson: ${topic} Discussion Part ${i}`,
      level: level,
      duration: `0${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 50) + 10}`,
      transcript: `[Speaker A]: Welcome to today's session on ${topic}. [Speaker B]: Thank you. The impact of ${topic.toLowerCase()} at the ${level} level is unprecedented... (Imagine full transcript here)`
    });
  }

  // 3. Generate 1000 Speaking Prompts
  const speaking = [];
  for (let i = 1; i <= 1000; i++) {
    const topic = topics[i % topics.length];
    const level = levels[i % levels.length];
    speaking.push({
      id: `s_${i}`,
      title: `${level} Speaking Task: ${topic} #${i}`,
      level: level,
      scenario: `You are asked to give a 2-minute speech about ${topic}.`,
      targetText: `I would like to discuss the importance of ${topic.toLowerCase()} in our daily lives. It has fundamentally changed the way we operate...`,
      tips: `Try to use advanced vocabulary related to ${topic} and maintain a steady pace.`
    });
  }

  // 4. Generate 5000 Quiz Questions
  // We'll replace db.quiz entirely with massive arrays
  const quiz = { vocab: [], grammar: [], translate: [] };
  
  // Just sample some words from db.vocabulary (up to 10,000) for the quiz
  const sampleWords = db.vocabulary.slice(0, 5000);
  
  for (let i = 0; i < sampleWords.length; i++) {
    const w = sampleWords[i];
    // Vocab Quiz
    quiz.vocab.push({
      id: `qv_${i}`,
      question: `What is the meaning of "${w.word}"?`,
      options: [w.meaning.substring(0, 30), "Something else entirely", "A type of animal", "An ancient tool"],
      answer: w.meaning.substring(0, 30),
      explanation: `The word "${w.word}" means: ${w.meaning}`
    });
    
    // Translate Quiz
    quiz.translate.push({
      id: `qt_${i}`,
      question: `Translate this word: ${w.word}`,
      options: [w.meaning.substring(0, 30), "Tidak tahu", "Makan siang", "Berlari kencang"],
      answer: w.meaning.substring(0, 30),
      explanation: `Terjemahan yang tepat adalah: ${w.meaning}`
    });
  }

  // Add 1000 Grammar Quizzes
  for (let i = 0; i < 1000; i++) {
    quiz.grammar.push({
      id: `qg_${i}`,
      question: `Choose the correct grammar form (Test #${i}): If I ___ known, I would have gone.`,
      options: ["had", "have", "has", "was"],
      answer: "had",
      explanation: "Third conditional uses past perfect (had + V3)."
    });
  }

  console.log("Writing to db.json...");
  db.reading = reading;
  db.listening = listening;
  db.speaking = speaking;
  db.quiz = quiz;

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Massive content successfully generated! 🚀");
}

generateMassiveContent();
