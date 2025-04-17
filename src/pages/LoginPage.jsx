import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      setUser(username);
      navigate('/quiz');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded">
          Start Quiz
        </button>
      </div>
    </div>
  );
}
