"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import Image from "next/image";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    fetch("https://backend.indiasarkarinaukri.com/notes/modified")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err));

    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative z-10 p-4">
      <h1 className="mb-6 text-2xl font-bold text-center">Notes</h1>

      <div className="flex max-w-md mx-auto mb-6">
        <IoSearchOutline className="mt-3 -mr-8 text-xl" />
        <input
          type="text"
          placeholder="Search Notes..."
          className="w-full px-4 py-2 pl-10 border border-blue-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            const shareUrl = `${baseUrl}/dashboard/student-dashboard/study-material/notes/${note.slug}`;
            return (
              <div
                key={note.id}
                className="flex flex-col justify-between p-3 transition border rounded-lg shadow cursor-pointer hover:shadow-md"
              >
                <Link
                  target="_blank"
                  href={`/dashboard/student-dashboard/study-material/notes/${note.slug}`}
                >
                  <img
                    src={note.og_image || "/default-note.jpg"}
                    alt={note.title}
                    className="object-cover w-full h-24 mb-2 rounded"
                  />
                  <h2 className="mb-2 text-sm font-medium text-center line-clamp-2">
                    {note.title}
                  </h2>
                </Link>

                {/* 📤 Share Popup */}
                <div className="flex justify-center mt-3">
                  <div className="relative group">
                    <button className="text-xl text-gray-700 hover:text-blue-600">
                      <IoMdShare />
                    </button>

                    <div className="absolute z-50 invisible p-2 mb-2 transition-all duration-300 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 bottom-full left-1/2 group-hover:opacity-100 group-hover:visible w-max">
                      <div className="flex gap-2 text-xl">
                        <a
                          href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:scale-110"
                        >
                          <FaWhatsapp />
                        </a>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B5] hover:scale-110"
                        >
                          <FaLinkedin />
                        </a>
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0088cc] hover:scale-110"
                        >
                          <FaTelegram />
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1877F2] hover:scale-110"
                        >
                          <FaFacebook />
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:scale-110"
                        >
                          <SiX />
                        </a>
                        <a
                          href={`https://www.instagram.com/?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E1306C] hover:scale-110"
                        >
                          <FaInstagram />
                        </a>
                        <a
                          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E60023] hover:scale-110"
                        >
                          <FaPinterest />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No notes found for <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
