import { useState, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { fetchListening } from "../utils/api";
import { speak } from "../utils/helpers";

export default function Listening() {
  const { addXP, setToast } = useStore();
  const [listeningTopics, setListeningTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("general");

  const [activeTopic, setActiveTopic] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [scorePercent, setScorePercent] = useState(null);

  const [playCount, setPlayCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPenalized, setIsPenalized] = useState(false);

  const hasStartedRef = useRef(false);
  const isCompletedRef = useRef(false);
  const playTimerRef = useRef(null);

  const filteredTopics = listeningTopics.filter((t) => {
    if (filterMode === "all") return true;
    const isAcademic =
      t.level === "TOEFL" || t.level === "IELTS" || t.type === "Academic";
    if (filterMode === "academic") return isAcademic;
    return !isAcademic;
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchListening();
        setListeningTopics(data);
      } catch {
        setToast("Gagal memuat materi Listening");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [setToast]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(playTimerRef.current);

      if (hasStartedRef.current && !isCompletedRef.current && activeTopic) {
        const penalized = JSON.parse(
          localStorage.getItem("em_penalized_listening") || "[]"
        );
        if (!penalized.includes(activeTopic.id)) {
          penalized.push(activeTopic.id);
          localStorage.setItem(
            "em_penalized_listening",
            JSON.stringify(penalized)
          );
        }
      }
    };
  }, [activeTopic]);

  function handleSelectTopic(topic) {
    window.speechSynthesis.cancel();
    clearTimeout(playTimerRef.current);
    setActiveTopic(topic);
    setAnswers({});
    setScore(null);
    setScorePercent(null);
    setPlayCount(0);
    setIsPlaying(false);
    hasStartedRef.current = false;
    isCompletedRef.current = false;

    const penalized = JSON.parse(
      localStorage.getItem("em_penalized_listening") || "[]"
    );
    setIsPenalized(penalized.includes(topic.id));
  }

  function handleBack() {
    window.speechSynthesis.cancel();
    clearTimeout(playTimerRef.current);
    setActiveTopic(null);
    setAnswers({});
    setScore(null);
    setScorePercent(null);
  }

  function handlePlayAudio() {
    if (playCount >= 2 || score !== null) return;

    hasStartedRef.current = true;
    setPlayCount((prev) => prev + 1);
    setIsPlaying(true);

    window.speechSynthesis.cancel();
    const text = activeTopic.script || activeTopic.transcript || "";
    speak(text, 0.9);

    clearTimeout(playTimerRef.current);
    const estimatedDuration = Math.max(3000, text.length * 65);
    playTimerRef.current = setTimeout(() => setIsPlaying(false), estimatedDuration);
  }

  function handleAnswer(qIdx, val) {
    if (score !== null) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: val }));
  }

  function handleSubmit() {
    isCompletedRef.current = true;
    window.speechSynthesis.cancel();
    clearTimeout(playTimerRef.current);
    setIsPlaying(false);

    let correct = 0;
    activeTopic.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    const percent = Math.round((correct / activeTopic.questions.length) * 100);
    setScore(correct);
    setScorePercent(percent);

    let earnedXP = correct * 10;
    if (isPenalized) earnedXP = Math.floor(earnedXP / 2);

    if (earnedXP > 0) {
      const penaltyMsg = isPenalized ? " (50% Penalty Applied)" : "";
      addXP(earnedXP, `Listening: ${activeTopic.title}${penaltyMsg}`);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">
          Memuat materi Listening...
        </div>
      </div>
    );
  }

  if (activeTopic) {
    const playsLeft = 2 - playCount;
    const allAnswered =
      Object.keys(answers).length === activeTopic.questions.length;

    return (
      <div className="min-h-[calc(100vh-64px)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-8 pb-16">
          <header className="mb-6 pb-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-4">
            <button
              onClick={handleBack}
              className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-slate-600 shrink-0"
            >
              &#8592;
            </button>
            <div>
              <h1 className="text-[1.4rem] font-extrabold text-gray-900 dark:text-gray-100 m-0">
                {activeTopic.title}
              </h1>
              <span className="text-[0.7rem] uppercase tracking-[1.5px] font-bold text-rose-700 dark:text-rose-400">
                {activeTopic.type}
              </span>
            </div>
          </header>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-[16px] p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-[0.82rem] font-medium m-0">
              ⚠️{" "}
              <strong>Perhatian:</strong> Audio hanya dapat diputar maksimal{" "}
              <strong>2 kali</strong>. Keluar sebelum submit akan memotong EXP sebesar{" "}
              <strong>50%</strong>.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[20px] p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={handlePlayAudio}
              disabled={playsLeft <= 0 || score !== null}
              className={`w-20 h-20 rounded-full shrink-0 cursor-pointer transition-all border-none shadow-sm flex items-center justify-center ${
                playsLeft <= 0 || score !== null
                  ? "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
                  : isPlaying
                  ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 animate-pulse"
                  : "bg-rose-700 text-white hover:bg-rose-800 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              <span className="text-3xl ml-1">&#9654;</span>
            </button>
            <div>
              <p className="text-[0.95rem] font-bold text-gray-800 dark:text-gray-100 m-0 mb-1">
                {isPlaying
                  ? "Playing Audio..."
                  : playsLeft <= 0
                  ? "No Plays Remaining"
                  : `Play Audio (${playsLeft} play${playsLeft !== 1 ? "s" : ""} left)`}
              </p>
              <p className="text-[0.8rem] text-gray-500 dark:text-gray-400 m-0">
                {playCount} / 2 plays used
              </p>
              <div className="flex gap-2 mt-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className={`h-2 w-10 rounded-full transition-colors ${
                      i < playCount
                        ? "bg-rose-500"
                        : "bg-gray-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 mb-5">
            Comprehension Check
          </h2>
          <div className="flex flex-col gap-5 mb-8">
            {activeTopic.questions.map((q, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm"
              >
                <p className="text-[0.95rem] font-bold text-gray-900 dark:text-gray-100 mb-4 m-0">
                  {idx + 1}. {q.q}
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[idx] === opt;
                    const isCorrect = score !== null && opt === q.answer;
                    const isWrong =
                      score !== null && isSelected && opt !== q.answer;

                    let cls =
                      "text-left px-4 py-2.5 rounded-xl border text-[0.85rem] transition-all font-medium ";
                    if (score !== null) {
                      if (isCorrect)
                        cls +=
                          "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-300";
                      else if (isWrong)
                        cls +=
                          "bg-red-50 border-red-400 text-red-700 dark:bg-red-900/20 dark:text-red-300";
                      else
                        cls +=
                          "bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-gray-400 opacity-60";
                    } else {
                      cls += isSelected
                        ? "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-800 dark:text-rose-300"
                        : "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-rose-400 hover:bg-gray-50 dark:hover:bg-slate-700";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(idx, opt)}
                        disabled={score !== null}
                        className={cls}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {score === null ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="bg-rose-700 border-none text-white px-8 py-3.5 rounded-full cursor-pointer text-[0.95rem] font-bold shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed block ml-auto"
            >
              Submit Jawaban
            </button>
          ) : (
            <div
              className={`p-6 rounded-2xl text-center ${
                scorePercent >= 70
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              }`}
            >
              <h3
                className={`text-[1.4rem] font-extrabold mb-1 m-0 ${
                  scorePercent >= 70
                    ? "text-green-700 dark:text-green-400"
                    : "text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {score}/{activeTopic.questions.length} benar — {scorePercent}%
              </h3>
              {isPenalized && (
                <p className="text-red-600 dark:text-red-400 font-medium text-[0.85rem] mt-1 mb-0">
                  Penalti 50% EXP diterapkan karena keluar sebelumnya.
                </p>
              )}
              <p
                className={`text-[0.9rem] mt-1 m-0 ${
                  scorePercent >= 70
                    ? "text-green-600 dark:text-green-300"
                    : "text-yellow-600 dark:text-yellow-300"
                }`}
              >
                {scorePercent >= 70
                  ? "Kerja bagus! Terus tingkatkan kemampuanmu."
                  : "Terus berlatih, kamu pasti bisa!"}
              </p>
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
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">
            Listening Practice
          </h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">
            Latih telinga dengan percakapan dan kuliah akademik (IELTS/TOEFL)
          </p>
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

        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-[1rem] font-bold">Tidak ada materi ditemukan.</p>
            <p className="text-[0.85rem] mt-1">Coba filter lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((t) => {
              const penalized = JSON.parse(
                localStorage.getItem("em_penalized_listening") || "[]"
              );
              const hasPenalty = penalized.includes(t.id);

              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTopic(t)}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[16px] p-6 text-left cursor-pointer transition-all hover:-translate-y-1 hover:border-gray-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[0.7rem] uppercase tracking-[1.5px] font-bold px-2.5 py-1 rounded-full ${
                        t.level === "Beginner"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : t.level === "Intermediate" ||
                            t.level === "Advanced"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {t.level || t.type}
                    </span>
                    <div className="flex items-center gap-2">
                      {hasPenalty && (
                        <span className="text-[0.7rem] font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          -50% EXP
                        </span>
                      )}
                      <span className="text-[0.8rem] text-gray-500 dark:text-gray-400 font-mono font-bold">
                        Audio
                      </span>
                    </div>
                  </div>
                  <h3 className="text-[1.1rem] font-bold text-gray-900 dark:text-gray-100 m-0 mb-3 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 m-0 line-clamp-2 leading-relaxed flex-1">
                    {String(t.script || t.transcript || "").substring(0, 100)}
                    ...
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}