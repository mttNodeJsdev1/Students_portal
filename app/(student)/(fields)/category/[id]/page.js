import React from "react";
import Image from "next/image"; // Import Image from next/image

async function getCategoryData(id) {
  const res = await fetch(
    `https://backend.indiasarkarinaukri.com/category/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

const CategoryPage = async ({ params }) => {
  const { id } = params;
  const category = await getCategoryData(id);

  return (
    <div className="p-4 text-black relative z-10">
      <h1 className="mb-4 text-xl font-bold">{category.name}</h1>
      <img
        src={category.categoryImg} // Image source
        alt={category.imgAltText} // Image alt text
        className="w-full max-w-md mb-4 rounded" // Styling
      />
      <div dangerouslySetInnerHTML={{ __html: category.content || "" }} />
    </div>
  );
};

export default CategoryPage;
