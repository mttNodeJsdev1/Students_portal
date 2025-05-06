import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

const OldPaper = () => {
  const [oldPapers, setOldPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOldPapers = async () => {
      try {
        const response = await fetch(
          "https://backend.indiasarkarinaukri.com/oldpaper/modified"
        );
        const data = await response.json();
        setOldPapers(data);
      } catch (error) {
        console.error("Failed to fetch old papers:", error);
      }
    };
    fetchOldPapers();
  }, []);

  const filteredPapers = oldPapers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 relative z-10">
      <h1 className="text-2xl text-center font-bold mb-6">Old Papers</h1>

      <div className="mb-6 max-w-md mx-auto flex">
        <IoSearchOutline className="text-xl  mt-3 -mr-8" />
        <input
          type="text"
          placeholder="Search old papers..."
          className="w-full px-4 pl-10 py-2 border border-blue-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => {
            const shareUrl = `https://your-domain.com/dashboard/student-dashboard/study-material/old-paper/${paper.slug}`;

            return (
              <div
                key={paper.id}
                className="border rounded-md shadow-sm hover:shadow-lg transition cursor-pointer bg-blue-900 p-3 text-white"
              >
                <Link
                  target="_blank"
                  href={`/dashboard/student-dashboard/study-material/old-paper/${paper.slug}`}
                >
                  <div className="h-24 flex items-center justify-center text-center text-sm font-medium px-2 rounded mb-3">
                    {paper.title}
                  </div>
                </Link>

                {/* Share Icons */}
                <div className="flex justify-center mt-3">
                  <div className="relative group">
                    <button className="text-xl text-white hover:text-blue-600">
                      <IoMdShare />
                    </button>

                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-xl rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-max">
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
          <p className="text-center text-gray-400 col-span-full">
            No old papers found for <strong>{searchTerm}</strong>
          </p>
        )}
      </div>
    </div>
  );
};
export default OldPaper;
