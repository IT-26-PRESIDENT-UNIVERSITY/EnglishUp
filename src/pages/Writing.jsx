import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { fetchWriting } from "../utils/api";

export default function Writing() {
  const { addXP } = useStore();
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchWriting();
        setTopics(data);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat topik Writing");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

  function handleSelectTopic(t) {
    setActiveTopic(t);
    setText("");
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (wordCount < activeTopic.minWords) {
      useStore.getState().setToast(`Teks terlalu pendek. Minimal ${activeTopic.minWords} kata.`);
      return;
    }

    setIsAnalyzing(true);
    setFeedback(null);

    try {
      const { evaluateWriting } = await import("../utils/ai");
      const result = await evaluateWriting(activeTopic.prompt, text);
      
      const score = result.score || 0;
      let xpReward = 10;
      if (score >= 90) xpReward = 30;
      else if (score >= 80) xpReward = 20;
      
      addXP(xpReward, `Writing: ${activeTopic.title}`);
      
      setFeedback({
        score: result.score,
        grammarScore: result.grammarScore,
        vocabScore: result.vocabScore,
        xpReward,
        message: result.message
      });
    } catch (err) {
      console.error(err);
      useStore.getState().setToast("Gagal menganalisis teks. Coba lagi nanti.");
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat topik Writing...</div>
      </div>
    );
  }

  if (activeTopic) {
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={() => setActiveTopic(null)}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0">{activeTopic.title}</h1>
              <span className="text-[0.7rem] bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{activeTopic.level}</span>
            </div>
          </header>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Topic / Prompt</h2>
            <p className="text-[1.1rem] leading-relaxed text-gray-900 dark:text-gray-100 font-medium m-0">
              {activeTopic.prompt}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-6 relative">
            <textarea
              className="w-full h-[300px] bg-transparent border-none resize-none focus:outline-none text-[1.05rem] leading-relaxed text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 custom-scrollbar"
              placeholder="Start typing your essay here..."
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={isAnalyzing || feedback}
            />
            
            <div className={`absolute bottom-4 right-6 text-[0.85rem] font-bold ${wordCount < activeTopic.minWords ? 'text-red-500' : 'text-green-600'}`}>
              {wordCount} / {activeTopic.minWords} words
            </div>
          </div>

          {!feedback && !isAnalyzing && (
            <button
              onClick={handleSubmit}
              disabled={wordCount < activeTopic.minWords}
              className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-[1.05rem] shadow-md cursor-pointer transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Submit for AI Review
            </button>
          )}

          {isAnalyzing && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center animate-pulse">
              <div className="text-[2rem] mb-4">🤖</div>
              <h3 className="text-blue-800 dark:text-blue-300 font-bold text-[1.2rem] mb-2">AI is reading your text...</h3>
              <p className="text-blue-600 dark:text-blue-400 text-[0.9rem] m-0">Analyzing grammar, vocabulary, and sentence structures.</p>
            </div>
          )}

          {feedback && (
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-slate-700">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-[2rem] font-black shadow-inner border-4 ${
                  feedback.score >= 90 ? 'bg-green-50 border-green-500 text-green-600' : 
                  feedback.score >= 80 ? 'bg-blue-50 border-blue-500 text-blue-600' : 
                  'bg-yellow-50 border-yellow-500 text-yellow-600'
                }`}>
                  {feedback.score}
                </div>
                <div>
                  <h3 className="text-[1.5rem] font-extrabold text-gray-900 dark:text-gray-100 m-0 mb-1">AI Review Complete</h3>
                  <div className="flex gap-2">
                    <span className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase">+{feedback.xpReward} XP Earned</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                  <div className="text-[0.75rem] font-bold text-gray-500 uppercase tracking-wider mb-1">Grammar</div>
                  <div className="text-[1.8rem] font-black text-gray-900 dark:text-gray-100">{feedback.grammarScore}</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                  <div className="text-[0.75rem] font-bold text-gray-500 uppercase tracking-wider mb-1">Vocabulary</div>
                  <div className="text-[1.8rem] font-black text-gray-900 dark:text-gray-100">{feedback.vocabScore}</div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <h4 className="text-[0.85rem] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-widest mb-2 m-0">General Feedback</h4>
                <p className="text-[1rem] leading-relaxed text-blue-800 dark:text-blue-200 m-0 font-medium">
                  "{feedback.message}"
                </p>
              </div>

              <button 
                onClick={() => {
                  setText("");
                  setFeedback(null);
                }}
                className="w-full mt-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                Write Again
              </button>
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
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Writing Practice</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Latih kemampuan menulismu dan dapatkan koreksi otomatis dari AI.</p>
        </header>

        <div className="flex flex-col gap-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTopic(t)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm flex flex-col gap-2 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 group-hover:text-rose-700 dark:text-rose-400 transition-colors">
                  {t.title}
                </h3>
                <span className="text-[0.7rem] bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded font-bold uppercase tracking-wider">
                  Min {t.minWords} Words
                </span>
              </div>
              <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 m-0 line-clamp-2 leading-relaxed">
                {t.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
