const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = [
  'StudyPlan.jsx',
  'Vocabulary.jsx',
  'Grammar.jsx',
  'Reading.jsx',
  'Listening.jsx',
  'Speaking.jsx',
  'Quiz.jsx',
  '../components/Toast.jsx'
];

files.forEach(file => {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) return;
  
  let content = fs.readFileSync(p, 'utf8');

  // Colors
  content = content.replace(/blue-50/g, 'rose-50');
  content = content.replace(/blue-100/g, 'rose-100');
  content = content.replace(/blue-200/g, 'rose-200');
  content = content.replace(/blue-500/g, 'rose-600');
  content = content.replace(/blue-600/g, 'rose-700');
  content = content.replace(/blue-700/g, 'rose-800');

  // Dark Mode replacements
  content = content.replace(/bg-white/g, 'bg-white dark:bg-slate-800');
  
  content = content.replace(/text-gray-900/g, 'text-gray-900 dark:text-gray-100');
  content = content.replace(/text-gray-800/g, 'text-gray-800 dark:text-gray-200');
  content = content.replace(/text-gray-700/g, 'text-gray-700 dark:text-gray-300');
  content = content.replace(/text-gray-600/g, 'text-gray-600 dark:text-gray-400');
  content = content.replace(/text-gray-500/g, 'text-gray-500 dark:text-gray-400');
  
  content = content.replace(/border-gray-200/g, 'border-gray-200 dark:border-slate-700');
  content = content.replace(/border-gray-300/g, 'border-gray-300 dark:border-slate-600');
  
  content = content.replace(/bg-gray-50/g, 'bg-gray-50 dark:bg-slate-900/50');
  content = content.replace(/bg-gray-100/g, 'bg-gray-100 dark:bg-slate-700');
  
  // Specific fixes for duplicated dark mode strings if any (e.g. if bg-gray-50 dark:bg-slate-900/50 was part of hover:bg-gray-50)
  content = content.replace(/hover:bg-gray-50 dark:bg-slate-900\/50/g, 'hover:bg-gray-50 dark:hover:bg-slate-700');
  content = content.replace(/hover:bg-gray-100 dark:bg-slate-700/g, 'hover:bg-gray-100 dark:hover:bg-slate-700');

  // Dark text for the new rose colors
  // text-rose-700 -> text-rose-700 dark:text-rose-400
  content = content.replace(/text-rose-700/g, 'text-rose-700 dark:text-rose-400');
  content = content.replace(/bg-rose-50/g, 'bg-rose-50 dark:bg-rose-900\/20');
  content = content.replace(/border-rose-200/g, 'border-rose-200 dark:border-rose-800');

  // Fix up double dark classes if any (just in case)
  content = content.replace(/dark:text-rose-400 dark:text-rose-400/g, 'dark:text-rose-400');
  
  fs.writeFileSync(p, content);
  console.log('Updated ' + p);
});
