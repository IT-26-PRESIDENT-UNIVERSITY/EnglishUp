const fs = require('fs');

async function downloadAndInject() {
  console.log("Mendownload kamus Websters 100,000+ kata...");
  
  try {
    // We use a well-known dictionary JSON from github
    const response = await fetch('https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json');
    if (!response.ok) throw new Error("Gagal mendownload kamus");
    
    const rawDict = await response.json();
    console.log(`Berhasil mengunduh! Memproses ${Object.keys(rawDict).length} kata...`);

    const vocabArray = [];
    const keys = Object.keys(rawDict);
    
    for (let i = 0; i < keys.length; i++) {
      const word = keys[i];
      const meaning = rawDict[word];
      
      vocabArray.push({
        id: `v_${i}`,
        word: word,
        meaning: meaning.substring(0, 200) + (meaning.length > 200 ? '...' : ''), // truncate extremely long meanings to save space
        level: "Master",
        example: "-"
      });
    }

    console.log(`Memasukkan ${vocabArray.length} kata ke dalam db.json...`);
    
    // Membaca db.json saat ini
    const dbPath = 'db.json';
    const dbRaw = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(dbRaw);
    
    db.vocabulary = vocabArray;
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log("Kamus raksasa berhasil di-injeksi! 🚀");

  } catch (err) {
    console.error("Error:", err);
  }
}

downloadAndInject();
