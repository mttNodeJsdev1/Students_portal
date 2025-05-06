// hooks/useBooks.js
import { useEffect, useState } from "react";

export default function useBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://backend.indiasarkarinaukri.com/book/modified")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  return books;
}
