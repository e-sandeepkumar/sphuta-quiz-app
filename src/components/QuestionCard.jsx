import { useEffect, useState } from 'react';

// src/components/QuestionCard.jsx
export default function QuestionCard({ questionData, selected, onSelect, visibleOptions }) {
  return (
    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 rounded shadow w-full">
      <h3 className="text-lg font-semibold mb-4">{questionData.question}</h3>

      {/* Radio list */}
      <div className="flex flex-col gap-3 w-full">
        {visibleOptions.map((opt, index) => (
          <label
            key={index}
            className="flex items-start gap-3 bg-gray-100 dark:bg-gray-600 px-4 py-2 rounded cursor-pointer w-full"
          >
            <input
              type="radio"
              name={`question-${questionData.id}`}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(opt)}
              className="mt-1 accent-blue-600"
            />
            <span className="text-sm break-words">{opt}</span>
          </label>
        ))}
      </div>

    </div>
  );
}




