"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Timelapse } from "@mui/icons-material";
const StartTest = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const startAt = useRef();
  const [reviewed, setReviewed] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(
          `https://backend.indiasarkarinaukri.com/mock-test/test/${id}`
        );
        const responseData = res.data;
        if (responseData?.data?.length > 0) {
          const test = responseData.data[0];
          console.log(test);
          setTestData(test);
          setTimeLeft(test.duration * 60);
        } else {
        }
      } catch (error) {}
    };
    fetchTest();
  }, [id]);

  const questions = testData?.Papers.map((question) => question?.Question);
  const subjects = testData?.Papers.reduce((acc, curr) => {
    acc[`${curr?.question_id}`] = curr?.Subject?.subjectName;
    return acc;
  }, {});
  const options = questions?.map((question) => JSON.parse(question?.options));
  const optionIndex = questions?.options?.map((_, i) =>
    String.fromCharCode(97 + i)
  );
  const handleSubmitTest = async () => {
    const studentData = JSON.parse(localStorage.getItem("data"));
    const payload = {
      student_id: studentData?.id,
      test_id: testData?.Papers?.[0]?.test_id,
      startedAt: startAt.current,
      endedAt: new Date().toISOString(),
      status: "submitted",
      totalQuestions: questions?.length,
      attemptedQuestions: questions?.filter(
        (q) => q.selectedOption || q.answerText
      ).length,
      responses: questions?.map((q) => {
        return {
          question_id: q.id,
          questionType: q.type,
          subjectName: subjects[q.id],
          answerText: answers[q.id]?.answerText,
          selectedOption: answers[q.id]
            ? String.fromCharCode(97 + answers[q.id]?.selectedOption)
            : null,
          isCorrect: answers[q.id]
            ? String.fromCharCode(97 + answers[q.id]?.selectedOption) ===
              q.correctAnswer
            : null,
          questionMarks: q.marks,
        };
      }),
    };
    try {
      const res = await fetch(
        "https://backend.indiasarkarinaukri.com/mock-test/user-attempt/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Failed to submit test");
      const data = await res.json();
      console.log("Test submitted successfully:", data);
      localStorage.setItem("submittedTest", JSON.stringify(payload));
      alert("Test submitted successfully!");
      router.push("/online-test");
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Stop the timer
          handleSubmitTest(); // Submit the test
          return 0; // Make sure time stops at 0
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer); // Cleanup when unmount
  }, []);
  //timer
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return {
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  //option select
  const handleOptionSelect = (qId, optionIndex, question) => {
    console.log("qid", qId);
    console.log("optionIndex", optionIndex);
    console.log("question", question?.options);
    if (!question || !question.options) {
      console.log("object");
      console.error("Invalid question or missing options:", question);
      return;
    }
    let options = [];
    try {
      options = JSON.parse(question.options);
    } catch (e) {
      console.error("Failed to parse options:", e);
      return;
    }
    const selectedOptionText = options[optionIndex];
    const updatedAnswers = {
      ...answers,
      [qId]: {
        selectedOption: optionIndex,
        answerText: selectedOptionText,
      },
    };
    console.log(updatedAnswers);

    setAnswers(updatedAnswers);
    setSkipped((prev) => {
      const updated = new Set(prev);
      updated.delete(qId);
      return updated;
    });
    console.log(skipped, "ssssssssssssssssssssssssssss");

    // const nextQuestion = getNextQuestion(qId);
  };

  // Helper functions for next/prev question navigation (Example)
  const getNextQuestion = (currentQId) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQId);
    return currentIndex + 1 || null;
  };
  const navigateToQuestion = (nextQuestion) => {
    // Update state or route to the next question
    setCurrentQuestion(nextQuestion);
  };
  const handleExitTest = () => {
    setShowExitConfirmation(true);
  };
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    // handleSubmitTest();
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleNav = (index) => setCurrentQuestion(index);
  const handleClear = (qId) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[qId];
      return newAnswers;
    });
    setSkipped((prev) => {
      const newSet = new Set(prev);
      newSet.delete(qId);
      return newSet;
    });
  };
  const handleSkip = (qId) => {
    if (answers[qId] === undefined) {
      setSkipped((prev) => new Set(prev).add(qId));
    }
    setCurrentQuestion((prev) =>
      Math.min(prev + 1, testData.Papers.length - 1)
    );
  };
  const getQuestionStatus = (qId) => {
    if (answers[qId] !== undefined) return "Attempted";
    if (skipped.has(qId)) return "Skipped";
    return "Unattempted";
  };
  function StartTestHandler() {
    alert("Test Started");
    setShowInstructions(false);
    const now = new Date();
    startAt.current = now.toISOString();
  }
  const calculateStatusCounts = () => {
    const counts = { attempted: 0, skipped: 0, unattempted: 0 };
    testData?.Papers.forEach((p) => {
      const qId = p.Question.id;
      const status = getQuestionStatus(qId);
      if (status) counts[status.toLowerCase()]++;
    });
    return counts;
  };
  if (!testData) return <div>Loading...</div>;
  const question = questions[currentQuestion];
  const statusCounts = calculateStatusCounts();
  return (
    <div className="relative z-10 flex w-full h-full font-sans text-sm ">
      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h3 className="mb-4 text-xl font-semibold">Exit Test</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to exit the test?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowExitConfirmation(false);
                }}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await handleSubmitTest(); //First safely submit test
                    setShowExitConfirmation(false);
                    setTimeout(() => {
                      window.close(); //  Close window after slight delay
                    }, 500); // Small delay to ensure submission completes
                  } catch (error) {
                    console.error("Failed to submit test: ", error);
                  }
                }}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-[900px] h-[500px] shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {testData.title} - Instructions
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                Duration: <strong>{testData.duration} minutes</strong>
              </li>
              <li>
                Negative Marking: <strong>{testData.negativeMarks}</strong>
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-1 bg-green-500 rounded-full"></span>{" "}
                Attempted
              </li>
              <li>
                <span className="inline-block w-4 h-4 mr-1 bg-red-500 rounded-full"></span>{" "}
                Unattempted
              </li>
            </ul>
            <div className="text-right">
              <button
                onClick={() => StartTestHandler()}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                I Agree, Start Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Content */}
      <div className="w-full ">
        <div className="bg-sky-400 text-center  ml-0 w-full h-[70px]">
          <h2 className="pt-6 text-xl font-semibold text-white ">
            {testData.title}
          </h2>
        </div>
        <div className="p-4 mt-5 ml-5 mr-5 shadow border-1">
          <div className="flex justify-between rounded-sm border-1 w-full h-[40px] items-center">
            {/* Left Side */}
            <span className="ml-10">
              <span className="font-bold">
                {testData?.Papers?.[currentQuestion]?.Subject?.subjectName ||
                  "N/A"}{" "}
              </span>
              : Question: {currentQuestion + 1} of{" "}
              {testData?.totalQuestions || 0}
            </span>
            {/* Right Side */}
            <div className="flex gap-4">
              <span className="font-bold text-green-600">
                Maximum Marks: {question?.marks}
              </span>
              <span className="mr-5 font-bold text-red-600">
                Negative Marks: {testData?.negativeMarks}
              </span>
            </div>
          </div>

          <h3 className="mt-5 mb-2 font-medium">
            Q{currentQuestion + 1}: {question?.questionText}
          </h3>
          {question?.imgUrl && (
            <Image
              src={question.imgUrl}
              alt="Question"
              className="w-64 h-auto mb-4"
            />
          )}
          <div className="mt-4 space-y-2">
            {question &&
              JSON.parse(question?.options).map((option, index) => {
                const selectedIndex = answers[question.id]?.selectedOption;

                const optionLetter = String.fromCharCode(97 + index);
                return (
                  <label
                    key={index}
                    className={`block p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                      selectedIndex === index
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      className="mr-3"
                      checked={selectedIndex === index}
                      onChange={() =>
                        handleOptionSelect(question.id, index, question)
                      }
                    />
                    <span>
                      {optionLetter}) {option}
                    </span>
                  </label>
                );
              })}
          </div>
        </div>
        <div className="flex gap-4 mt-6 ml-10">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 text-white rounded cursor-pointer bg-sky-500"
          >
            Prev
          </button>
          <button
            onClick={() => handleClear(question.id)}
            className="px-4 py-2 text-white bg-red-500 rounded cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => handleSkip(question.id)}
            className="px-4 py-2 text-black bg-gray-300 rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className=" w-[500px] border-1 border-blue-400 h-fit  ">
        <div className="mb-4">
          <div className="bg-sky-400 text-center ml-0 w-full h-[70px]">
            {" "}
            <h3 className="pt-6 text-lg font-semibold text-white">Time Left</h3>
          </div>
          <div className="text-sm font-bold text-center text-black">
            <div className="flex items-center justify-center space-x-4 text-gray-700">
              <div className="text-center">
                <div className="text-lg font-semibold ">{hours}</div>
                <div className="text-sm ">Hours</div>
              </div>
              <div className="text-lg font-semibold">:</div>
              <div className="text-center">
                <div className="text-lg font-semibold">{minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="text-lg font-semibold">:</div>
              <div className="text-center">
                <div className="text-lg font-semibold">{seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16 ">
          <div className="bg-sky-400 text-center      mt-5 ml-0 w-full h-[50px]">
            <h4 className="pt-3 mb-2 text-lg font-medium text-white">
              Question
            </h4>{" "}
          </div>
          <div className="grid grid-cols-9 gap-2 mt-3 mb-4 ml-2 text-xs text-center  ">
            {questions.map((q, i) => {
              const status = getQuestionStatus(q.id);
              const bgColor =
                status === "Attempted"
                  ? "bg-green-500"
                  : status === "Skipped"
                  ? "bg-red-500"
                  : "bg-sky-100";
              return (
                <button
                  key={i}
                  onClick={() => handleNav(i)}
                  className={` text-xs w-6 h-6 cursor-pointer hover:bg-gray-300  rounded-full border ${bgColor}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="space-y-1 text-xs border-t mt-30">
            <div className="flex gap-6 mt-5 ml-8">
              <div>
                <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                Attempted ({statusCounts.attempted})
              </div>

              <div>
                <span className="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
                Unattempted ({statusCounts.skipped})
              </div>
            </div>
            {/* Other right panel content */}
            <button
              onClick={handleSubmitTest}
              className={`w-[100px] text-center ml-30 mt-10 bg-blue-800 text-white py-2 rounded cursor-pointer   `}
            >
              {/*   ${
                timeLeft > 0 && "pointer-events-none bg-gray-300"
              } */}
              Submit test
            </button>
            <div>
              <br />
              <br />
            </div>
            {/* <SubmitTestButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTest;
