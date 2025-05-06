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

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://backend.indiasarkarinaukri.com/book/modified")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative z-10 p-4">
      <h1 className="mb-6 text-2xl font-bold text-center">Books</h1>

      <div className="flex max-w-md mx-auto mb-6">
        <IoSearchOutline className="mt-3 -mr-8 text-xl" />
        <input
          type="text"
          placeholder="Search Books..."
          className="w-full px-4 py-2 pl-10 border border-blue-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            const shareUrl = `${baseUrl}/dashboard/student-dashboard/study-material/book/${book.slug}`;
            return (
              <div
                key={book.id}
                className="flex flex-col h-full overflow-hidden transition duration-300 border rounded-lg shadow-sm hover:shadow-md"
              >
                <Link
                  href={`/dashboard/student-dashboard/study-material/book/${book.slug}`}
                  className="block "
                  target="_blank"
                >
                  <div className="flex items-center justify-center h-36 bg-blue-950">
                    <img
                      src={book.coverImageUrl || "/default-book.jpg"}
                      alt={book.title}
                      className="object-cover w-full h-full"
                      width={100}
                      height={100}
                    />
                  </div>
                </Link>

                <div className="flex flex-col justify-between flex-grow p-3">
                  <h2 className="mb-2 text-sm font-semibold leading-snug text-center text-gray-800">
                    {book.title}
                  </h2>

                  <div className="flex justify-center mt-3">
                    <div className="relative group">
                      {/* Share Button */}
                      <button className="text-xl text-gray-700 hover:text-blue-600">
                        <IoMdShare />
                      </button>

                      {/* Popup Tooltip */}
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
                            href={`https://web.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
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
              </div>
            );
          })
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No books found for <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
