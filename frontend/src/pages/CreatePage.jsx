import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { PlaneIcon } from "lucide-react";
import axios from "axios";


export default function CreatePage() {


const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/notes"
    : "/api/notes";

axios.defaults.withCredentials = true;


  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.title.trim() || !data.content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const { title, content } = data; 
      const newNote = await axios.post("/api/notes", {
        title,
        content,
      }); 
      console.log(newNote);
      
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log(error, "Error creating note");
      if(error.response?.status === 429){
        toast.error("Slow down you re creating notes too fast please try again",{
          duration:4000,
          icon: '🙏🙏'
        });

      }else{
        toast.error('Failed to create note')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <PlaneIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    name="title"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    } // Fixed: proper state update
                    autoFocus
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    name="content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={data.content}
                    onChange={(e) =>
                      setData({ ...data, content: e.target.value })
                    } 
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
