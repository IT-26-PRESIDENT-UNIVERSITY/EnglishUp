import { useState, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { shuffle } from "../utils/helpers";
import { fetchQuiz } from "../utils/api";

const QUIZ_TYPES = [
  { key: "vocab", label: "Vocabulary" },
  { key: "grammar", label: "Grammar" },
  { key: "translate", label: "Translate" },
  { key: "mixed", label: "Semua (Mixed)" },
];

export default function Quiz() {
  const { addXP, incrementQuiz } = useStore();
  const [phase, setPhase] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [shuffledOpts, setShuffledOpts] = useState([]);
  
  const [quizBanks, setQuizBanks] = useState(null);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);
  const scoreRef = useRef(0);
  const qIdxRef = useRef(0);
  const questionsRef = useRef([]);
  const chosenRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchQuiz();
        setQuizBanks(data);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat bank soal");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (phase === "active" && !chosen) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            if (!chosenRef.current) {
              doTimeout();
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, qIdx, chosen]);

  function buildQuestions(type) {
    if (!quizBanks) return [];
    let pool;
    if (type === "mixed") {
      pool = [...quizBanks.vocab, ...quizBanks.grammar, ...quizBanks.translate];
    } else {
      pool = [...quizBanks[type]];
    }
    return shuffle(pool).slice(0, 10);
  }

  function startQuiz(t) {
    const qs = buildQuestions(t);
    if (qs.length === 0) {
      useStore.getState().setToast("Bank soal untuk kategori ini sedang kosong!");
      return;
    }
    questionsRef.current = qs;
    scoreRef.current = 0;
    qIdxRef.current = 0;
    chosenRef.current = null;
    setQuestions(qs);
    setQIdx(0);
    setScore(0);
    setChosen(null);
    setShuffledOpts(shuffle(qs[0].options));
    setTimeLeft(30);
    setPhase("active");
  }

  function doTimeout() {
    chosenRef.current = "__timeout__";
    setChosen("__timeout__");
    setTimeout(() => doAdvance(false), 2000);
  }

  function handleAnswer(opt) {
    if (chosenRef.current) return;
    clearInterval(timerRef.current);
    const q = questionsRef.current[qIdxRef.current];
    const correct = opt === q.answer;
    chosenRef.current = opt;
    setChosen(opt);
    if (correct) {
      scoreRef.current++;
      setScore(scoreRef.current);
      incrementQuiz();
    }
    setTimeout(() => doAdvance(correct), 2000);
  }

  function doAdvance(correct) {
    const next = qIdxRef.current + 1;
    if (next >= questionsRef.current.length) {
      const finalScore = scoreRef.current;
      const xp = finalScore * 10 + (finalScore === questionsRef.current.length ? 50 : 0);
      addXP(xp, "Quiz selesai");
      setPhase("result");
      return;
    }
    qIdxRef.current = next;
    chosenRef.current = null;
    setQIdx(next);
    setChosen(null);
    setTimeLeft(30);
    setShuffledOpts(shuffle(questionsRef.current[next].options));
  }

  function reset() {
    setPhase("start");
    setChosen(null);
    scoreRef.current = 0;
    qIdxRef.current = 0;
    chosenRef.current = null;
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat Quiz dari database...</div>
      </div>
    );
  }

  if (phase === "start") {
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Daily Quiz</h1>
            <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Uji kemampuanmu dan kumpulkan XP - setiap jawaban benar +10 XP</p>
          </header>
          <div className="text-center py-8">
            <h2 className="text-[1.25rem] font-bold text-gray-900 dark:text-gray-100 mb-6 m-0">Pilih jenis quiz:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[400px] mx-auto">
              {QUIZ_TYPES.map((t) => (
                <button 
                  key={t.key} 
                  className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 p-5 rounded-[14px] cursor-pointer text-[0.95rem] font-semibold transition-all hover:border-rose-500 hover:text-rose-800 shadow-sm hover:shadow-md" 
                  onClick={() => startQuiz(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const xp = score * 10 + (score === questions.length ? 50 : 0);
    let verdict;
    if (pct >= 90) verdict = "Luar biasa! Sempurna!";
    else if (pct >= 70) verdict = "Bagus! Terus semangat!";
    else if (pct >= 50) verdict = "Lumayan! Masih bisa lebih baik!";
    else verdict = "Jangan menyerah! Terus belajar!";

    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Daily Quiz</h1>
          </header>
          <div className="text-center py-8">
            <h2 className="text-[1.5rem] font-extrabold text-gray-900 dark:text-gray-100 mb-6 m-0">{verdict}</h2>
            <div className="text-[3rem] sm:text-[4rem] font-black text-rose-700 dark:text-rose-400 font-mono leading-none mb-2">
              {score}<span className="text-[2rem] text-gray-400">/{questions.length}</span>
            </div>
            <div className="text-[1rem] text-green-600 font-bold mb-8">+{xp} XP diperoleh</div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[14px] p-5 mb-8 text-left flex flex-col gap-2 max-w-[300px] mx-auto shadow-sm">
              <div className="flex justify-between text-[0.9rem] text-gray-500 dark:text-gray-400"><span>Benar</span><strong className="text-gray-900 dark:text-gray-100 font-bold">{score}</strong></div>
              <div className="flex justify-between text-[0.9rem] text-gray-500 dark:text-gray-400"><span>Salah</span><strong className="text-gray-900 dark:text-gray-100 font-bold">{questions.length - score}</strong></div>
              <div className="flex justify-between text-[0.9rem] text-gray-500 dark:text-gray-400"><span>Akurasi</span><strong className="text-gray-900 dark:text-gray-100 font-bold">{pct}%</strong></div>
            </div>
            <button 
              className="bg-rose-700 border-none text-white px-10 py-3.5 rounded-full cursor-pointer text-[1rem] font-bold shadow-sm transition-all hover:opacity-90 hover:-translate-y-0.5" 
              onClick={reset}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qIdx];
  const prog = ((qIdx) / questions.length) * 100;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8 pb-16">
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Daily Quiz</h1>
        </header>

        <div className="flex justify-between text-[0.88rem] font-semibold text-gray-500 dark:text-gray-400 mb-3">
          <span>{qIdx + 1} / {questions.length}</span>
          <span>Score: {score}</span>
          <span className={timeLeft <= 10 ? "text-red-600" : ""}>
            {timeLeft}s
          </span>
        </div>

        <div className="h-[5px] bg-gray-200 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-rose-600 dark:bg-rose-500 rounded-full transition-all duration-300" style={{ width: `${prog}%` }} />
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-5 sm:p-8 mb-4 shadow-sm">
          <p className="text-[1rem] sm:text-[1.15rem] font-bold text-gray-900 dark:text-gray-100 mb-6 leading-relaxed m-0">{q.question}</p>
          <div className="flex flex-col gap-2.5">
            {shuffledOpts.map((opt) => {
              let cls = "px-5 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-800 dark:text-gray-200 cursor-pointer text-left text-[0.9rem] transition-all hover:not-disabled:border-blue-400 hover:not-disabled:bg-rose-50 dark:bg-rose-900/20 disabled:cursor-default font-medium";
              if (chosen) {
                if (opt === q.answer) cls = "px-5 py-3.5 rounded-xl border border-green-500 bg-green-50 text-green-700 text-left text-[0.9rem] cursor-default font-bold";
                else if (opt === chosen && chosen !== q.answer) cls = "px-5 py-3.5 rounded-xl border border-red-400 bg-red-50 text-red-700 text-left text-[0.9rem] cursor-default font-bold";
                else cls = "px-5 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400 text-left text-[0.9rem] cursor-default";
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!chosen}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {chosen && (
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-4 shadow-sm">
            {chosen === q.answer ? (
              <p className="text-[0.9rem] text-green-600 m-0 leading-relaxed font-bold">Benar! {q.explanation}</p>
            ) : chosen === "__timeout__" ? (
              <p className="text-[0.9rem] text-yellow-700 m-0 leading-relaxed font-bold">Waktu habis! Jawabannya: {q.answer}</p>
            ) : (
              <p className="text-[0.9rem] text-yellow-700 m-0 leading-relaxed font-bold">Salah. Jawabannya: {q.answer}. {q.explanation}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
