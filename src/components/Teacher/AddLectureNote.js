import { useState } from "react";
import { useParams } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function AddLectureNote() {
  const { chapter_id } = useParams();

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNoteData({ ...noteData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("chapter", Number(chapter_id));
    formData.append("title", noteData.title);
    formData.append("description", noteData.description);

    if (noteData.file) {
      formData.append("file", noteData.file);
    }

    try {
      await axios.post(`${baseUrl}lecture-notes/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setSuccess("Lecture note added successfully!");
      setError("");

      setTimeout(() => {
        window.location.href = `/chapter-notes/${chapter_id}`;
      }, 1500);

    } catch (err) {
      console.log(err);
      setError("Failed to upload note");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Lecture Note</h5>

            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={noteData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={noteData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload File (PDF, PPT, Video)</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Note
                </button>

              </form>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default AddLectureNote;
