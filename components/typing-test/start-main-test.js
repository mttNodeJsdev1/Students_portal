"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { passages } from "./Mockdata";
import { MdOutlineTimer } from "react-icons/md";
import Header from "./Header";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

export default function StartTypingTest() {
  const searchParams = useSearchParams();
  const [passage, setPassage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const inputRef = useRef(null);

  // Calculate results
  const calculateResults = useCallback(() => {
    const passageWords = passage.split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);

    const correctWords = typedWords.filter((word, i) => {
      return i < passageWords.length && word === passageWords[i];
    }).length;
    const wrongWords = typedWords.length - correctWords;

    let correctChars = 0;
    typedWords.forEach((word, i) => {
      if (i < passageWords.length && word === passageWords[i]) {
        correctChars += word.length;
      }
    });

    const totalChars = passage.length;
    const wrongChars = typedText.length - correctChars;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    const timeInMinutes = (searchParams.get("time") - timeLeft) / 60;
    const wpm = Math.round(correctWords / Math.max(timeInMinutes, 0.1));

    const wordAnalysis = passageWords.map((word, i) => ({
      expected: word,
      typed: typedWords[i] || "",
      isCorrect: word === typedWords[i],
    }));

    const resultData = {
      wpm,
      keystrokes: typedText.length,
      accuracy,
      correctChars,
      wrongChars,
      correctWords,
      wrongWords,
      timeTaken: searchParams.get("time") - timeLeft,
      passage,
      wordAnalysis,
    };
    setResults(resultData);
    localStorage.setItem("typingResult", JSON.stringify(resultData));
  }, [typedText, passage, timeLeft, searchParams]);

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    calculateResults();
  }, [isSubmitted, calculateResults]);
  // Initialize test
  useEffect(() => {
    const language = searchParams.get("language");
    const passageId = searchParams.get("passageId");
    const time = parseInt(searchParams.get("time"));
    if (!language || !passageId || isNaN(time)) return;
    const foundPassage = passages[language]?.find(
      (p) => p.id === parseInt(passageId)
    );
    setPassage(foundPassage?.text || "");
    setTimeLeft(time);
    setCurrentWordIndex(0);
    setTypedText("");
  }, [searchParams]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && passage) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, handleSubmit, passage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTyping = (e) => {
    if (isSubmitted) return;
    const value = e.target.value;
    // Split the typed text into words
    const words = typedText.split(/\s+/);

    // Update the current word
    words[currentWordIndex] = value;

    // Join back with spaces
    setTypedText(words.join(" "));
  };

  const handleKeyDown = (e) => {
    if (isSubmitted) return;

    const passageWords = passage.split(/\s+/);
    const typedWords = typedText.split(/\s+/);
    const currentTypedWord = typedWords[currentWordIndex] || "";

    // Handle space to move to next word
    if (e.key === " " && currentTypedWord.length > 0) {
      e.preventDefault();
      if (currentWordIndex < passageWords.length - 1) {
        setCurrentWordIndex((prev) => prev + 1);
        // Focus on the input for the next word
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      return;
    }

    // Handle backspace to move to previous word if at start of current word
    if (e.key === "Backspace") {
      const cursorPosition = e.target.selectionStart;
      const textBeforeCursor = typedText.substring(0, cursorPosition);
      const currentWordStart =
        typedText.lastIndexOf(" ", cursorPosition - 1) + 1;

      if (cursorPosition === 0 && currentWordIndex > 0) {
        e.preventDefault();
        setCurrentWordIndex((prev) => prev - 1);
        setTimeout(() => {
          inputRef.current?.focus();
          // Move cursor to end of previous word
          const prevWord = typedWords[currentWordIndex - 1] || "";
          inputRef.current.setSelectionRange(prevWord.length, prevWord.length);
        }, 0);
      }
    }
  };

  // Render passage with word-based highlighting
  const renderPassage = () => {
    const passageWords = passage.split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);

    return passageWords.map((word, wordIndex) => {
      const isTyped = wordIndex < typedWords.length;
      const isCorrect = isTyped && typedWords[wordIndex] === word;
      const isIncorrect = isTyped && typedWords[wordIndex] !== word;
      const isCurrentWord = wordIndex === currentWordIndex;

      return (
        <span
          key={wordIndex}
          className={`${isCurrentWord ? "bg-yellow-200" : ""}`}
        >
          {word + " "}
        </span>
      );
    });
  };
  const router = useRouter();

  const handleGetResult = () => {
    router.push("/test-typing");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container flex p-4 mx-auto md:p-6">
        {!isSubmitted ? (
          <div className="flex w-full gap-10">
            {/* Left Side - Passage Display */}
            <div className="flex-col w-2/3 gap-6">
              <div className="w-[800px] border border-gray-300 p-6  h-[400px] rounded text-lg font-mono whitespace-pre-wrap leading-relaxed overflow-y-auto">
                {renderPassage()}
              </div>
              <div className="w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full h-12 p-4 font-mono text-lg border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type current word..."
                  value={typedText.split(/\s+/)[currentWordIndex] || ""}
                  onChange={handleTyping}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoFocus
                />
              </div>
            </div>

            {/* Right Side - Input, Timer + Submit */}
            <div className="flex flex-col w-1/3 gap-6 ml-30">
              <div className="w-[180px] h-[100px] border border-sky-300 rounded shadow-lg p-4 flex flex-col items-center justify-center ">
                <MdOutlineTimer className="h-15 w-15 text-[#172F5F]" />
                <p className="text-lg font-bold text-[#172F5F]">
                  {formatTime(timeLeft)}
                </p>
              </div>
              <button
                className="bg-[#172F5F] w-[150px] ml-3 text-white py-3 px-6 rounded cursor-pointer hover:bg-blue-700 transition font-medium"
                onClick={handleSubmit}
              >
                Submit Test
              </button>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="w-full text-center py-10">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Test Completed Successfully!
              </h2>
              <p className="text-gray-700 mb-4">
                Your typing test results have been recorded.
              </p>
              <button
                onClick={handleGetResult}
                className=" cursor-pointer border-2 p-2 rounded-xl border-sky-400 bg-sky-400 font-bold "
              >
                Check Score
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
