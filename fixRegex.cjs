const fs = require('fs');

const files = [
  'src/pages/Quiz.jsx',
  'src/pages/StudyPlan.jsx'
];

files.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/bg-rose-50 dark:bg-rose-900\/200/g, 'bg-rose-600 dark:bg-rose-500');
  fs.writeFileSync(p, content);
  console.log('Fixed ' + p);
});
