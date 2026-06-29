const fs = require('fs');

function fixQuestionsRealistic() {
  console.log("Replacing dummy questions with realistic ones based on topics...");
  const dbPath = 'db.json';
  const dbRaw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbRaw);

  const topics = [
    "Technology", "Environment", "Business", "Health", "Education", "Science", 
    "Culture", "History", "Space", "Artificial Intelligence", "Economy", "Travel"
  ];

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function generateOptions(correctAnswer, otherTopics) {
    let wrongOptions = otherTopics.filter(t => !correctAnswer.includes(t)).slice(0, 3);
    if (wrongOptions.length < 3) {
      wrongOptions = ["Politics", "Sports", "Entertainment"];
    }
    const options = [correctAnswer, ...wrongOptions];
    return shuffle(options);
  }

  // Fix Reading
  db.reading = db.reading.map(r => {
    // extract topic from title e.g. "Beginner Reading: The Future of Technology #1"
    let topicMatch = r.title.match(/The Future of ([A-Za-z ]+) #/);
    let topic = topicMatch ? topicMatch[1] : "General Topic";

    r.questions = [
      { 
        q: "What is the main idea of this passage?", 
        options: generateOptions(`The future of ${topic}`, topics.map(t => `The future of ${t}`)), 
        answer: `The future of ${topic}` 
      },
      { 
        q: `According to the passage, what plays a crucial role in shaping society?`, 
        options: generateOptions(`${topic}`, topics), 
        answer: `${topic}` 
      }
    ];
    return r;
  });

  // Fix Listening
  db.listening = db.listening.map(l => {
    // extract topic from title e.g. "Audio Lesson: Health Discussion Part 3"
    let topicMatch = l.title.match(/Lesson: ([A-Za-z ]+) Discussion/);
    let topic = topicMatch ? topicMatch[1] : "General Subject";

    l.questions = [
      { 
        q: "What are the speakers primarily discussing?", 
        options: generateOptions(`The impact of ${topic}`, topics.map(t => `The impact of ${t}`)), 
        answer: `The impact of ${topic}` 
      },
      { 
        q: `What field is mentioned as having an unprecedented impact at the ${l.level || 'Intermediate'} level?`, 
        options: generateOptions(`${topic}`, topics), 
        answer: `${topic}` 
      }
    ];
    return l;
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Questions fixed with realistic options successfully! 🚀");
}

fixQuestionsRealistic();
