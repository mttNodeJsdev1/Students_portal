// hooks/useNotes.js
"use client";
import { useEffect, useState } from "react";

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backend.indiasarkarinaukri.com/notes/modified")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notes:", err);
        setLoading(false);
      });
  }, []);

  return { notes, loading };
}
