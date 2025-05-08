// components/notes/NotesPreview.js
"use client";

import Link from "next/link";
import useNotes from "../hooks/useNotes";
import { FaRegStickyNote } from "react-icons/fa"; // note icon

export default function NotesPreview() {
  const { notes, loading } = useNotes();

  return (
    <div className="border border-gray-300 w-full max-w-sm mx-auto rounded-sm overflow-hidden shadow">
      {/* Header */}
      <div className="bg-sky-400 text-white text-center font-semibold py-2">
        Free Notes
      </div>

      {/* Notes List */}
      <ul className="divide-y divide-gray-200 bg-white">
        {!loading &&
          notes.slice(0, 3).map((note) => (
            <li
              key={note.id}
              className="flex items-center gap-2 px-4 py-2 text-sm"
            >
              <FaRegStickyNote className="text-gray-700" />
              <Link
                href={`/dashboard/student-dashboard/study-material/notes/${note.slug}`}
                className="text-black hover:underline"
              >
                {note.title}
              </Link>
            </li>
          ))}
        {loading && (
          <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
        )}
      </ul>

      {/* View More */}
      <div className="text-center py-2 bg-white">
        <Link
          href="/dashboard/student-dashboard/study-material/notes"
          className="text-black font-semibold hover:underline text-sm"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
