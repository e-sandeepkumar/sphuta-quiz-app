// src/pages/SelectionPage.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const topicsMap = {
  Java: ['Java String', 'Java Exception'],
  SQL: ['SQL Joins', 'SQL Queries'],
  'No SQL': ['MongoDB Aggregation', 'Cassandra Basics']
};

export default function SelectionPage({ user, setExamDetails }) {
  const [level, setLevel] = useState('');
  const [technology, setTechnology] = useState('');
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    setExamDetails({ level, technology, topic });
    navigate('/quiz');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col justify-center min-h-screen text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome, {user}</h2>

      <label className="mb-2 font-medium">Select Exam Level</label>
      <select value={level} onChange={(e) => setLevel(e.target.value)} className="mb-4 p-2 border rounded w-full">
        <option value="">-- Choose Level --</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Expert</option>
      </select>

      <label className="mb-2 font-medium">Select Technology</label>
      <select
        value={technology}
        onChange={(e) => {
          setTechnology(e.target.value);
          setTopic('');
        }}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">-- Choose Technology --</option>
        <option>Java</option>
        <option>SQL</option>
        <option>No SQL</option>
      </select>

      <label className="mb-2 font-medium">Select Topic</label>
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
        disabled={!technology}
      >
        <option value="">-- Choose Topic --</option>
        {topicsMap[technology]?.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <button
        onClick={handleContinue}
        disabled={!level || !technology || !topic}
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 w-full"
      >
        Continue to Quiz
      </button>
    </div>
  );
}
