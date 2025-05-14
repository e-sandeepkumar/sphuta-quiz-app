// App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import NamePopup from './components/NamePopup';
import ResultPage from './pages/ResultPage';
import SelectionPage from './pages/SelectionPage';
import './App.css'; // Import your CSS file
import './index.css'; // Import your global styles

export default function App() {
  const [user, setUser] = useState('');
  const [scoreData, setScoreData] = useState({ score: 0, total: 0 });
  const [examDetails, setExamDetails] = useState({ level: '', technology: '', topic: '' });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <Routes>
          <Route path="/" element={!user ? <NamePopup setUser={setUser} /> : <Navigate to="/select" />} />
          <Route
            path="/select"
            element={<SelectionPage user={user} setExamDetails={setExamDetails} />}
          />
          <Route
            path="/quiz"
            element={<QuizPage user={user} examDetails={examDetails} setUser={setUser} setScoreData={setScoreData} />}
          />
          <Route
            path="/result"
            element={<ResultPage scoreData={scoreData} setUser={setUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
