import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lip/utils";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function NoteCard({ note, setNotes }) {



const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/notes"
    : "/api/notes";

axios.defaults.withCredentials = true;



  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      console.log(res, "response");
      toast.success("successfully deleted note");
    } catch (error) {
      console.log(error, "Failed to delete note");
      toast.error("Failed to delete note");
    }
  };
  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3 ">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/note/${note._id}`} className="">
              <PenSquareIcon className="size-4" />
            </Link>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
