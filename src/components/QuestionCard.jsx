// QuestionCard.jsx
import { useEffect, useState } from 'react';

export default function QuestionCard({ questionData, selected, onSelect, visibleOptions }) {
  const isMulti = questionData.multiSelect;

  const handleChange = (option) => {
    if (isMulti) {
      const current = Array.isArray(selected) ? selected : [];
      if (current.includes(option)) {
        onSelect(current.filter((item) => item !== option));
      } else {
        onSelect([...current, option]);
      }
    } else {
      onSelect(option);
    }
console.log('Selected:', selected);
console.log('Option clicked:', option);
  };

  return (
    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 rounded shadow w-full">
      <table className="w-full table-fixed border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th
              colSpan={2}
              className="text-left px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-base"
            >
              {questionData.question}
              <span className="ml-2 text-sm italic text-gray-500 dark:text-gray-400">
                {isMulti ? '(Select all that apply)' : '(Select one)'}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleOptions.map((opt, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-6 px-4 py-2 border-b border-gray-200 dark:border-gray-600 align-middle">
                <input
                  type={isMulti ? 'checkbox' : 'radio'}
                  name={`question-${questionData.id}`}
                  value={opt}
                  checked={
                    isMulti
                      ? Array.isArray(selected) && selected.includes(opt)
                      : selected === opt
                  }
                  onChange={() => handleChange(opt)}
                  className="form-checkbox text-blue-600 h-4 w-4"
                />
              </td>
              <td className="px-2 py-2 border-b border-gray-200 dark:border-gray-600 align-middle text-left whitespace-nowrap">
                <label className="cursor-pointer text-sm">
                  {opt}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
