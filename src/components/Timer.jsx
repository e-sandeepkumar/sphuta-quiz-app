// src/components/Timer.jsx
import { useEffect, useState } from 'react';

export default function Timer({ onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="text-right text-sm text-red-600 mb-2">
      Time left: {timeLeft}s
    </div>
  );
}
