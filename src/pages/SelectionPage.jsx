// SelectionPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SelectionPage({ user, setExamDetails }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [topics, setTopics] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    axios.get('https://sphuta-quiz-app.vercel.app/api/questions')
      .then((res) => {
        const allQuestions = res.data;
        setQuestions(allQuestions);

        const levelSet = new Set(allQuestions.map(q => q.level));
        const techSet = new Set(allQuestions.map(q => q.technology));

        setLevels([...levelSet]);
        setTechnologies([...techSet]);
      })
      .catch((err) => console.error('Error loading question data:', err));
  }, []);

  useEffect(() => {
    if (selectedTech) {
      const filtered = questions.filter(q => q.technology === selectedTech);
      const topicSet = new Set(filtered.map(q => q.topic));
      setTopics([...topicSet]);
    }
  }, [selectedTech, questions]);

  const handleStart = () => {
    if (selectedLevel && selectedTech && selectedTopic) {
      setExamDetails({ level: selectedLevel, technology: selectedTech, topic: selectedTopic });
      navigate('/quiz');
    } else {
      alert('Please select all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">Welcome, <span className="capitalize">{user}</span></h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Exam Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Level</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Technology</label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Technology</option>
              {technologies.map((tech, index) => (
                <option key={index} value={tech}>{tech}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStart}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-md transition shadow"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}