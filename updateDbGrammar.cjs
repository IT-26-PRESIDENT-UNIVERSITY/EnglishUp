const fs = require('fs');
const grammarData = require('./grammarData.cjs');

const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
db.grammar = grammarData;

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("Grammar data in db.json has been updated with " + grammarData.length + " topics.");
