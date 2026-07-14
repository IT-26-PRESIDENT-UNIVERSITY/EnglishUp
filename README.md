# EnglishUp

Platform belajar Bahasa Inggris interaktif yang dirancang khusus untuk mahasiswa President University (dan terbuka untuk umum). Fokus utamanya adalah membantu mahasiswa menguasai kosakata (vocabulary), tata bahasa (grammar), reading, writing, listening, dan speaking dengan materi yang relevan, dari tingkat dasar hingga akademik (TOEFL/IELTS).

## Fitur Utama
- **Modul Pembelajaran Lengkap:** Mencakup Grammar, Vocabulary, Reading, Writing, Speaking, dan Listening.
- **AI-Powered Feedback:** Terintegrasi dengan Gemini AI untuk mengevaluasi tulisan (Writing) secara otomatis dan membangkitkan cerita unik (Reading).
- **Progress Tracker & Leaderboard:** Melacak poin XP, level, dan "streak" belajar harian yang tersinkronisasi di cloud menggunakan Supabase.
- **Dark Mode & PWA:** Tampilan yang nyaman di mata dan bisa diinstal langsung ke perangkat (Progressive Web App).

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- State Management: Zustand
- Backend & Auth: Supabase
- AI Engine: Google Gemini 3.0 Flash

## Cara Menjalankan Project (Local)
1. Pastikan Node.js sudah terinstal.
2. Clone repository ini.
3. Buka terminal dan jalankan `npm install`
4. Copy example environment file dengan menjalankan `cp .env.example .env` di terminal
5. Masukkan API keys yang dibutuhkan (Supabase dan OpenRouter).
6. Jalankan database lokal dengan cara `npx json-server --watch db.json --port 5000`di terminal
7. Jalankan `npm run dev`

---
*Dibuat oleh Information Technology Batch 2026 - President University*
