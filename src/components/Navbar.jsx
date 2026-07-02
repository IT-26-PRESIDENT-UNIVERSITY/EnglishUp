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

  return (
    <nav className="sticky top-0 z-50 h-auto sm:h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-6 py-3 sm:py-0 gap-3 sm:gap-8 shadow-sm transition-colors duration-200">
      <div className="flex flex-row items-center shrink-0 leading-tight gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/a/ae/President_University_Logo.png"
          alt="EnglishUp Logo"
          className="w-10 h-auto object-contain"
        />
        <span className="text-[1.1rem] font-extrabold text-gray-900 dark:text-gray-100">
          EnglishUp
        </span>
      </div>

      <div className="flex gap-[0.15rem] flex-1 overflow-x-auto [scrollbar-width:none] [-webkit-scrollbar]:hidden order-3 sm:order-none w-full sm:w-auto pb-1 sm:pb-0">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `text-gray-500 dark:text-gray-400 no-underline px-3 py-1.5 rounded-full text-xs sm:text-[0.85rem] font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                isActive
                  ? "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/40"
                  : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto sm:ml-0 shrink-0">
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

        <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 px-3 py-1.5 rounded-full">
          <span className="text-yellow-600 dark:text-yellow-500 text-[0.9rem]">&#9733;</span>
          <span className="font-extrabold text-[0.95rem] text-yellow-600 dark:text-yellow-500 font-mono">
            {progress.streak}
          </span>
          <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">streak</span>
        </div>
      </div>
    </nav>
  );
}
