export default function Footer() {
  return (
    <footer className="py-6 mt-auto text-center border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
      <p className="text-[0.85rem] font-medium text-gray-500 dark:text-gray-400 m-0">
        Dibuat oleh{" "}
        <a 
          href="https://it-26-president-university.github.io/it26-profile/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-rose-700 dark:text-rose-400 hover:underline font-bold"
        >
          Information technology batch 2026
        </a>
      </p>
    </footer>
  );
}
