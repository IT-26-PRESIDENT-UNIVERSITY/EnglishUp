import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { fetchGrammar } from "../utils/api";
import { pad } from "../utils/helpers";
import { generateGrammarPractice } from "../utils/ai";

export default function Grammar() {
  const { addXP, completeGrammar, progress } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // State untuk Session Latihan AI
  const [isAIPractice, setIsAIPractice] = useState(false);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiScore, setAiScore] = useState(null);

  const fallbackAIQuestions = [
    {
      q: "She ___ to the office every day by bus.",
      options: ["go", "goes", "going", "gone"],
      answer: "goes",
      explanation: "Subjek tunggal 'she' pada Present Simple menggunakan kata kerja berakhiran -es (goes)."
    },
    {
      q: "If I ___ more time yesterday, I would have visited you.",
      options: ["have", "had", "had had", "would have"],
      answer: "had had",
      explanation: "Conditional Sentence Type 3 (situasi lampau tak terwujud) menggunakan Past Perfect (had + V3 -> had had)."
    },
    {
      q: "The report must ___ by the team before Friday.",
      options: ["submit", "be submitted", "being submitted", "submitting"],
      answer: "be submitted",
      explanation: "Kalimat pasif setelah modal verb (must) menggunakan 'be' + Past Participle (v3)."
    },
    {
      q: "They are looking forward to ___ their new classmates.",
      options: ["meet", "meeting", "met", "have met"],
      answer: "meeting",
      explanation: "Frasa 'look forward to' diikuti oleh Gerund (verb-ing)."
    },
    {
      q: "Neither the teacher nor the students ___ happy with the decision.",
      options: ["was", "were", "is", "has been"],
      answer: "were",
      explanation: "Pada struktur 'neither... nor...', kata kerja mengikuti subjek terdekat ('the students' -> plural -> were)."
    }
  ];

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

  async function startAIPracticeSession() {
    setIsGeneratingAI(true);
    setIsAIPractice(true);
    setActiveLesson(null);
    setAnswers({});
    setShowResult(false);
    setAiScore(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const topics = grammarLessons.map(l => l.title);
      const generatedQs = await generateGrammarPractice(topics);
      if (Array.isArray(generatedQs) && generatedQs.length > 0) {
        setAiQuestions(generatedQs);
      } else {
        setAiQuestions(fallbackAIQuestions);
      }
    } catch (err) {
      console.error("AI Grammar Practice generation failed, using fallback:", err);
      useStore.getState().setToast("Menggunakan bank soal campuran (AI fallback mode).");
      setAiQuestions(fallbackAIQuestions);
    } finally {
      setIsGeneratingAI(false);
    }
  }

  function submitAIPractice() {
    if (showResult) return;
    let correct = 0;
    aiQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setAiScore(correct);
    const earnedXP = correct * 10;
    if (earnedXP > 0) {
      addXP(earnedXP, "Grammar AI Practice Session");
    }
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectLesson(l) {
    setIsAIPractice(false);
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

  if (isAIPractice) {
    const allAnswered = Object.keys(answers).length === aiQuestions.length;

    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={() => { setIsAIPractice(false); setShowResult(false); setAnswers({}); }}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0 flex items-center gap-2">
                Session Latihan AI
                <span className="text-[0.7rem] uppercase tracking-[1.5px] font-bold text-rose-700 bg-rose-100 dark:bg-rose-900/30 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                  Fresh AI Questions
                </span>
              </h1>
              <p className="text-[0.8rem] text-gray-500 dark:text-gray-400 m-0">5 Soal Campuran Seluruh Topik Grammar</p>
            </div>
          </header>

          {isGeneratingAI ? (
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-12 text-center shadow-sm">
              <div className="inline-flex items-center gap-3 text-rose-700 dark:text-rose-400 font-bold text-lg animate-pulse mb-3">
                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Merakit 5 Soal Grammar Fresh Menggunakan AI...
              </div>
              <p className="text-gray-500 text-sm m-0">Menyesuaikan berbagai aturan tenses, passive voice, conditionals, dan agreement...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 mb-8">
                {aiQuestions.map((p, i) => {
                  const chosen = answers[i];
                  return (
                    <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                      <p className="text-[1rem] font-medium text-gray-900 dark:text-gray-100 mb-4 m-0">
                        {i + 1}. {p.q}
                      </p>
                      <div className="flex flex-col gap-2.5 mb-3">
                        {p.options.map((opt) => {
                          let btnCls = "text-left px-4 py-3 rounded-xl border text-[0.9rem] transition-all font-medium cursor-pointer";
                          if (showResult) {
                            if (opt === p.answer) {
                              btnCls += " bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20";
                            } else if (opt === chosen) {
                              btnCls += " bg-red-50 border-red-400 text-red-700 dark:bg-red-900/20";
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
                              onClick={() => !showResult && handleAnswer(i, opt)}
                              disabled={showResult}
                              className={btnCls}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showResult && p.explanation && (
                        <div className="mt-3 p-3.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-[0.85rem] text-blue-900 dark:text-blue-200 leading-relaxed">
                          <span className="font-bold block mb-1">💡 Penjelasan:</span>
                          {p.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!showResult ? (
                <button 
                  onClick={submitAIPractice}
                  disabled={!allAnswered}
                  className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed block ml-auto"
                >
                  Submit & Cek Skor
                </button>
              ) : (
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 text-center shadow-sm">
                  <h3 className="text-[1.3rem] font-extrabold text-gray-900 dark:text-gray-100 mb-2 m-0">
                    Hasil Session Latihan AI
                  </h3>
                  <div className="text-[2.5rem] font-black text-rose-700 dark:text-rose-400 font-mono leading-none mb-2">
                    {aiScore}<span className="text-[1.5rem] text-gray-400">/{aiQuestions.length}</span>
                  </div>
                  <p className="text-[0.95rem] text-green-600 font-bold mb-6">
                    +{aiScore * 10} XP diperoleh!
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={startAIPracticeSession}
                      className="bg-rose-700 text-white hover:bg-rose-800 px-6 py-3 rounded-full font-bold text-[0.88rem] cursor-pointer transition-all shadow-sm flex items-center gap-2"
                    >
                      🔄 Latihan Lagi (Soal Baru AI)
                    </button>
                    <button 
                      onClick={() => { setIsAIPractice(false); setShowResult(false); setAnswers({}); }}
                      className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 px-6 py-3 rounded-full font-bold text-[0.88rem] cursor-pointer transition-all"
                    >
                      ← Kembali ke Daftar Materi
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
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

        {/* Banner Session Latihan AI */}
        <div className="bg-gradient-to-r from-rose-600 to-indigo-600 dark:from-rose-700 dark:to-indigo-800 rounded-[20px] p-6 sm:p-8 text-white mb-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase tracking-[1.5px] mb-3">
              ✨ Fitur Baru • Fresh AI Questions
            </div>
            <h2 className="text-[1.4rem] sm:text-[1.6rem] font-extrabold mb-2">Session Latihan AI (Semua Materi)</h2>
            <p className="text-[0.9rem] text-rose-100 mb-6 leading-relaxed max-w-[600px]">
              Uji penguasaan tata bahasa Inggris-mu secara acak dari seluruh topik Grammar. Soal di-generate langsung oleh AI agar selalu baru, bervariasi, dan tidak membosankan!
            </p>
            <button
              onClick={startAIPracticeSession}
              disabled={isGeneratingAI}
              className="bg-white text-rose-700 hover:bg-rose-50 px-6 py-3 rounded-full font-extrabold text-[0.9rem] cursor-pointer transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
            >
              {isGeneratingAI ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Merakit 5 Soal AI Fresh...
                </>
              ) : (
                <>
                  🚀 Mulai Session Latihan AI
                </>
              )}
            </button>
          </div>
        </div>

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
