"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiCircleFill } from "react-icons/ri";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://backend.indiasarkarinaukri.com/category/"
        );
        setCategories(response.data.rows); // Accessing the 'rows' array from the API response
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="lg:py-4 sm:p-4 p-2">
      {/* Responsive padding */}
      {/* Header Section */}
      <div className="relative p-6 text-white text-center border-red-800 rounded-tl-xl rounded-br-xl min-h-10 lg:text-lg text-xs lg:min-h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="relative text-sm font-medium z-10 lg:text-xl lg:font-medium">
            Category
          </h3>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2/4 bg-blue-500 transform skew-x-[20deg]"></div>
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-blue-500 transform skew-x-[-20deg]"></div>
      </div>

      {/* Content Section */}
      <div className="p-2 border border-[#247BFF] w-full relative right-1">
        <ul className="space-y-3 text-xs lg:text-base">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="flex items-center gap-2">
                <RiCircleFill
                  size={6}
                  className="text-[#247BFF] flex-shrink-0"
                />
                {/* Category Name and Image */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/category/${category.id}`} // ✅ use id instead of slug
                    target="_blank"
                    className="text-linkcolor hover:underline"
                  >
                    {category.name}
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <li>No categories available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Category;
