"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaArrowUp,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
// Share URL
const shareUrl = "https://example.com/your-test-result";
const Analysis = () => {
  const { id } = useParams();

  const [analysisData, setAnalysisData] = useState(null);
  const [subData, setSubData] = useState({});
  const [loading, setLoading] = useState(true);
  const [subjectWiseData, setSubjectWirseData] = useState([]);
  // console.log("object", id);
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("data"));
        const studentId = studentData?.id;

        if (!studentId) {
          throw new Error("student ID not found in localStorage");
        }

        const res = await fetch(
          `https://backend.indiasarkarinaukri.com/mock-test/test/result/get?id=${id}&sid=${studentId}`
        );
        if (!res.ok) {
          throw new Error(`server error: ${res.status}`);
        }
        const data = await res.json();
        const { response } = data;

        setSubData({
          rank: response[response.length - 1]?.rank,
          totalQuestions: response[response.length - 1]?.totalQuestions,
          correctAnswers: response[response.length - 1].correctAnswers,
        });

        setSubjectWirseData(data?.subjectWiseResult);
        setAnalysisData(response[response.length - 1]?.Responses);
      } catch (error) {
        console.error("Error fetching analysis:", error);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]); // Add 'id' as a dependency here

  if (loading) {
    return <p className="mt-10 text-lg font-medium text-center">Loading...</p>;
  }
  if (!analysisData) {
    return (
      <p className="mt-10 text-center text-red-600">Failed to load data.</p>
    );
  }
  console.log("subData", subData);
  // console.log("Hello", subjectWiseResult);
  // console.log("responses", Responses);
  return (
    <div className="relative z-10 w-full p-4 md:p-8">
      <h1 className="mr-40 text-3xl font-semibold text-center text-blue-900 ">
        Mock Test Analysis
      </h1>
      {/* Social Share */}
      <div className="pt-4 ml-120">
        <div className="flex flex-wrap justify-center gap-3 text-xl">
          <a
            href={`https://web.whatsapp.com/send?text=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#25D366] hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#0077B5] hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#0088cc] hover:scale-110"
          >
            <FaTelegram />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#1877F2] hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-black hover:scale-110"
          >
            <SiX />
          </a>
          <a
            href={`https://www.instagram.com/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#E1306C] hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-[#E60023] hover:scale-110"
          >
            <FaPinterest />
          </a>
        </div>
      </div>
      {/* Rank Summary */}
      <div className="bg-[#4B92FF] text-white rounded-full p-4 flex justify-between items-center w-full mr-40 max-w-3xl mx-auto my-8">
        <div className="text-lg font-medium">
          Your Rank : <span className="font-bold">{subData?.rank}</span>
        </div>
        <div className="text-sm font-medium">
          Total Questions: {subData?.totalQuestions} | Correct Answers:{" "}
          {subData?.correctAnswers}
        </div>
      </div>
      {/* Table + Chart */}
      <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead>
              <tr className="bg-[#4B92FF] text-white">
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Correct</th>
              </tr>
            </thead>
            <tbody>
              {subjectWiseData?.map((subject, index) => (
                <tr key={index}>
                  <td className="p-3 border"> {subject.subjectName}</td>
                  <td className="p-3 border">{subject.totalQuestions}</td>
                  <td className="p-3 border">{subject.correctAnswers}</td>
                </tr>
              ))}
            </tbody>
            {/* 
            {subjectWiseResult.map((subj, i) => (
                <tr key={i}>
                  <td className="p-3 border">{subj?.subjectName}</td>
                  <td className="p-3 border">{subj?.totalQuestions}</td>
                  <td className="p-3 border">{subj?.correctAnswers}</td>
                </tr>
              ))} */}

            {/* {subjectWiseData.map((subject, index) => (
              <div key={index}>
                <h3>{subject.subjectName}</h3>
                <p>Total Questions: {subject.totalQuestions}</p>
                <p>Correct Answers: {subject.correctAnswers}</p>
              </div>
            ))} */}
          </table>
        </div>
        {/* Bar Chart */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={subjectWiseData.map((s) => ({
                name: s.subjectName,
                percentage: Math.round(
                  (s.correctAnswers / s.totalQuestions) * 100
                ),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#2c3e50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <h2 className="mt-8 ml-2 text-2xl font-bold text-black">Answers:</h2>
      {analysisData?.map((item, idx) => {
        const question = item.Question;
        if (!question || !question.options || !question.correctAnswer)
          return null;
        // if (!question) return null;
        const options = JSON.parse(question.options);
        const correctIndex = question.correctAnswer?.charCodeAt(0) - 97;
        console.log({ correctIndex });
        const selectedIndex = item.isCorrect;
        return (
          <div
            key={idx}
            className="max-w-3xl mx-auto mt-5 border rounded-md shadow-md"
          >
            <div className="p-4 bg-blue-200 border-b">
              <p className="text-sm font-medium text-gray-600">
                Question {idx + 1}
              </p>
            </div>
            <div className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {question.questionText}
              </h2>
              <div className="space-y-3">
                {options.map((opt, i) => {
                  // const isCorrect = i === correctIndex;
                  // const isSelected = i === selectedIndex;
                  // const isWrong = isSelected && !isCorrect;
                  return (
                    <div
                      key={i}
                      className={`flex items-center border rounded-md p-3
                        ${
                          correctIndex == i
                            ? selectedIndex
                              ? "bg-green-100 border-green-500"
                              : "bg-red-100 border-red-500"
                            : ""
                        }
                `}
                    >
                      <span className="mr-3 font-semibold text-blue-500">
                        {String.fromCharCode(97 + i)}.
                      </span>
                      <p className="text-gray-700">{opt}</p>
                    </div>
                  );
                })}
                <span className="text-blue-500 bg-green-200 border-green-300 border-1">
                  Correct Answer: {question.correctAnswer}
                </span>

                <div className="flex p-3 rounded-md">
                  <span className="mr-2 font-semibold text-blue-500">
                    Explanation:
                  </span>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* Scroll To Top */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-[#4B92FF] text-white p-3 rounded-full shadow-md"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};
export default Analysis;
