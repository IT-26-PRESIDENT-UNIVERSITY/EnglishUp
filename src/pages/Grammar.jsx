import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { fetchGrammar } from "../utils/api";
import { pad } from "../utils/helpers";
import { generateGrammarPractice } from "../utils/ai";
import { getRandomLessonQuestions, getRandomMixedGrammarQuestions } from "../data/grammarQuestionsBank";

export default function Grammar() {
  const { addXP, completeGrammar, progress } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonQuestions, setLessonQuestions] = useState([]);
  const [isGeneratingLessonAI, setIsGeneratingLessonAI] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // State untuk Session Latihan AI (Semua Materi)
  const [isAIPractice, setIsAIPractice] = useState(false);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiScore, setAiScore] = useState(null);

  useEffect(() => {
    async function loadGrammar() {
      try {
        const data = await fetchGrammar();
        setGrammarLessons(data || []);
        
        const qId = searchParams.get("id");
        if (qId && data) {
          const lesson = data.find(l => l.id === qId);
          if (lesson) {
            handleSelectLesson(lesson);
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

  // Helper untuk menyiapkan soal lesson (menggabungkan bank soal dengan randomizer)
  function prepareLessonQuestions(lesson) {
    const bankQs = getRandomLessonQuestions(lesson.id, 5);
    if (bankQs && bankQs.length > 0) {
      return bankQs;
    }
    // Fallback jika id tidak ditemukan di bank soal
    if (lesson.practice && lesson.practice.length > 0) {
      return [...lesson.practice].sort(() => Math.random() - 0.5).map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
    }
    return getRandomMixedGrammarQuestions(5);
  }

  function handleSelectLesson(l) {
    setIsAIPractice(false);
    setActiveLesson(l);
    setLessonQuestions(prepareLessonQuestions(l));
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Acak ulang soal dari bank soal lokal untuk materi aktif
  function handleShuffleLessonQuestions() {
    if (!activeLesson) return;
    setLessonQuestions(prepareLessonQuestions(activeLesson));
    setAnswers({});
    setShowResult(false);
    useStore.getState().setToast("🎲 5 Soal latihan baru telah diacak!");
  }

  // Generate soal AI khusus untuk topik materi yang sedang dibuka
  async function handleGenerateLessonAIQuestions() {
    if (!activeLesson || isGeneratingLessonAI) return;
    setIsGeneratingLessonAI(true);
    setAnswers({});
    setShowResult(false);

    try {
      const generated = await generateGrammarPractice(activeLesson.title, activeLesson.id);
      if (Array.isArray(generated) && generated.length > 0) {
        setLessonQuestions(generated);
        useStore.getState().setToast("✨ Soal latihan AI baru untuk topik ini siap!");
      } else {
        setLessonQuestions(prepareLessonQuestions(activeLesson));
      }
    } catch (err) {
      console.error("Failed to generate AI questions for lesson:", err);
      setLessonQuestions(prepareLessonQuestions(activeLesson));
      useStore.getState().setToast("Menggunakan variasi bank soal (Offline Mode)");
    } finally {
      setIsGeneratingLessonAI(false);
    }
  }

  // Session Latihan AI Campuran (Semua Materi)
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
        setAiQuestions(getRandomMixedGrammarQuestions(5));
      }
    } catch (err) {
      console.error("AI Grammar Practice generation failed, using randomized pool:", err);
      setAiQuestions(getRandomMixedGrammarQuestions(5));
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

  function handleAnswer(qIdx, opt) {
    setAnswers((prev) => ({ ...prev, [qIdx]: opt }));
  }

  function submitLessonAnswers() {
    if (showResult) return;
    let correct = 0;
    lessonQuestions.forEach((p, i) => {
      if (answers[i] === p.answer) correct++;
    });

    if (correct === lessonQuestions.length) {
      if (completeGrammar(activeLesson.id)) {
        addXP(20, `Grammar: ${activeLesson.title}`);
      }
    } else {
      addXP(correct * 5, `Grammar Practice: ${activeLesson.title}`);
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
                  ✨ Fresh AI Questions
                </span>
              </h1>
              <p className="text-[0.8rem] text-gray-500 dark:text-gray-400 m-0">5 Soal Campuran Seluruh Topik Grammar (Selalu Bervariasi)</p>
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
                              btnCls += " bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-rose-400 hover:bg-gray-50 dark:hover:bg-slate-700";
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
    const isPerfect = showResult && Object.keys(answers).filter(i => answers[i] === lessonQuestions[i]?.answer).length === lessonQuestions.length;

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
              <span className="font-mono text-[0.95rem] font-bold text-blue-900 dark:text-blue-200">{activeLesson.formula}</span>
            </div>

            <h2 className="text-[0.75rem] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[1.5px] mb-4">Contoh Kalimat</h2>
            <div className="flex flex-col gap-3 mb-2">
              {activeLesson.examples?.map((ex, i) => (
                <div key={i} className="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
                  <p className="font-bold text-[0.95rem] text-gray-900 dark:text-gray-100 mb-1 m-0">{ex.en}</p>
                  <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 m-0 mb-2">{ex.id}</p>
                  <p className="text-[0.75rem] text-rose-700 dark:text-rose-400 font-medium m-0 flex items-center gap-1.5">
                    <span className="text-[1rem] leading-none">&#8226;</span> {ex.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 m-0">Latihan Soal (Practice)</h2>
              <p className="text-[0.8rem] text-gray-500 dark:text-gray-400 m-0">Soal diacak otomatis agar bervariasi setiap sesi</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffleLessonQuestions}
                disabled={isGeneratingLessonAI}
                className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 px-3.5 py-2 rounded-xl text-[0.8rem] font-bold cursor-pointer transition-colors flex items-center gap-1.5 border border-gray-200 dark:border-slate-600"
                title="Acak 5 soal berbeda dari bank soal"
              >
                🎲 Acak Soal Lain
              </button>

              <button
                onClick={handleGenerateLessonAIQuestions}
                disabled={isGeneratingLessonAI}
                className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 px-3.5 py-2 rounded-xl text-[0.8rem] font-bold cursor-pointer transition-colors flex items-center gap-1.5 border border-rose-200 dark:border-rose-800 disabled:opacity-50"
                title="Buat 5 soal baru dengan AI khusus topik ini"
              >
                {isGeneratingLessonAI ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Merakit Soal AI...
                  </>
                ) : (
                  <>
                    ✨ Buat Soal AI Topik Ini
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            {lessonQuestions.map((p, i) => {
              const chosen = answers[i];
              return (
                <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                  <p className="text-[1rem] font-medium text-gray-900 dark:text-gray-100 mb-4 m-0">{i + 1}. {p.q}</p>
                  <div className="flex flex-col gap-2.5">
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
                          btnCls += " bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-rose-400 hover:bg-gray-50 dark:hover:bg-slate-700";
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
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-[0.85rem] text-blue-900 dark:text-blue-200 leading-relaxed">
                      <span className="font-bold block mb-0.5">💡 Penjelasan:</span>
                      {p.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!showResult ? (
            <button 
              onClick={submitLessonAnswers}
              disabled={Object.keys(answers).length !== lessonQuestions.length}
              className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed block ml-auto"
            >
              Cek Jawaban ({Object.keys(answers).length}/{lessonQuestions.length})
            </button>
          ) : (
            <div className={`p-5 rounded-2xl border ${isPerfect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'} text-center`}>
              <h3 className={`text-[1.2rem] font-extrabold mb-2 m-0 ${isPerfect ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                {isPerfect ? "Sempurna! +20 XP" : "Latihan Selesai!"}
              </h3>
              <p className={`text-[0.9rem] mb-5 m-0 ${isPerfect ? 'text-green-600 dark:text-green-300' : 'text-yellow-600 dark:text-yellow-300'}`}>
                {isPerfect ? "Kamu telah menguasai materi ini dengan sangat baik." : "Perhatikan penjelasan jawaban yang benar di atas untuk evaluasi."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={handleShuffleLessonQuestions}
                  className="px-5 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-colors border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50"
                >
                  🎲 Coba 5 Soal Lain
                </button>
                <button 
                  onClick={handleGenerateLessonAIQuestions}
                  className="px-5 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-colors border-none bg-rose-700 text-white hover:bg-rose-800"
                >
                  ✨ Buat Soal Baru AI
                </button>
                <button 
                  onClick={() => setActiveLesson(null)}
                  className="px-5 py-2.5 rounded-full font-bold text-[0.85rem] cursor-pointer transition-colors border-none bg-green-600 text-white hover:bg-green-700"
                >
                  &#10004; Selesai & Kembali
                </button>
              </div>
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
                className={`border border-gray-200 dark:border-slate-700 rounded-[16px] p-5 text-left transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:-translate-y-1 shadow-sm group ${
                  isCompleted
                    ? "bg-green-50/50 dark:bg-green-900/10 hover:border-green-300 dark:hover:border-green-700"
                    : "bg-white dark:bg-slate-800 hover:border-gray-300 dark:border-slate-600"
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
