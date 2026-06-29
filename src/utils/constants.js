export const START_DATE = new Date("2026-06-29");

export function daysSinceStart() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / 86400000);
  return Math.max(0, diff);
}

export const METHODS = {
  srs: { label: "Spaced Repetition" },
  shadowing: { label: "Shadowing" },
  retrieval: { label: "Retrieval Practice" },
  interleaving: { label: "Interleaving" },
  input: { label: "Comprehensible Input" },
  output: { label: "Forced Output" },
  review: { label: "Spaced Review" },
  flashcard: { label: "Flashcard Drill" },
  writing: { label: "Creative Writing" },
  listening: { label: "Active Listening" }
};

export const topicLabels = {
  daily: "Daily Life",
  campus: "Campus & University",
  academic: "Academic Words",
  conversation: "Spoken English",
  verbs: "Essential Verbs",
  toefl: "TOEFL Academic",
  ielts_idioms: "IELTS Idioms",
  phrasal_verbs: "Phrasal Verbs",
  basic: "Basic Vocabulary",
  numbers: "Numbers & Time",
  family: "Family & People",
  food: "Food & Dining",
  travel: "Travel & Transport",
  work: "Work & Careers",
  school: "School & Education",
  health: "Health & Medicine",
  science: "Science",
  arts: "Arts & Culture",
  environment: "Environment",
  business: "Business",
  technology: "Technology",
  society: "Society & Culture"
};
