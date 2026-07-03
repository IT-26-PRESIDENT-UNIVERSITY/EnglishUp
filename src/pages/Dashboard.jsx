import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { pad } from "../utils/helpers";
import { METHODS, topicLabels } from "../utils/constants";
import { fetchCurriculum, fetchGrammar } from "../utils/api";

export default function Dashboard() {
  const { progress, getLevelTitle, getXPNeeded } = useStore();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();

  const [curriculum, setCurriculum] = useState(null);
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function tick() {
      setCountdown(useStore.getState().getCountdown());
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [currData, grammarData] = await Promise.all([
          fetchCurriculum(),
          fetchGrammar()
        ]);
        setCurriculum(currData);
        setGrammarLessons(grammarData);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat data dari database");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !curriculum) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat data super lengkap dari database...</div>
      </div>
    );
  }

  const xpNeeded = getXPNeeded();
  const xpPct = Math.min((progress.xp / xpNeeded) * 100, 100);

  const dailyGoals = useStore.getState().getDailyGoals();
  const vocabPct = Math.min((dailyGoals.vocab / 10) * 100, 100);
  const grammarPct = Math.min((dailyGoals.grammar / 1) * 100, 100);
  const quizPct = Math.min((dailyGoals.quiz / 5) * 100, 100);

  const currentDayOffset = useStore.getState().getUserDayOffset();
  const DAILY_PLAN = curriculum.dailyPlan;
  const todayPlan = DAILY_PLAN[currentDayOffset] || DAILY_PLAN[DAILY_PLAN.length - 1] || {};
  const todayGrammar = grammarLessons.find((l) => l.id === todayPlan.grammar);
  const todayMethod = METHODS[todayPlan.method];
  const isTodayDone = progress.completedDays?.[todayPlan.day];

  const quickLinks = [
    { path: "/vocabulary", title: "Vocabulary Flashcard", desc: "Pelajari kata baru dengan spaced repetition" },
    { path: "/grammar", title: "Grammar Lessons", desc: "Kuasai struktur kalimat Bahasa Inggris" },
    { path: "/listening", title: "Listening Practice", desc: "Latih pendengaran dengan kalimat nyata" },
    { path: "/speaking", title: "Speaking Practice", desc: "Latih pengucapan dengan speech recognition" },
    { path: "/quiz", title: "Daily Quiz", desc: "Uji kemampuanmu dan kumpulkan XP" },
  ];

  const tips = [
    { num: "01", title: "Spaced Repetition", text: "Ulangi kata yang susah lebih sering, kata yang mudah lebih jarang." },
    { num: "02", title: "Immersion", text: "Ganti bahasa HP dan media sosial ke English mulai sekarang." },
    { num: "03", title: "30 Menit Per Hari", text: "Konsisten setiap hari jauh lebih efektif dari belajar 4 jam sekali." },
    { num: "04", title: "Shadowing", text: "Dengar kalimat lalu tiru persis cara pengucapannya." },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-6 pb-16">
        
        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 md:p-10 mb-6 overflow-hidden relative shadow-sm transition-colors duration-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div className="flex-1">
              <h1 className="text-[1.3rem] md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                Hai, Pejuang Bahasa!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-[0.95rem] mb-6">
                Target lancar Bahasa Inggris pada <strong className="text-rose-700 dark:text-rose-400 font-bold">30 Agustus 2026</strong>. Waktu terus berjalan!
              </p>
              
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 font-semibold tracking-wider">SISA WAKTU MENUJU HARI H:</p>
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {[
                  { value: pad(countdown.days), label: "HARI" },
                  { value: pad(countdown.hours), label: "JAM" },
                  { value: pad(countdown.minutes), label: "MENIT" },
                  { value: pad(countdown.seconds), label: "DETIK" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 px-3 md:px-4 text-center min-w-[58px] md:min-w-[68px]">
                    <span className="block text-[1.4rem] md:text-[1.7rem] font-extrabold font-mono text-gray-800 dark:text-gray-100 leading-none">{s.value}</span>
                    <span className="block text-[0.6rem] text-gray-500 dark:text-gray-400 uppercase tracking-[1px] mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 self-center md:self-auto">
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 flex flex-col items-center justify-center">
                <span className="text-[1.8rem] md:text-[2.2rem] font-black text-rose-700 dark:text-rose-400 font-mono leading-none">{progress.level}</span>
                <span className="text-[0.7rem] text-gray-500 dark:text-gray-400 uppercase tracking-[1px] font-bold">Level</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { value: progress.wordsLearned, label: "Kata Dikuasai" },
            { value: Object.keys(progress.grammarCompleted || {}).length, label: "Grammar Tamat" },
            { value: progress.streak, label: "Hari Berturut" },
            { value: ((progress.level - 1) * progress.level / 2 * 100) + progress.xp, label: "Total XP" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col gap-1 transition-all duration-200 shadow-sm">
              <span className="text-[1.8rem] font-extrabold text-rose-700 dark:text-rose-400 font-mono leading-none">{s.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</span>
            </div>
          ))}
        </section>

        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 md:px-6 mb-10 shadow-sm transition-colors duration-200">
          <div className="flex justify-between text-[0.82rem] text-gray-600 dark:text-gray-300 font-semibold mb-3">
            <span>Level {progress.level} &mdash; {getLevelTitle()}</span>
            <span>{progress.xp} / {xpNeeded} XP</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-rose-700 dark:bg-rose-500 rounded-full transition-all duration-700" style={{ width: `${xpPct}%` }} />
          </div>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-[20px] p-5 md:p-6 mb-6 shadow-sm transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-5 gap-4">
            <div>
              <span className="block text-[0.7rem] font-bold uppercase tracking-[2px] text-rose-700 dark:text-rose-400 mb-1">
                Hari {todayPlan.day || 1} dari {DAILY_PLAN.length}
              </span>
              <h2 className="text-[1.15rem] font-extrabold text-gray-900 dark:text-white m-0">Pelajaran Hari Ini</h2>
            </div>
            {isTodayDone ? (
              <span className="shrink-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3.5 py-1.5 rounded-full text-[0.78rem] font-bold">
                Selesai Hari Ini
              </span>
            ) : (
              <button onClick={() => navigate("/plan")} className="shrink-0 bg-rose-700 dark:bg-rose-600 text-white border-none px-4 py-2 rounded-full cursor-pointer text-sm font-semibold transition-opacity duration-200 hover:opacity-90">
                Lihat Rencana Lengkap
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors duration-200">
              <span className="text-[0.65rem] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Grammar</span>
              <span className="text-[0.88rem] font-bold text-gray-900 dark:text-gray-100 leading-snug flex-1">{todayGrammar?.title || "-"}</span>
              <button onClick={() => navigate(todayGrammar ? `/grammar?id=${todayGrammar.id}` : "/grammar")} className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1.5 rounded-md cursor-pointer text-xs font-bold self-start transition-colors duration-200 hover:bg-rose-100 dark:hover:bg-rose-900/50">
                Buka
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors duration-200">
              <span className="text-[0.65rem] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Vocabulary</span>
              <span className="text-[0.88rem] font-bold text-gray-900 dark:text-gray-100 leading-snug flex-1">{topicLabels[todayPlan.vocabTopic] || "-"}</span>
              <button onClick={() => navigate("/vocabulary?q=" + encodeURIComponent(topicLabels[todayPlan.vocabTopic] || ""))} className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1.5 rounded-md cursor-pointer text-xs font-bold self-start transition-colors duration-200 hover:bg-rose-100 dark:hover:bg-rose-900/50">
                Buka
              </button>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors duration-200">
              <span className="text-[0.65rem] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400">Metode</span>
              <span className="text-[0.88rem] font-bold text-gray-900 dark:text-gray-100 leading-snug flex-1">{todayMethod?.label || "-"}</span>
              <button onClick={() => navigate("/plan")} className="bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1.5 rounded-md cursor-pointer text-xs font-bold self-start transition-colors duration-200 hover:bg-rose-100 dark:hover:bg-rose-900/50">
                Detail
              </button>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl py-3 px-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-start transition-colors duration-200">
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 whitespace-nowrap shrink-0">Daily Challenge:</span>
            <span className="text-[0.85rem] text-gray-800 dark:text-gray-300 leading-relaxed">{todayPlan.challenge || "-"}</span>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] mb-4">Target Harian</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "10 Kata Baru", pct: vocabPct, cur: dailyGoals.vocab, max: 10 },
              { label: "1 Pelajaran Grammar", pct: grammarPct, cur: dailyGoals.grammar, max: 1 },
              { label: "5 Soal Quiz", pct: quizPct, cur: dailyGoals.quiz, max: 5 },
            ].map((g) => {
              const isDone = g.pct >= 100;
              return (
                <div key={g.label} className={`bg-white dark:bg-slate-800 border ${isDone ? 'border-green-300 dark:border-green-800/50 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-slate-700'} rounded-xl p-4 md:px-5 shadow-sm transition-colors duration-200`}>
                  <div className="flex justify-between mb-2.5">
                    <span className="text-[0.88rem] font-bold text-gray-800 dark:text-gray-200">{g.label}</span>
                    <span className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-400 font-mono">{Math.min(g.cur, g.max)}/{g.max}</span>
                  </div>
                  <div className="h-[5px] bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-green-500 dark:bg-green-600' : 'bg-rose-600 dark:bg-rose-500'}`} style={{ width: `${g.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] mb-4">Mulai Belajar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((ql) => (
              <button
                key={ql.path}
                onClick={() => navigate(ql.path)}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 text-left cursor-pointer transition-all duration-200 flex flex-col gap-1.5 hover:border-gray-300 dark:hover:border-slate-500 shadow-sm hover:shadow-md"
              >
                <span className="text-[0.95rem] font-bold text-gray-900 dark:text-white">{ql.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{ql.desc}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[1.5px] mb-4">Tips Belajar Efektif</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((t) => (
              <div key={t.num} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex gap-4 items-start shadow-sm transition-colors duration-200">
                <span className="text-[1.8rem] font-black font-mono text-gray-200 dark:text-slate-600 leading-none shrink-0">{t.num}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.88rem] font-bold text-gray-900 dark:text-gray-100">{t.title}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      
      <div className="text-center pb-8">
        <button 
          onClick={() => {
            if (window.confirm("Yakin ingin mereset semua progres belajarmu ke awal? XP, level, dan coretan hari akan hilang selamanya!")) {
              useStore.getState().resetProgress();
              window.location.reload();
            }
          }}
          className="text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-none transition-colors"
        >
          &times; Reset Seluruh Progres
        </button>
      </div>
    </div>
  );
}
