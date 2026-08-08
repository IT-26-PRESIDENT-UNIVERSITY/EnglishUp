import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../store/useStore";

const links = [
  { to: "/", label: "Dashboard", exact: true },
  { to: "/plan", label: "Rencana Belajar" },
  { to: "/vocabulary", label: "Vocabulary" },
  { to: "/grammar", label: "Grammar" },
  { to: "/listening", label: "Listening" },
  { to: "/speaking", label: "Speaking" },
  { to: "/reading", label: "Reading" },
  { to: "/writing", label: "Writing" },
  { to: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const { progress, theme, toggleTheme } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  // PWA Install states
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(true);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator).standalone === true;
    setIsStandalone(standalone);
    if (standalone) {
      setShowInstallBtn(false);
      return;
    }

    const ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    setIsIOS(ios);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowInstallBtn(false);
      setDeferredPrompt(null);
    } else {
      setShowInstallModal(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="flex items-center h-16 px-4 sm:px-6 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[1.1rem] font-extrabold text-gray-900 dark:text-gray-100">
              EnglishUp
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-[0.15rem] flex-1 overflow-x-auto [scrollbar-width:none]">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `text-gray-500 dark:text-gray-400 no-underline px-3 py-1.5 rounded-full text-[0.85rem] font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                    isActive ? "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/40" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side: install app + streak + theme toggle + hamburger */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Install PWA Button */}
            {!isStandalone && showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-3.5 py-1.5 rounded-full text-[0.78rem] font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer border border-rose-500/30 shrink-0"
                title="Install Aplikasi EnglishUp"
              >
                <span>📱</span>
                <span className="hidden sm:inline">Install App</span>
                <span className="sm:hidden">Install</span>
              </button>
            )}

            {/* Streak badge */}
            <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 px-3 py-1.5 rounded-full">
              <span className="text-yellow-600 dark:text-yellow-500 text-[0.9rem]">&#9733;</span>
              <span className="font-extrabold text-[0.95rem] text-yellow-600 dark:text-yellow-500 font-mono">
                {progress.streak}
              </span>
              <span className="text-[0.7rem] text-gray-500 dark:text-gray-400 hidden sm:inline">streak</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              )}
            </button>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-[0.9rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/30 font-bold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* PWA Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full relative border border-gray-100 dark:border-slate-700">
            <button 
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 w-9 h-9 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 rounded-full flex items-center justify-center font-bold text-sm hover:bg-gray-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-700 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                📲
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 leading-tight">Install EnglishUp App</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Akses belajar bahasa Inggris langsung dari HP-mu!</p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 my-4">
                <div className="p-3.5 bg-rose-50/70 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                    Ketuk tombol <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-600 font-bold">Share / Bagikan 📤</span> di Safari.
                  </p>
                </div>
                <div className="p-3.5 bg-rose-50/70 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                    Pilih <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-600 font-bold">Tambahkan ke Layar Utama (Add to Home Screen) 📲</span>.
                  </p>
                </div>
                <div className="p-3.5 bg-rose-50/70 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                    Ketuk <span className="font-extrabold text-rose-700 dark:text-rose-400">Tambah (Add)</span> di kanan atas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 my-4">
                <div className="p-3.5 bg-rose-50/70 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                    Ketuk menu titik tiga <span className="font-extrabold text-rose-700 dark:text-rose-400">⋮</span> di kanan atas browser (Chrome / Edge).
                  </p>
                </div>
                <div className="p-3.5 bg-rose-50/70 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
                    Pilih <span className="font-extrabold text-rose-700 dark:text-rose-400">Install aplikasi</span> / <span className="font-extrabold text-rose-700 dark:text-rose-400">Tambah ke Layar Utama</span>.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowInstallModal(false)}
              className="mt-2 w-full py-3 rounded-xl bg-rose-700 text-white font-extrabold text-xs tracking-wider uppercase hover:bg-rose-800 transition-colors shadow-md cursor-pointer"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
