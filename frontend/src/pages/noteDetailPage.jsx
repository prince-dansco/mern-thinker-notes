import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, Loader, LoaderIcon, Trash2Icon } from "lucide-react";
import axios from "axios";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


 const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/notes"
    : "/api/notes";

axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${id}`);
        console.log("Full API response:", res.data); 
        
        
        const noteData = res.data.data || res.data.note || res.data;
        console.log("Extracted note data:", noteData); 
        
        setNote(noteData);
      } catch (error) {
        console.log(error, "Error fetching data");
        toast.error("failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center ">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  
  console.log("Current note state:", note);

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-error">Note not found</p>
          <Link to="/" className="btn btn-primary mt-4">
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await axios.delete(`/api/notes/${id}`);
      console.log(res, "response");
      toast.success("successfully deleted note");
      navigate("/");
    } catch (error) {
      console.log(error, "Failed to delete note");
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Please add a title and content");
      return;
    }
    setSaving(true);

    try {
      const res = await axios.put(`/api/notes/${id}`, note);
      console.log(res, note)
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error, "Error saving the note");
      toast.error("Failed to update note");
    } finally {
      setSaving(false); // Fix: should be setSaving(false), not setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100"> {/* Fix: was bg-base- (incomplete) */}
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  value={note.title || ""} 
                  className="input input-bordered"
                  onChange={(e) => setNote({ ...note, title: e.target.value })} 
                  autoFocus
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Note content"
                  value={note.content || ""} 
                  className="textarea textarea-bordered h-32"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}