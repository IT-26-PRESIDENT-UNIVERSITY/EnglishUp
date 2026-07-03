import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { fetchReading } from "../utils/api";
import { cleanAIPrompt } from "../utils/helpers";
import { generateDynamicText } from "../utils/ai";

export default function Reading() {
  const { addXP, completeReading, progress } = useStore();
  const [phase, setPhase] = useState("list");
  const [activePassage, setActivePassage] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  
  const [readingPassages, setReadingPassages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterMode, setFilterMode] = useState("general");
  
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const filteredPassages = readingPassages.filter(p => {
    if (filterMode === "all") return true;
    const isAcademic = p.level === "TOEFL" || p.level === "IELTS" || p.difficulty === "Hard";
    if (filterMode === "academic") return isAcademic;
    return !isAcademic;
  });

  const totalPages = Math.ceil(filteredPassages.length / ITEMS_PER_PAGE) || 1;
  const paginatedPassages = filteredPassages.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filterMode]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchReading();
        setReadingPassages(data);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat bahan bacaan");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function startPassage(p) {
    setIsGenerating(true);
    let passageContent = p.text || p.content || "";
    
    // If text looks like a dummy placeholder, generate it!
    if (!passageContent || passageContent.includes("(Imagine 500 words") || passageContent.length < 50) {
      try {
        const generated = await generateDynamicText('reading', p.title, p.questions);
        if (generated) {
          passageContent = generated;
          p.content = generated; // cache locally
        }
      } catch (err) {
        useStore.getState().setToast("Gagal men-generate teks unik (menggunakan teks fallback).");
        passageContent = cleanAIPrompt(passageContent, false, p.title);
      }
    }

    setIsGenerating(false);
    setActivePassage({ ...p, content: passageContent });
    setAnswers({});
    setScore(0);
    setPhase("reading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswer(qIdx, opt) {
    setAnswers(prev => ({ ...prev, [qIdx]: opt }));
  }

  function submitReading() {
    if (phase !== "reading") return;
    let currentScore = 0;
    activePassage.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    
    const xp = currentScore * 15 + (currentScore === activePassage.questions.length ? 30 : 0);
    if (xp > 0 && completeReading(activePassage.id)) {
      addXP(xp, "Reading Comprehension");
    }
    
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToList() {
    setPhase("list");
    setActivePassage(null);
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat materi Reading...</div>
      </div>
    );
  }

  if (phase === "result") {
    const totalQ = activePassage.questions.length;
    const pct = Math.round((score / totalQ) * 100);
    const xp = score * 15 + (score === totalQ ? 30 : 0);

    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Reading Results</h1>
          </header>
          <div className="text-center py-8">
            <h2 className="text-[1.5rem] font-extrabold text-gray-900 dark:text-gray-100 mb-6 m-0">
              {pct >= 80 ? "Kerja Bagus!" : pct >= 50 ? "Lumayan!" : "Terus Berlatih!"}
            </h2>
            <div className="text-[3rem] sm:text-[4rem] font-black text-rose-700 dark:text-rose-400 font-mono leading-none mb-2">
              {score}<span className="text-[2rem] text-gray-400">/{totalQ}</span>
            </div>
            <div className="text-[1rem] text-green-600 font-bold mb-8">+{xp} XP diperoleh</div>
            
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[14px] p-6 mb-8 text-left shadow-sm">
              <h3 className="text-[1rem] font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Review Jawaban:</h3>
              {activePassage.questions.map((q, idx) => {
                const isCorrect = answers[idx] === q.answer;
                return (
                  <div key={idx} className="mb-4 last:mb-0">
                    <p className="text-[0.9rem] text-gray-700 dark:text-gray-300 font-bold mb-1">{idx + 1}. {q.q}</p>
                    <p className={`text-[0.85rem] m-0 font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      Kamu jawab: {answers[idx] || "(Kosong)"}
                    </p>
                    {!isCorrect && (
                      <p className="text-[0.85rem] text-green-600 m-0 mt-1 font-bold">
                        Jawaban benar: {q.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <button 
              className="bg-rose-700 border-none text-white px-10 py-3.5 rounded-full cursor-pointer text-[1rem] font-bold shadow-sm transition-all hover:opacity-90 hover:-translate-y-0.5" 
              onClick={backToList}
            >
              Kembali ke Daftar Bacaan
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "reading") {
    const allAnswered = Object.keys(answers).length === activePassage.questions.length;
    
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={backToList}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0">{activePassage.title}</h1>
            </div>
          </header>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 sm:p-8 mb-8 shadow-sm">
            <h2 className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] mb-4">Teks Bacaan</h2>
            <p className="text-[1rem] leading-[1.8] text-gray-800 dark:text-gray-200 m-0 whitespace-pre-wrap">
              {cleanAIPrompt(activePassage.text || activePassage.content, false, activePassage.title)}
            </p>
          </div>

          <h2 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 mb-5">Pertanyaan ({activePassage.questions.length})</h2>
          <div className="flex flex-col gap-6 mb-8">
            {activePassage.questions.map((q, idx) => {
              const chosen = answers[idx];
              return (
                <div key={idx} className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                  <p className="text-[1rem] font-bold text-gray-900 dark:text-gray-100 mb-4 m-0">{idx + 1}. {q.q}</p>
                  <div className="flex flex-col gap-2.5">
                    {q.options.map((opt) => {
                      const isSelected = chosen === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(idx, opt)}
                          className={`text-left px-4 py-3 rounded-xl border text-[0.9rem] transition-all cursor-pointer font-medium ${
                            isSelected 
                              ? "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800" 
                              : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-rose-800"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button 
              onClick={submitReading}
              disabled={!allAnswered || isGenerating}
              className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
            >
              Submit Jawaban
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Reading Practice</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Latih pemahaman bacaan dengan teks TOEFL & IELTS Level</p>
        </header>

        <div className="flex gap-2 mb-6">
          {["all", "general", "academic"].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-4 py-1.5 rounded-full text-[0.8rem] font-bold border transition-colors ${
                filterMode === mode 
                  ? "bg-rose-600 border-rose-600 text-white" 
                  : "bg-transparent border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-400 hover:border-rose-500"
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {paginatedPassages.map((p) => (
            <button
              key={p.id}
              onClick={() => startPassage(p)}
              disabled={isGenerating}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group flex flex-col relative"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-slate-800/70 rounded-[16px] backdrop-blur-sm">
                  <div className="text-rose-700 dark:text-rose-400 font-bold text-sm animate-pulse flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Merakit Teks (7+ Paragraf)...
                  </div>
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[0.7rem] uppercase tracking-[1.5px] font-bold px-2.5 py-1 rounded-full ${
                    p.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border border-green-200' :
                    p.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                    'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {p.difficulty}
                  </span>
                  {progress.readingCompleted?.[p.id] && (
                    <span className="text-[0.65rem] uppercase tracking-[1px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                      Selesai
                    </span>
                  )}
                </div>
                <span className="text-[0.8rem] text-gray-500 dark:text-gray-400 font-mono font-bold">{p.questions.length} Qs</span>
              </div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-2 group-hover:text-rose-700 dark:text-rose-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 m-0 line-clamp-2 leading-relaxed flex-1">
                {cleanAIPrompt(p.text || p.content, false, p.title)}
              </p>
              <div className="mt-4 text-[0.85rem] font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                Mulai Baca &rarr;
              </div>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 font-bold text-[0.9rem]"
            >
              Prev
            </button>
            <span className="text-[0.9rem] font-bold text-gray-600 dark:text-gray-400">
              Halaman {page} dari {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 font-bold text-[0.9rem]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
