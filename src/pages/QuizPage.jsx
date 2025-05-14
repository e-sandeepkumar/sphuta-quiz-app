// QuizPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';

export default function QuizPage({ user, setUser, setScoreData, examDetails }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [timer, setTimer] = useState(600);
  const navigate = useNavigate();

  const sessionKey = `selectedAnswers-${examDetails.level}-${examDetails.technology}-${examDetails.topic}`;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('https://sphuta-quiz-app.vercel.app/api/questions', {
          params: {
            level: examDetails.level,
            technology: examDetails.technology,
            topic: examDetails.topic
          }
        });
        setQuestions(res.data);
        setCurrent(0);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, [examDetails]);

  useEffect(() => {
    const saved = localStorage.getItem(sessionKey);
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, [sessionKey]);

  useEffect(() => {
    localStorage.setItem(sessionKey, JSON.stringify(selected));
  }, [selected, sessionKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questions]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionSelect = (option) => {
    const question = questions[current];
    setSelected((prevSelected) => {
      const prev = Array.isArray(prevSelected[current]) ? prevSelected[current] : [];
      const updated = question.multiSelect
        ? prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
        : option;
      return { ...prevSelected, [current]: updated };
    });
  };

  const handleSubmit = async () => {
    let count = 0;
    questions.forEach((q, i) => {
      const userAnswer = selected[i];

      if (q.multiSelect) {
        const correctSet = new Set(q.answer);
        const selectedSet = new Set(userAnswer || []);
        const isCorrect =
          correctSet.size === selectedSet.size &&
          [...correctSet].every((val) => selectedSet.has(val));
        if (isCorrect) count++;
      } else {
        if (userAnswer === q.answer) count++;
      }
    });

    try {
      await axios.post('https://sheetdb.io/api/v1/yivpapugo4glr', {
        data: {
          Username: user,
          Score: count,
          Total: questions.length,
          Timestamp: new Date().toISOString(),
          Level: examDetails.level,
          Technology: examDetails.technology,
          Topic: examDetails.topic,
          AttemptID: `${user}-${examDetails.level}-${examDetails.technology}-${examDetails.topic}-${Date.now()}`
        }
      });
    } catch (err) {
      console.error("❌ Submission failed:", err);
    }

    setScoreData({ score: count, total: questions.length });
    localStorage.removeItem(sessionKey);
    navigate('/result');
  };

  if (questions.length === 0) {
    return <div className="text-center mt-20 text-lg">Loading questions...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Question {current + 1} of {questions.length}</h2>
          <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
            Time Left: {formatTime(timer)}
          </div>
        </div>
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <QuestionCard
        questionData={questions[current]}
        selected={selected[current] || (questions[current].multiSelect ? [] : '')}
        onSelect={(updated) =>
          setSelected((prev) => ({ ...prev, [current]: updated }))
        }
        visibleOptions={questions[current]?.options}
      />

      <div className="mt-6 w-full flex justify-between items-center gap-2">
        <button
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
          disabled={current === 0}
          className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrent((prev) => Math.min(questions.length - 1, prev + 1))}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
