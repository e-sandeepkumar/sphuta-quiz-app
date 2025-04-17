// src/components/ResultModal.jsx
import { useEffect } from 'react';

export default function ResultModal({ score, total, setUser }) {
  const percentage = (score / total) * 100;
  const isPass = percentage >= 70;

  const handleClose = () => {
    setUser('');
  };

  useEffect(() => {
    // Prevent scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {isPass ? '🎉 You Passed!' : '❌ You Failed'}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          Score: {score} / {total} ({percentage.toFixed(0)}%)
        </p>
        <p className={`mb-6 font-medium ${isPass ? 'text-green-600' : 'text-red-600'}`}>
          {isPass ? 'Well done! You cleared the quiz.' : 'Try again next time.'}
        </p>
        <button
          onClick={handleClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
