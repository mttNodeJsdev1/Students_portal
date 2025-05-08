"use client";
import { useEffect, useState } from "react";

export default function TypingResult() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("typingResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result) {
    return <div className="text-center mt-10">No result found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 relative z-10">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Typing Test Results
      </h2>

      {/* Summary Stats */}
      <ul className="text-left space-y-2 flex flex-col-1 gap-9  text-gray-800 mb-6">
        <li>
          <strong className=" font-bold ">WPM:</strong> {result.wpm}
        </li>
        <li>
          <strong className=" font-bold ">Keystrokes:</strong>{" "}
          {result.keystrokes}
        </li>
        <li>
          <strong className=" font-bold ">Accuracy:</strong> {result.accuracy}%
        </li>
        <li>
          <strong className=" font-bold ">Correct Words:</strong>{" "}
          {result.correctWords}
        </li>
        <li>
          <strong className=" font-bold ">Wrong Words:</strong>{" "}
          {result.wrongWords}
        </li>
        <li>
          <strong className=" font-bold ">Time Taken:</strong>{" "}
          {result.timeTaken} sec
        </li>
      </ul>
      {result.passage && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Passage:</h3>
          <p className="bg-gray-100 p-4 rounded text-gray-700 leading-relaxed whitespace-pre-wrap">
            {result.passage}
          </p>
        </div>
      )}
      {/* Word-by-Word Analysis */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Analysis:</h3>
        <div className="flex flex-wrap gap-1 bg-gray-50 p-4 rounded border border-gray-200">
          {result.wordAnalysis?.map((item, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-sm ${
                item.isCorrect
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
              title={`Expected: ${item.expected}, Typed: ${item.typed}`}
            >
              {item.typed || "Untyped"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
