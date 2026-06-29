import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Listening from "./pages/Listening";
import Speaking from "./pages/Speaking";
import Quiz from "./pages/Quiz";
import StudyPlan from "./pages/StudyPlan";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import { useStore } from "./store/useStore";
import { supabase } from "./utils/supabase";

export default function App() {
  const { theme, user, setUser } = useStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.progress) {
        useStore.setState({ progress: session.user.user_metadata.progress });
      } else {
        useStore.getState().resetProgress();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.progress) {
        useStore.setState({ progress: session.user.user_metadata.progress });
      } else {
        useStore.getState().resetProgress();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!user) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/plan" element={<StudyPlan />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </BrowserRouter>
  );
}
