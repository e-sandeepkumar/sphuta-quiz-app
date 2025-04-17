import { useEffect, useState } from 'react';

export default function QuestionCard({ questionData, selected, onSelect, visibleOptions }) {
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
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleOptions.map((opt, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              {/* Radio button */}
              <td className="w-6 px-4 py-2 border-b border-gray-200 dark:border-gray-600 align-middle">
                <input
                  type="radio"
                  name={`question-${questionData.id}`}
                  value={opt}
                  checked={selected === opt}
                  onChange={() => onSelect(opt)}
                  className="form-radio text-blue-600 h-4 w-4"
                />
              </td>

              {/* Option text */}
              <td className="px-2 py-2 border-b border-gray-200 dark:border-gray-600 align-middle text-left whitespace-nowrap">
                <label className="cursor-pointer text-sm" htmlFor={`opt-${index}`}>
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







