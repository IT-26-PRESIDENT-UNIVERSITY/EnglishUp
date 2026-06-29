import { useState } from "react";
import { supabase } from "../utils/supabase";

const MAJORS = [
  "Accounting",
  "Business Administration",
  "Management",
  "Actuarial Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Industrial Engineering",
  "Environmental Engineering",
  "Civil Engineering",
  "Medicine",
  "Law",
  "International Relations",
  "Communication",
  "Interior Design",
  "Architecture",
  "Visual Communication Design",
  "Elementary Teacher Education",
  "Informatics",
  "Information System",
  "Agribusiness"
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState(MAJORS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              major: major
            }
          }
        });
        if (error) throw error;
        // Automatically login if email confirmation is off, else show message
        alert("Registration successful! You are now logged in.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 w-full max-w-[450px] shadow-xl border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/a/ae/President_University_Logo.png" 
            alt="President University Logo" 
            className="w-24 h-auto object-contain mb-4"
          />
          <h1 className="text-[2rem] font-black text-gray-900 dark:text-white m-0">EnglishUp</h1>
        </div>

        <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-xl mb-8">
          <button 
            className={`flex-1 py-2.5 rounded-lg text-[0.95rem] font-bold transition-all ${isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            onClick={() => { setIsLogin(true); setError(null); }}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-lg text-[0.95rem] font-bold transition-all ${!isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            onClick={() => { setIsLogin(false); setError(null); }}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-[0.85rem] font-bold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-rose-500 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-[0.85rem] font-bold text-gray-700 dark:text-gray-300 mb-1.5">Major</label>
                <select 
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-rose-500 text-gray-900 dark:text-gray-100 transition-colors cursor-pointer"
                >
                  {MAJORS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-[0.85rem] font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-rose-500 text-gray-900 dark:text-gray-100 transition-colors"
              placeholder="student@president.ac.id"
            />
          </div>

          <div>
            <label className="block text-[0.85rem] font-bold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-rose-500 text-gray-900 dark:text-gray-100 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-[1rem] shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
