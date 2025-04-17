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
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-all">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-yellow-400 dark:bg-blue-900 text-white px-3 py-1 rounded"
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
