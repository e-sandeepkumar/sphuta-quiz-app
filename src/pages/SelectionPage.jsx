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
      setExamDetails({
        level: selectedLevel,
        technology: selectedTech,
        topic: selectedTopic
      });
      navigate('/quiz');
    } else {
      alert('Please select all fields.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Welcome, {user}</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Exam Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Level</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Technology</label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Technology</option>
              {technologies.map((tech, index) => (
                <option key={index} value={tech}>{tech}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStart}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}