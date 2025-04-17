// src/pages/QuizPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import allQuestions from '../data/questions.json';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

export default function QuizPage({ user, setUser, setScoreData, examDetails }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [visibleOptions, setVisibleOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allQuestions.filter(
      (q) =>
        q.level === examDetails.level &&
        q.technology === examDetails.technology &&
        q.topic === examDetails.topic
    );
    setQuestions(filtered);
    setCurrent(0);
    setSelected({});
  }, [examDetails]);

  useEffect(() => {
    setVisibleOptions([]);
    const timeouts = [];
    questions[current]?.options.forEach((opt, i) => {
      const timeout = setTimeout(() => {
        setVisibleOptions((prev) => [...prev, opt]);
      }, i * 500);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [current, questions]);

  const handleOptionSelect = (option) => {
    setSelected((prev) => ({ ...prev, [current]: option }));
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    let count = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) count++;
    });

    const resultData = {
      Username: user,
      Score: count,
      Total: questions.length,
      Timestamp: new Date().toISOString(),
      Level: examDetails.level,
      Technology: examDetails.technology,
      Topic: examDetails.topic
    };

    try {
      await axios.post('https://sheetdb.io/api/v1/yivpapugo4glr', {
        data: resultData
      });
      console.log('Submitted to SheetDB');
    } catch (err) {
      console.error('Error submitting to SheetDB:', err);
    }

    setScoreData({ score: count, total: questions.length });
    navigate('/result');
  };


  if (questions.length === 0) {
    return <div className="text-center text-lg mt-10">No questions found for your selection.</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white">
      <div className="w-full mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Question {current + 1} of {questions.length}</h2>
          <span className="font-medium">User: {user}</span>
        </div>
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mt-2 mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <Timer key={current} onTimeout={nextQuestion} />
      </div>

      <QuestionCard
        questionData={questions[current]}
        selected={selected[current]}
        onSelect={handleOptionSelect}
        visibleOptions={visibleOptions}
      />

      {visibleOptions.length === questions[current].options.length && (
        <div className="mt-4 text-right w-full">
          {current === questions.length - 1 ? (
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          ) : (
            <button onClick={nextQuestion} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
