import { useState, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { fetchSpeaking } from "../utils/api";
import { speak, calcSimilarity } from "../utils/helpers";

export default function Speaking() {
  const { addXP } = useStore();
  const [topic, setTopic] = useState(null); // 'intro' | 'ielts_part2' | 'toefl_independent'
  const [activePrompt, setActivePrompt] = useState(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const recognitionRef = useRef(null);
  
  const [speakingBanks, setSpeakingBanks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSpeaking();
        setSpeakingBanks(data);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat materi Speaking");
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Inisialisasi Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + " ";
        }
        setTranscript(currentTranscript.trim());
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          useStore.getState().setToast("Akses mikrofon ditolak. Izinkan mikrofon di pengaturan browser.");
          setIsRecording(false);
        }
      };

      recognitionRef.current = rec;
    } else {
      useStore.getState().setToast("Browser ini tidak mendukung Speech Recognition.");
    }
  }, []);

  function handleSelectTopic(level) {
    setTopic(level);
    const bank = speakingBanks.filter(s => s.level === level);
    const pool = bank.length > 0 ? bank : speakingBanks;
    setActivePrompt(pool[Math.floor(Math.random() * pool.length)]);
    setTranscript("");
    setScore(null);
  }

  function toggleRecord() {
    if (!recognitionRef.current) {
      useStore.getState().setToast("Speech Recognition tidak didukung di browser ini.");
      return;
    }

    if (!isRecording) {
      setIsRecording(true);
      setTranscript("");
      setScore(null);
      recognitionRef.current.start();
    } else {
      setIsRecording(false);
      recognitionRef.current.stop();
      
      setTimeout(() => {
        setScore((prevScore) => {
          if (prevScore !== null) return prevScore; // Avoid double scoring
          // Gunakan state terbaru (transcript bisa jadi terlambat ter-update jika mengambil dari onresult terakhir)
          setTranscript((finalTranscript) => {
            const finalScore = calcSimilarity(activePrompt.targetText, finalTranscript);
            addXP(15, "Speaking Practice");
            return finalTranscript;
          });
          // Note: state updates in setTranscript updater won't directly set score. We need a better approach.
        });
      }, 500);
      
      // Let's use standard state since stop is async
      setTimeout(() => {
         const currentText = document.getElementById("transcript-text")?.innerText || "";
         if (currentText) {
             const finalScore = calcSimilarity(activePrompt.targetText, currentText);
             setScore(finalScore);
             if (finalScore > 0) addXP(15, "Speaking Practice");
         } else {
             setScore(0);
         }
      }, 500);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat materi Speaking...</div>
      </div>
    );
  }

  if (topic && activePrompt) {
    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button 
              onClick={() => setTopic(null)}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:border-slate-600"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0">Speaking Practice</h1>
            </div>
          </header>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 sm:p-8 mb-8 shadow-sm">
            <h2 className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] mb-4">Prompt ({activePrompt.level})</h2>
            <p className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 leading-relaxed m-0 mb-4">{activePrompt.scenario}</p>
            <p className="text-[0.9rem] text-gray-500 dark:text-gray-400 italic m-0">Target: "{activePrompt.targetText}"</p>
          </div>

          <div className="text-center mb-8">
            <button 
              onClick={toggleRecord}
              className={`w-20 h-20 rounded-full cursor-pointer transition-all border-none shadow-sm flex items-center justify-center mx-auto mb-4 ${
                isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-rose-700 text-white hover:bg-rose-800 hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <span className="text-3xl">{isRecording ? '◼' : '🎤'}</span>
            </button>
            <p className="text-[0.85rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] m-0">
              {isRecording ? "Sedang Merekam... (Tap untuk Stop)" : "Mulai Bicara"}
            </p>
          </div>

          {(transcript || isRecording) && (
            <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 shadow-sm mb-8">
              <h3 className="text-[0.85rem] font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center justify-between">
                Transcript
                {isRecording && <span className="flex items-center gap-1.5 text-red-500 text-[0.7rem]"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>Live</span>}
              </h3>
              <p id="transcript-text" className="text-[0.95rem] text-gray-700 dark:text-gray-300 leading-relaxed italic m-0 min-h-[2rem]">
                {transcript || (isRecording ? "Mendengarkan... (Silakan bicara)" : "")}
              </p>
            </div>
          )}

          {score !== null && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-sm">
              <h3 className="text-[1.25rem] font-extrabold text-green-700 mb-2 m-0">Pronunciation Score: {score}/100</h3>
              <p className="text-[0.9rem] text-green-600 m-0 mb-4">
                {score >= 80 ? "Luar biasa! Pelafalanmu sangat jelas." : score >= 50 ? "Lumayan bagus, tapi masih bisa ditingkatkan." : "Perlu lebih banyak latihan pelafalan."}
              </p>
              <button 
                onClick={() => { setTranscript(""); setScore(null); }}
                className="bg-green-600 text-white px-6 py-2.5 rounded-full cursor-pointer border-none font-bold text-[0.85rem] transition-colors hover:bg-green-700"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-8 pb-16">
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Speaking Simulator</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Latih kefasihan berbicara tanpa takut salah</p>
        </header>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => handleSelectTopic('Beginner')}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm flex items-center justify-between group"
          >
            <div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-1 group-hover:text-rose-700 dark:text-rose-400 transition-colors">Beginner</h3>
              <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 m-0">Topik sehari-hari dan perkenalan diri</p>
            </div>
            <span className="text-gray-400 group-hover:text-rose-700 dark:text-rose-400 transition-colors text-[1.2rem]">&#8594;</span>
          </button>
          
          <button 
            onClick={() => handleSelectTopic('Intermediate')}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm flex items-center justify-between group"
          >
            <div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-1 group-hover:text-rose-700 dark:text-rose-400 transition-colors">Intermediate</h3>
              <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 m-0">Diskusi umum dan opini terstruktur</p>
            </div>
            <span className="text-gray-400 group-hover:text-rose-700 dark:text-rose-400 transition-colors text-[1.2rem]">&#8594;</span>
          </button>

          <button 
            onClick={() => handleSelectTopic('Advanced')}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:border-slate-600 shadow-sm flex items-center justify-between group"
          >
            <div>
              <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-1 group-hover:text-rose-700 dark:text-rose-400 transition-colors">Advanced</h3>
              <p className="text-[0.85rem] text-gray-500 dark:text-gray-400 m-0">Topik akademik (TOEFL/IELTS) dan debat</p>
            </div>
            <span className="text-gray-400 group-hover:text-rose-700 dark:text-rose-400 transition-colors text-[1.2rem]">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
