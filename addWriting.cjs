const fs = require('fs');
const dbPath = 'db.json';
const dbRaw = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(dbRaw);

db.writing = [
  {
    id: "w_1",
    title: "Introduce Yourself",
    level: "Beginner",
    minWords: 50,
    prompt: "Write a short paragraph introducing yourself. Mention your name, major, hobbies, and why you want to learn English."
  },
  {
    id: "w_2",
    title: "My Daily Routine",
    level: "Beginner",
    minWords: 75,
    prompt: "Describe your typical day from the moment you wake up until you go to bed. Use simple present tense."
  },
  {
    id: "w_3",
    title: "A Memorable Trip",
    level: "Intermediate",
    minWords: 150,
    prompt: "Write about a trip or vacation you will never forget. Where did you go? Who were you with? What happened?"
  },
  {
    id: "w_4",
    title: "The Impact of Technology on Education",
    level: "Upper-Intermediate",
    minWords: 200,
    prompt: "How has technology changed the way students learn? Discuss both positive and negative effects."
  },
  {
    id: "w_5",
    title: "IELTS Task 2: Environment",
    level: "Advanced (IELTS)",
    minWords: 250,
    prompt: "Some people believe that environmental problems are too big for individuals to solve, while others think that individuals can do a lot. Discuss both views and give your opinion."
  },
  {
    id: "w_6",
    title: "TOEFL Independent Task",
    level: "Advanced (TOEFL)",
    minWords: 300,
    prompt: "Do you agree or disagree with the following statement: It is better to have broad knowledge of many academic subjects than to specialize in one specific subject. Use specific reasons and examples to support your answer."
  }
];

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Added writing topics to db.json");
