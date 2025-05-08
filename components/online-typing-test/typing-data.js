"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaClock } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";

export default function TypingTestCards() {
  const router = useRouter();
  const [typingTests, setTypingTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchTypingTests = async () => {
      try {
        const res = await fetch(
          "https://backend.indiasarkarinaukri.com/typing-test/"
        );
        const json = await res.json();
        if (json.success) {
          setTypingTests(json.data.rows);
        } else {
          console.error("Failed to load typing tests");
        }
      } catch (error) {
        console.error("Error fetching typing tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypingTests();
  }, []);

  const handleGetResult = () => {
    router.push("/test-typing/Result");
  };

  const handleStartTyping = (id) => {
    router.push(`/typing-test/start-test?id=${id}`);
  };

  if (loading) return <p className="p-4">Loading typing tests...</p>;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {typingTests.map((test) => (
        <div
          key={test.id}
          className="border rounded-xl shadow-sm p-4 w-full max-w-sm mx-auto"
        >
          <h2 className="text-lg font-semibold text-blue-900">{test.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Difficulty: {test.difficultyLevel}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <FaClock className="text-sky-400" />
            {test.timeLimit} Min
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <LiaLanguageSolid />
            {test.language}
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={handleGetResult}
              className="bg-blue-950 text-white w-[6rem] p-2 h-[40px] rounded hover:bg-blue-900 transition cursor-pointer"
            >
              Test Result
            </button>
            <button
              onClick={() => handleStartTyping(test.id)}
              className="bg-blue-950 text-white w-[6rem] p-2 h-[40px] rounded hover:bg-blue-900 transition cursor-pointer"
            >
              Start Test
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
