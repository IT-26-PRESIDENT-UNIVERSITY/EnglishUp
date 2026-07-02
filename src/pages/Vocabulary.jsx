import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { fetchVocabulary } from "../utils/api";
import { speak, translateText } from "../utils/helpers";

export default function Vocabulary() {
  const { addXP, incrementVocab } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState({});
  
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialQ);
  const [searchInput, setSearchInput] = useState(initialQ);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [view, setView] = useState("list"); // 'flashcard' | 'list'

  useEffect(() => {
    async function loadVocab() {
      setLoading(true);
      try {
        const res = await fetchVocabulary(page, view === "flashcard" ? 10 : 50, search);
        setWords(res.data || []);
        setTotalPages(res.pages || 1);
        setTotalItems(res.total || 0);
        setIdx(0);
        setFlipped(false);
      } catch (err) {
        useStore.getState().setToast("Gagal memuat kamus raksasa");
      } finally {
        setLoading(false);
      }
    }
    const delayDebounce = setTimeout(() => {
      loadVocab();
    }, search ? 500 : 0);

    return () => clearTimeout(delayDebounce);
  }, [page, search, view]);

  const word = words[idx];

  function handleFlip() {
    setFlipped(!flipped);
  }

  async function handleTranslate(w) {
    if (translations[w]) return;
    setTranslations(prev => ({ ...prev, [w]: "Menerjemahkan..." }));
    const result = await translateText(w);
    setTranslations(prev => ({ ...prev, [w]: result }));
  }

  function handleNext(difficulty) {
    if (animating) return;
    
    let xp = 0;
    if (difficulty === "easy") xp = 5;
    else if (difficulty === "ok") xp = 3;
    else if (difficulty === "hard") xp = 1;
    
    addXP(xp, "Vocabulary Flashcard");
    incrementVocab();
    
    setAnimating(true);
    setTimeout(() => {
      setFlipped(false);
      if (idx + 1 >= words.length) {
        if (page < totalPages) setPage(p => p + 1);
        else setIdx(0);
      } else {
        setIdx((i) => i + 1);
      }
      setAnimating(false);
    }, 300);
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 pb-16">
        
        <header className="mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-[1.8rem] font-extrabold text-gray-900 dark:text-gray-100 mb-1.5">Kamus Berjalan (100k+ Kata)</h1>
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-400 m-0">Menjelajahi <b>{totalItems.toLocaleString()}</b> kata dari Kamus Websters Lengkap</p>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Cari kata apa saja dalam bahasa Inggris..."
            className="w-full sm:w-[400px] px-5 py-3 rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:border-rose-500 transition-colors"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearch(e.target.value);
              setPage(1);
              if (searchParams.has("q")) {
                setSearchParams({});
              }
            }}
          />
          <div className="bg-gray-100 dark:bg-slate-700 rounded-full p-1 flex shrink-0">
            <button className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${view === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300'}`} onClick={() => { setView('list'); setPage(1); }}>List</button>
            <button className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all ${view === 'flashcard' ? 'bg-white dark:bg-slate-800 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300'}`} onClick={() => { setView('flashcard'); setPage(1); }}>Flashcard</button>
          </div>
        </div>

        {loading ? (
          view === "flashcard" ? (
            <div className="max-w-[450px] mx-auto mt-10">
              <div className="flex justify-between mb-4 px-2">
                <div className="skeleton h-4 w-32"></div>
                <div className="skeleton h-4 w-24"></div>
              </div>
              <div className="w-full h-[320px] skeleton rounded-[24px]"></div>
              <div className="flex justify-center mt-8">
                <div className="skeleton w-12 h-12 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex gap-4 shadow-sm">
                  <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                  <div className="w-full">
                    <div className="skeleton-title mb-3"></div>
                    <div className="skeleton-text mb-2 w-full"></div>
                    <div className="skeleton-text mb-2 w-5/6"></div>
                    <div className="skeleton h-3 w-1/4 mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : words.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            Kata "{search}" tidak ditemukan dalam kamus raksasa.
          </div>
        ) : view === "flashcard" ? (
          <div className="max-w-[450px] mx-auto perspective-1000 mt-10">
            <div className="flex justify-between text-[0.85rem] font-bold text-gray-500 dark:text-gray-400 mb-4 px-2">
              <span>Kartu {idx + 1} dari {words.length} (Halaman {page}/{totalPages})</span>
              <span className="text-rose-500 uppercase tracking-widest text-[0.65rem]">Master Dictionary</span>
            </div>

            <div 
              className={`relative w-full h-[320px] transition-transform duration-500 transform-style-3d cursor-pointer shadow-sm hover:shadow-md rounded-[24px] ${flipped ? 'rotate-y-180' : ''} ${animating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
              onClick={handleFlip}
            >
              <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-[24px] flex flex-col items-center justify-center p-8 text-center">
                <span className="text-[2.2rem] font-extrabold text-gray-900 dark:text-gray-100 mb-2">{word.word}</span>
                <div className="absolute bottom-6 text-[0.75rem] font-bold uppercase tracking-[2px] text-gray-400">
                  Tap untuk melihat arti
                </div>
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-[24px] flex flex-col items-center justify-center p-6 text-center overflow-y-auto custom-scrollbar">
                <span className="text-[1.5rem] font-bold text-gray-900 dark:text-gray-100 mb-4">{word.word}</span>
                <p className="text-[0.95rem] text-gray-700 dark:text-gray-300 leading-relaxed m-0 mb-3">{word.meaning || word.translation}</p>
                {word.example && word.example !== '-' && (
                  <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 italic mb-4">"{word.example}"</p>
                )}
                {translations[word.word] ? (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800 p-3 rounded-xl w-full text-sm font-medium whitespace-pre-wrap text-left">
                    {translations[word.word]}
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTranslate(word.word);
                    }}
                    className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    Terjemahkan (ID)
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 w-12 h-12 rounded-full flex items-center justify-center text-[1.2rem] cursor-pointer transition-colors shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700"
                onClick={(e) => {
                  e.stopPropagation();
                  speak(word.word);
                }}
                title="Dengarkan Pengucapan"
              >
                🔊
              </button>
            </div>

            {flipped && (
              <div className="mt-8">
                <p className="text-center text-[0.85rem] font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-[1.5px]">Seberapa sulit kata ini?</p>
                <div className="grid grid-cols-3 gap-3">
                  <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl cursor-pointer text-[0.9rem] font-bold shadow-sm transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => handleNext('hard')}>Susah (1 XP)</button>
                  <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl cursor-pointer text-[0.9rem] font-bold shadow-sm transition-all hover:bg-rose-50 dark:bg-rose-900/20 hover:text-rose-700 dark:text-rose-400 hover:border-rose-200 dark:border-rose-800" onClick={() => handleNext('ok')}>Lumayan (3 XP)</button>
                  <button className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl cursor-pointer text-[0.9rem] font-bold shadow-sm transition-all hover:bg-green-50 hover:text-green-600 hover:border-green-200" onClick={() => handleNext('easy')}>Gampang (5 XP)</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((w, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => speak(w.word)}
                    className="shrink-0 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none hover:bg-rose-100 transition-colors mt-1"
                  >
                    🔊
                  </button>
                  <div>
                    <div className="font-extrabold text-[1.1rem] text-gray-900 dark:text-gray-100 mb-2 capitalize">{w.word}</div>
                    <div className="font-medium text-[0.9rem] text-gray-700 dark:text-gray-300 leading-relaxed mb-1">{w.meaning || w.translation}</div>
                    {w.example && w.example !== '-' && (
                      <div className="text-[0.85rem] text-gray-500 dark:text-gray-400 italic mb-2">"{w.example}"</div>
                    )}
                    {translations[w.word] ? (
                      <div className="text-[0.85rem] text-yellow-700 dark:text-yellow-400 font-semibold mt-1 whitespace-pre-wrap">
                        &#8627; {translations[w.word]}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleTranslate(w.word)}
                        className="text-[0.75rem] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Terjemahkan Kata Ini
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center items-center gap-4">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Sebelumnya
              </button>
              <span className="text-[0.9rem] font-bold text-gray-500 dark:text-gray-400">
                Halaman {page} dari {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Selanjutnya
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
