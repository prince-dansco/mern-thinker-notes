
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotFound from "../components/notFound";
import axios from "axios";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/notes"
    : "/api/notes";

axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log("Full response:", res.data);
        const notesData = res.data.data || res.data.notes || res.data;

        console.log("Extracted notes:", notesData);
        setNotes(notesData);
        setIsRateLimited(false);
      } catch (error) {
        console.log(error, "Error fetching data");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
             <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <NotFound />
        )}
      </div>
    </div>
  );
}
