import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { topicLabels, METHODS } from "../utils/constants";
import { fetchCurriculum, fetchGrammar } from "../utils/api";

export default function StudyPlan() {
  const { progress } = useStore();
  const [curriculum, setCurriculum] = useState(null);
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [loading, setLoading] = useState(true);

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
        useStore.getState().setToast("Gagal memuat Study Plan");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !curriculum) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Memuat Study Plan...</div>
      </div>
    );
  }

  const { phases, dailyPlan } = curriculum;
  const completedCount = Object.keys(progress.completedDays || {}).length;
  const totalDays = dailyPlan.length;
  const progressPct = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 pb-16">
        
        <header className="mb-8 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Mastery Timeline</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Peta jalanmu menuju kelancaran berbahasa Inggris. Ikuti hari demi hari!</p>
        </header>

        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-[1.25rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1">Progress Keseluruhan</h2>
              <span className="text-[0.85rem] text-gray-500 dark:text-gray-400 font-semibold">{completedCount} dari {totalDays} hari selesai</span>
            </div>
            <span className="text-[2.5rem] font-black font-mono text-rose-700 dark:text-rose-400 leading-none">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-rose-600 dark:bg-rose-500 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
        </section>

        <div className="flex flex-col gap-8">
          {phases.map((phase) => {
            const phaseDays = dailyPlan.filter((d) => d.phase === phase.id);
            const doneInPhase = phaseDays.filter((d) => progress.completedDays?.[d.day]).length;
            const phasePct = Math.round((doneInPhase / phaseDays.length) * 100);

            return (
              <div key={phase.id} className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 dark:border-slate-700">
                <div 
                  className="absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white"
                  style={{ backgroundColor: phasePct === 100 ? '#10b981' : '#3b82f6' }}
                />
                <div className="mb-4">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[1.5px] text-gray-500 dark:text-gray-400 mb-1 block">
                    {phase.range}
                  </span>
                  <h3 className="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100 mb-1.5">{phase.label}</h3>
                  <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 mb-3">{phase.desc}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden max-w-[200px]">
                      <div className="h-full bg-rose-600 dark:bg-rose-500 rounded-full" style={{ width: `${phasePct}%` }} />
                    </div>
                    <span className="text-[0.75rem] font-bold text-gray-500 dark:text-gray-400">{phasePct}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {phaseDays.map((day) => {
                    const isDone = progress.completedDays?.[day.day];
                    const gTitle = grammarLessons.find(l => l.id === day.grammar)?.title || "-";
                    const method = METHODS[day.method];
                    return (
                      <div 
                        key={day.day}
                        className={`bg-white dark:bg-slate-800 border rounded-xl p-4 transition-all shadow-sm ${
                          isDone 
                            ? 'border-green-300 bg-green-50/50' 
                            : 'border-gray-200 dark:border-slate-700 hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-[0.8rem] font-black font-mono px-2 py-0.5 rounded-md ${
                            isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            HARI {day.day}
                          </span>
                          {isDone && <span className="text-green-500 font-bold text-[0.8rem]">&#10003;</span>}
                        </div>
                        <div className="flex flex-col gap-1.5 text-[0.8rem]">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 font-semibold">Topik:</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100 text-right">{topicLabels[day.vocabTopic] || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 font-semibold">Grammar:</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100 text-right truncate max-w-[120px]" title={gTitle}>
                              {gTitle}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 font-semibold">Metode:</span>
                            <span className="font-bold text-rose-700 dark:text-rose-400 text-right">{method?.label || "-"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
