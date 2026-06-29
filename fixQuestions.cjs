const fs = require('fs');

function fixQuestions() {
  console.log("Fixing questions for Reading and Listening...");
  const dbPath = 'db.json';
  const dbRaw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbRaw);

  db.reading = db.reading.map(r => {
    if (!r.questions) {
      r.questions = [
        { q: "What is the main idea of this passage?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A" },
        { q: "According to the passage, which is true?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option C" }
      ];
    }
    return r;
  });

  db.listening = db.listening.map(l => {
    if (!l.questions) {
      l.questions = [
        { q: "What are the speakers discussing?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option B" }
      ];
    }
    return l;
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Questions fixed successfully! 🚀");
}

fixQuestions();
