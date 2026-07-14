import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { fetchGrammar } from "../utils/api";
import { pad } from "../utils/helpers";

export default function Grammar() {
  const { addXP, completeGrammar, progress } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGrammar() {
      try {
        const data = await fetchGrammar();
        setGrammarLessons(data);
        
        const qId = searchParams.get("id");
        if (qId) {
          const lesson = data.find(l => l.id === qId);
          if (lesson) {
            setActiveLesson(lesson);
            setSearchParams({});
          }
        }
      } catch (err) {
        useStore.getState().setToast("Gagal memuat materi Grammar");
      } finally {
        setLoading(false);
      }
    }
    loadGrammar();
  }, []);

  function handleSelectLesson(l) {
    setActiveLesson(l);
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAnswer(qIdx, opt) {
    setAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  }

  function submitAnswers() {
    if (showResult) return;
    let correct = 0;
    activeLesson.practice.forEach((p, i) => {
      if (answers[i] === p.answer) correct++;
    });

    if (correct === activeLesson.practice.length) {
      if (completeGrammar(activeLesson.id)) {
        addXP(20, `Grammar: ${activeLesson.title}`);
      }
    }
    setShowResult(true);
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat materi Grammar...</div>
      </div>
    );
  }

  if (activeLesson) {
    const isCompleted = progress.grammarCompleted?.[activeLesson.id];
    const isPerfect = showResult && Object.keys(answers).filter(i => answers[i] === activeLesson.practice[i].answer).length === activeLesson.practice.length;

    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={() => setActiveLesson(null)}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0 flex items-center gap-2">
                {activeLesson.title}
                {isCompleted && (
                  <span className="text-[0.7rem] uppercase tracking-[1.5px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                    Mode Review
                  </span>
                )}
              </h1>
              <p className="text-[0.8rem] text-gray-500 dark:text-gray-400 m-0">{activeLesson.subtitle}</p>
            </div>
          </header>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 sm:p-8 mb-8 shadow-sm">
            <h2 className="text-[0.75rem] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[1.5px] mb-4">Penjelasan</h2>
            <p className="text-[1rem] leading-[1.7] text-gray-800 dark:text-gray-200 mb-6 m-0">{activeLesson.explanation}</p>
            
            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4 rounded-r-xl mb-6">
              <span className="block text-[0.7rem] font-bold uppercase tracking-[1px] text-rose-800 mb-1">Rumus:</span>
              <span className="font-mono text-[0.95rem] font-bold text-blue-900">{activeLesson.formula}</span>
            </div>

            <h2 className="text-[0.75rem] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[1.5px] mb-4">Contoh Kalimat</h2>
            <div className="flex flex-col gap-3 mb-2">
              {activeLesson.examples.map((ex, i) => (
                <div key={i} className="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 rounded-xl p-4">
                  <p className="font-bold text-[0.95rem] text-gray-900 dark:text-gray-100 mb-1 m-0">{ex.en}</p>
                  <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 m-0 mb-2">{ex.id}</p>
                  <p className="text-[0.75rem] text-rose-700 dark:text-rose-400 font-medium m-0 flex items-center gap-1.5">
                    <span className="text-[1rem] leading-none">&#8226;</span> {ex.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 mb-5">Latihan (Practice)</h2>
          <div className="flex flex-col gap-6 mb-8">
            {activeLesson.practice.map((p, i) => {
              const chosen = answers[i];
              return (
                <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                  <p className="text-[1rem] font-medium text-gray-900 dark:text-gray-100 mb-4 m-0">{i + 1}. {p.q}</p>
                  <div className="flex flex-col gap-2.5">
                    {p.options.map((opt) => {
                      let btnCls = "text-left px-4 py-3 rounded-xl border text-[0.9rem] transition-all font-medium cursor-pointer";
                      if (showResult || isCompleted) {
                        if (opt === p.answer) {
                          btnCls += " bg-green-50 border-green-500 text-green-700";
                        } else if (opt === chosen && !isCompleted) {
                          btnCls += " bg-red-50 border-red-400 text-red-700";
                        } else {
                          btnCls += " bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-gray-400 cursor-not-allowed";
                        }
                      } else {
                        if (chosen === opt) {
                          btnCls += " bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800";
                        } else {
                          btnCls += " bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => !showResult && !isCompleted && handleAnswer(i, opt)}
                          disabled={showResult || isCompleted}
                          className={btnCls}
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

          {!showResult && !isCompleted ? (
            <button 
              onClick={submitAnswers}
              disabled={Object.keys(answers).length !== activeLesson.practice.length}
              className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed block ml-auto"
            >
              Cek Jawaban
            </button>
          ) : showResult ? (
            <div className={`p-5 rounded-2xl border ${isPerfect ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} text-center`}>
              <h3 className={`text-[1.2rem] font-extrabold mb-2 m-0 ${isPerfect ? 'text-green-700' : 'text-yellow-700'}`}>
                {isPerfect ? "Sempurna! +20 XP" : "Masih ada yang salah, coba lagi!"}
              </h3>
              <p className={`text-[0.9rem] mb-5 m-0 ${isPerfect ? 'text-green-600' : 'text-yellow-600'}`}>
                {isPerfect ? "Kamu telah menguasai materi ini." : "Perhatikan jawaban yang benar di atas."}
              </p>
              {isPerfect ? (
                <button 
                  onClick={() => setActiveLesson(null)}
                  className="px-6 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-colors border-none bg-green-600 text-white hover:bg-green-700"
                >
                  &#10004; Accomplished (Kembali)
                </button>
              ) : (
                <button 
                  onClick={() => { setShowResult(false); setAnswers({}); }}
                  className="px-6 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-colors border-none bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Coba Lagi
                </button>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 p-5 rounded-2xl text-center text-gray-500 dark:text-gray-400 font-bold">
              Materi Sudah Diselesaikan (Accomplished)
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Grammar Lessons</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Kuasai struktur kalimat dari dasar hingga Advanced</p>
        </header>

        <div className="flex flex-col gap-4">
          {grammarLessons.map((l, i) => {
            const isCompleted = progress.grammarCompleted?.[l.id];
            return (
              <button
                key={l.id}
                onClick={() => handleSelectLesson(l)}
                className={`border border-gray-200 dark:border-slate-700 rounded-[16px] p-5 text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? "bg-green-50/50 dark:bg-green-900/10"
                    : "bg-white dark:bg-slate-800 cursor-pointer hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm group"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[0.7rem] font-mono font-bold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                      #{pad(i + 1)}
                    </span>
                    <h3 className={`text-[1.1rem] font-bold m-0 transition-colors ${
                      isCompleted ? "text-green-800 dark:text-green-500" : "text-gray-900 dark:text-gray-100 group-hover:text-rose-700 dark:text-rose-400"
                    }`}>
                      {l.title}
                    </h3>
                  </div>
                  <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 m-0">{l.subtitle}</p>
                </div>
                
                <div className="shrink-0 flex items-center gap-3">
                  {isCompleted ? (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-[0.75rem] font-bold uppercase tracking-[1px] shadow-sm">
                      ✨ Accomplished
                    </span>
                  ) : (
                    <span className="text-gray-400 group-hover:text-rose-700 dark:text-rose-400 transition-colors text-[1.2rem]">
                      &#8594;
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
