import { useState, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { fetchListening } from "../utils/api";
import { speak, cleanAIPrompt } from "../utils/helpers";
import { generateDynamicText } from "../utils/ai";

export default function Listening() {
  const { addXP, completeListening, progress } = useStore();
  const [activeTopic, setActiveTopic] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  
  const [listeningTopics, setListeningTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterMode, setFilterMode] = useState("general");
  
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const filteredTopics = listeningTopics.filter(t => {
    if (filterMode === "all") return true;
    const isAcademic = t.level === "TOEFL" || t.level === "IELTS" || t.type === "Academic";
    if (filterMode === "academic") return isAcademic;
    return !isAcademic;
  });

  const totalPages = Math.ceil(filteredTopics.length / ITEMS_PER_PAGE) || 1;
  const paginatedTopics = filteredTopics.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filterMode]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchListening();
        setListeningTopics(data);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat materi Listening");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function startListening(t) {
    setIsGenerating(true);
    let transcriptContent = t.script || t.transcript || "";
    
    if (!transcriptContent || transcriptContent.includes("(Imagine 500 words") || transcriptContent.length < 50) {
      try {
        const generated = await generateDynamicText('listening', t.title, t.questions);
        if (generated) {
          transcriptContent = generated;
          t.script = generated; // cache locally
        }
      } catch (err) {
        useStore.getState().setToast("Gagal men-generate dialog unik (menggunakan teks fallback).");
        transcriptContent = cleanAIPrompt(transcriptContent, true, t.title);
      }
    }

    setIsGenerating(false);
    setActiveTopic({ ...t, script: transcriptContent });
    setAnswers({});
    setScore(null);
    setPhase("listening");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePlay(id, text, title = "") {
    setPlayingId(id);
    speak(cleanAIPrompt(text, true, title), 0.9);
    setTimeout(() => setPlayingId(null), 3000); // Mock reset
  }

  function handleAnswer(qIdx, val) {
    setAnswers(prev => ({ ...prev, [qIdx]: val }));
  }

  function submitAnswers() {
    if (score !== null) return;
    let correct = 0;
    activeTopic.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    if (correct > 0 && completeListening(activeTopic.id)) {
      addXP(correct * 10, "Listening Practice");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat materi Listening...</div>
      </div>
    );
  }

  if (activeTopic) {
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={() => { setActiveTopic(null); setAnswers({}); setScore(null); setPhase("list"); }}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0">{activeTopic.title}</h1>
              <span className="text-[0.7rem] uppercase tracking-[1.5px] font-bold text-rose-700 dark:text-rose-400">{activeTopic.type}</span>
            </div>
          </header>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 sm:p-8 mb-8 shadow-sm text-center">
            <button 
              onClick={() => handlePlay('full', activeTopic.script || activeTopic.transcript, activeTopic.title)}
              className={`w-20 h-20 rounded-full cursor-pointer transition-all border-none shadow-sm flex items-center justify-center mx-auto mb-4 ${
                playingId === 'full' ? 'bg-rose-100 text-rose-700 dark:text-rose-400 animate-pulse' : 'bg-rose-700 text-white hover:bg-rose-800 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <span className="text-3xl ml-1">&#9654;</span>
            </button>
            <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[1.5px] m-0">
              {playingId === 'full' ? 'Playing Audio...' : 'Play Audio (TTS)'}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 mb-8 shadow-sm">
            <h2 className="text-[1rem] font-bold text-gray-900 dark:text-gray-100 mb-4">Transcript</h2>
            <p className="text-[0.95rem] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{cleanAIPrompt(activeTopic.script || activeTopic.transcript, true, activeTopic.title)}</p>
          </div>

          <h2 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 mb-5">Comprehension Check</h2>
          <div className="flex flex-col gap-5 mb-8">
            {activeTopic.questions.map((q, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                <p className="text-[0.95rem] font-bold text-gray-900 dark:text-gray-100 mb-4 m-0">{idx + 1}. {q.q}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => score === null && handleAnswer(idx, opt)}
                      className={`text-left px-4 py-2.5 rounded-xl border text-[0.85rem] transition-all font-medium ${
                        score !== null
                          ? opt === q.answer 
                            ? "bg-green-50 border-green-500 text-green-700" 
                            : opt === answers[idx] 
                              ? "bg-red-50 border-red-400 text-red-700" 
                              : "bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-gray-400"
                          : answers[idx] === opt
                            ? "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800"
                            : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                      }`}
                      disabled={score !== null}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {score === null ? (
            <button 
              onClick={submitAnswers}
              disabled={Object.keys(answers).length !== activeTopic.questions.length || isGenerating}
              className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed block ml-auto"
            >
              Submit Jawaban
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center">
              <h3 className="text-[1.2rem] font-extrabold text-green-700 mb-2 m-0">Skor: {score}/{activeTopic.questions.length}</h3>
              <p className="text-[0.9rem] text-green-600 m-0">+{score * 10} XP diperoleh.</p>
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
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Listening Practice</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Latih telinga dengan percakapan dan kuliah akademik (IELTS/TOEFL)</p>
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
          {paginatedTopics.map((t) => (
            <button
              key={t.id}
              onClick={() => startListening(t)}
              disabled={isGenerating}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex flex-col group relative"
            >
              {isGenerating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-slate-800/70 rounded-[16px] backdrop-blur-sm">
                  <div className="text-rose-700 dark:text-rose-400 font-bold text-sm animate-pulse flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Merakit Audio Script...
                  </div>
                </div>
              )}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[0.7rem] uppercase tracking-[1.5px] font-bold px-2.5 py-1 rounded-full ${
                    t.level === 'Beginner' ? 'bg-green-50 text-green-700 border border-green-200' :
                    t.level === 'Intermediate' || t.level === 'Advanced' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                    'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {t.level || t.type}
                  </span>
                  {progress.listeningCompleted?.[t.id] && (
                    <span className="text-[0.65rem] uppercase tracking-[1px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                      Selesai
                    </span>
                  )}
                </div>
                <span className="text-[0.8rem] text-gray-500 dark:text-gray-400 font-mono font-bold">Audio</span>
              </div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-3 group-hover:text-rose-700 dark:text-rose-400 transition-colors">
                {t.title}
              </h3>
              <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 m-0 line-clamp-2 leading-relaxed flex-1">
                {cleanAIPrompt(String(t.script || t.transcript || ""), true, t.title).substring(0, 100)}...
              </p>
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
