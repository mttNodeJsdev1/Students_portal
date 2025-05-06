import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si"; // X icon (formerly Twitter)
import { IoMdShare } from "react-icons/io";

async function getOldPaperDetails(slug) {
  const res = await fetch("https://backend.indiasarkarinaukri.com/oldpaper", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.rows.find((paper) => paper.slug === slug);
}

export default async function OldPaperDetailPage({ params }) {
  const { slug } = params;
  const paper = await getOldPaperDetails(slug);

  if (!paper) {
    return <div className="p-4 text-red-600">Old paper not found.</div>;
  }

  const shareUrl = `https://indiasarkarinaukri.com/dashboard/student-dashboard/study-material/oldpaper/${slug}`;

  const SharePopup = () => (
    <div className=" text-black relative z-10 flex flex-col justify-center gap-2 mt-2 text-xl">
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
    <div className="relative z-10 max-w-3xl p-6 mx-auto space-y-4 rounded shadow">
      <div className="absolute pt-2 mt-8 top-4 right-4 group">
        <SharePopup />
      </div>

      <p className="text-lg font-bold text-red-600">
        Name of Paper:{" "}
        <span className="font-semibold text-black">{paper.title}</span>
      </p>

      <p className="text-lg font-bold text-red-600">
        View Paper Pdf:{" "}
        {paper.pdfUrl ? (
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1 text-white bg-blue-900 rounded hover:bg-blue-800"
          >
            📄 View Pdf
          </a>
        ) : (
          <span className="ml-2 text-black">No PDF Available</span>
        )}
      </p>

      <p className="text-lg font-bold text-red-600">
        Post Date Update:{" "}
        <span className="text-black">
          {paper.date ? paper.date : "No date available"}
        </span>
      </p>

      <p className="text-lg font-bold text-red-600">
        Description:{" "}
        <span className="text-black">
          {paper.description || "Not provided"}
        </span>
      </p>
      <p className="mb-2 text-lg font-semibold text-red-600">
        Short Information:
      </p>
      {/* Render HTML content safely */}
      {paper.content && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: paper.content }}
        />
      )}

      <div className="pt-4 mt-8 border-t">
        <h3 className="mb-2 font-semibold text-center text-gray-700">
          Share this paper:
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
