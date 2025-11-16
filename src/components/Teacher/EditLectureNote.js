import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function EditLectureNote() {
  const { note_id } = useParams();
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    file: null,
    chapter: null,
  });

  const [previewFile, setPreviewFile] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  // Load existing note
  useEffect(() => {
    axios
      .get(`${baseUrl}lecture-notes/${note_id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNoteData({
          title: res.data.title,
          description: res.data.description,
          file: null,
          chapter: res.data.chapter,
        });
        setPreviewFile(res.data.file);
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  }, [note_id]);

  // Update inputs
  const handleChange = (e) =>
    setNoteData({ ...noteData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setNoteData({ ...noteData, file: e.target.files[0] });

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", noteData.title);
    formData.append("description", noteData.description);
    formData.append("chapter", noteData.chapter);

    if (noteData.file) {
      formData.append("file", noteData.file);
    }

    axios
      .patch(`${baseUrl}lecture-notes/${note_id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Lecture note updated successfully!");
        navigate(`/chapter-notes/${noteData.chapter}`);
      })
      .catch((err) => console.log("Update error:", err));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        {/* Edit form */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Lecture Note</h5>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Title */}
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

                {/* Description */}
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

                {/* Existing File Preview */}
                {previewFile && (
                  <div className="mb-3">
                    <label className="form-label">Existing File</label>
                    <br />
                    <a
                      href={previewFile}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View current file
                    </a>
                  </div>
                )}

                {/* New File Upload */}
                <div className="mb-3">
                  <label className="form-label">Replace File</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditLectureNote;
