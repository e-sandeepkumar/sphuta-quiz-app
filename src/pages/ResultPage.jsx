// src/pages/ResultPage.jsx
import { useNavigate } from 'react-router-dom';

export default function ResultPage({ scoreData, setUser }) {
  const { score, total } = scoreData;
  const percentage = (score / total) * 100;
  const isPass = percentage >= 70;
  const navigate = useNavigate();

  const handleClose = () => {
    setUser('');
    navigate('/');
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-700 text-center rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isPass ? '🎉 Congratulations!' : '❌ Try Again'}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          You scored {score} out of {total} ({percentage.toFixed(0)}%)
        </p>
        <p className={`mb-6 font-semibold ${isPass ? 'text-green-600' : 'text-red-600'}`}>
          {isPass ? 'You passed!' : 'You failed the quiz.'}
        </p>
        <button
          onClick={handleClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
