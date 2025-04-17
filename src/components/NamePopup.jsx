// src/components/NamePopup.jsx
import { useState } from 'react';

export default function NamePopup({ setUser }) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (username.trim()) setUser(username);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-700 w-80 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enter Your Name</h2>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
