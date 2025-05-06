import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { IoMdShare } from "react-icons/io";

async function getNoteDetails(slug) {
  const res = await fetch("https://backend.indiasarkarinaukri.com/notes");
  const data = await res.json();
  return data.rows.find((note) => note.slug === slug);
}

export default async function NoteDetailPage({ params }) {
  const { slug } = params;
  const note = await getNoteDetails(slug);

  if (!note) {
    return <div className="p-4 text-red-600">Note not found.</div>;
  }
  const shareUrl = `https://indiasarkarinaukri.com/dashboard/student-dashboard/study-material/notes/${slug}`;

  const SharePopup = () => (
    <div className="flex gap-2 text-xl  justify-center flex-col">
      <a
        href={`https://api.whatsapp.com/send?text=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#25D366] hover:scale-110"
      >
        <FaWhatsapp />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0077B5] hover:scale-110"
      >
        <FaLinkedin />
      </a>
      <a
        href={`https://t.me/share/url?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0088cc] hover:scale-110"
      >
        <FaTelegram />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2] hover:scale-110"
      >
        <FaFacebook />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:scale-110"
      >
        <SiX />
      </a>
      <a
        href={`https://www.instagram.com/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E1306C] hover:scale-110"
      >
        <FaInstagram />
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E60023] hover:scale-110"
      >
        <FaPinterest />
      </a>
    </div>
  );

  return (
    <div className=" text-black p-6 space-y-4 shadow rounded max-w-3xl mx-auto relative z-10">
      {/* ✅ Top Right Share Button with Popup */}
      <div className=" pt-2 absolute top-4 right-4 group">
        <SharePopup />
      </div>

      {/* Note Details */}
      <p className="text-lg font-bold text-red-600">
        Name of Post:{" "}
        <span className="text-black font-semibold">{note.title}</span>
      </p>

      <p className="text-lg font-bold text-red-600">
        View Notes Pdf:{" "}
        {note.notesPdf ? (
          <a
            href={note.notesPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-800"
          >
            📄 View Pdf
          </a>
        ) : (
          <span className="text-black ml-2">No PDF Available</span>
        )}
      </p>

      <p className="text-lg font-bold text-red-600">
        Post Date Update:{" "}
        <span className="text-black">
          {note.date ? note.date : "No date available"}
        </span>
      </p>

      <p className="text-lg font-bold text-red-600">Short Information: </p>
      <div className="prose prose-sm max-w-none text-justify text-black mb-6">
        {note.description || "Not provided"}
      </div>

      {/* ✅ Bottom Share Section */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-center font-semibold text-gray-700 mb-2">
          Share this Note:
        </h3>
        <div className="flex gap-2 text-xl  justify-center flex-row">
          <a
            href={`https://web.whatsapp.com/send?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077B5] hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0088cc] hover:scale-110"
          >
            <FaTelegram />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:scale-110"
          >
            <SiX />
          </a>
          <a
            href={`https://www.instagram.com/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E60023] hover:scale-110"
          >
            <FaPinterest />
          </a>
        </div>
      </div>
    </div>
  );
}
