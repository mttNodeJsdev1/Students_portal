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

async function getBookBySlug(slug) {
  const res = await fetch("https://backend.indiasarkarinaukri.com/book");
  const data = await res.json();
  return data.rows.find((book) => book.slug === slug);
}

export default async function BookDetail({ params }) {
  const { slug } = params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return <div className="p-4 text-red-500">Book not found</div>;
  }

  const formattedDate = new Date(book.date).toLocaleDateString("en-GB");
  const formattedTime = new Date(book.date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const shareUrl = `https://yourdomain.com/dashboard/student-dashboard/study-material/book/${slug}`;

  const SharePopup = () => (
    <div className="flex flex-col justify-center gap-2 text-xl">
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
  );

  return (
    <div className=" text-black relative z-10 max-w-4xl p-6 mx-auto rounded shadow">
      {/* Top Right Share Button with Popup */}
      <div className="absolute pt-2 top-4 right-4 group">
        <SharePopup />
      </div>

      {/* Book Info */}
      <p className="mb-2 text-lg font-semibold text-red-600">
        Name of Post: <span className="font-bold text-black">{book.title}</span>
      </p>

      {book.driveLink && (
        <div className="mb-4">
          <p className="mb-2 text-lg font-semibold text-red-600">
            View Book Pdf:
          </p>
          <a
            href={book.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            📄 View Pdf
          </a>
        </div>
      )}

      <p className="mb-2 text-lg font-semibold text-red-600">
        Post Date Update:{" "}
        <span className="text-black">
          {formattedDate} | {formattedTime}
        </span>
      </p>

      <p className="mb-2 text-lg font-semibold text-red-600">
        Short Information:
      </p>
      <div
        className="mb-6 prose-sm prose text-justify text-black max-w-none"
        dangerouslySetInnerHTML={{ __html: book.content }}
      />

      {/* 🔽 Bottom Share Section */}
      <div className="pt-4 mt-8 border-t">
        <h3 className="mb-2 font-semibold text-center text-gray-700">
          Share this book:
        </h3>
        <div className="flex flex-row justify-center gap-2 text-xl">
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
      </div>
    </div>
  );
}
