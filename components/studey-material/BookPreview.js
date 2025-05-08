"use client";

import Link from "next/link";
import useBooks from "../hooks/useBook";
import { FaRegBookmark } from "react-icons/fa"; // book icon

export default function BookPreview() {
  const books = useBooks();

  return (
    <div className="border border-gray-300 w-full max-w-sm mx-auto rounded-sm overflow-hidden shadow">
      {/* Header */}
      <div className="bg-sky-400 text-white text-center font-semibold py-2">
        Free Books
      </div>
      {/* Book List */}
      <ul className="divide-y divide-gray-200 bg-white">
        {books.slice(0, 3).map((book) => (
          <li
            key={book.id}
            className="flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FaRegBookmark className="text-gray-700" />
            <Link
              href={`/dashboard/student-dashboard/study-material/book/${book.slug}`}
              className="text-black hover:underline"
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* View More */}
      <div className="text-center py-2 bg-white">
        <Link
          href="/dashboard/student-dashboard/study-material/book"
          className="text-black font-semibold hover:underline text-sm"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
