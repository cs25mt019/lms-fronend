import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function AddChapter() {
  const { course_id } = useParams();

  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: null,
    remarks: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------------------------
  // Redirect if teacher not logged in
  // -----------------------------------------------
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const accessToken = localStorage.getItem("access");

    if (!teacher || !teacher.id || !accessToken) {
      alert("Please login as a teacher!");
      window.location.href = "/teacher-login";
    }
  }, []);

  // -----------------------------------------------
  // Handle form changes
  // -----------------------------------------------
  const handleChange = (e) => {
    setChapterData({ ...chapterData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setChapterData({ ...chapterData, video: e.target.files[0] });
  };

  // -----------------------------------------------
  // Submit form
  // -----------------------------------------------
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("course", Number(course_id));
    formData.append("title", chapterData.title);
    formData.append("description", chapterData.description);
    formData.append("remarks", chapterData.remarks);

    if (chapterData.video instanceof File) {
      formData.append("video", chapterData.video);
    }

    try {
      await axios.post(`${baseUrl}chapter/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setSuccess("Chapter added successfully!");

      // Reset form
      setChapterData({
        title: "",
        description: "",
        video: null,
        remarks: "",
      });

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/teacher-mycourses";
      }, 1500);
    } catch (err) {
      console.error("Error adding chapter:", err);
      setError("Failed to add chapter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>

            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={submitForm}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={chapterData.title}
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
                    value={chapterData.description}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>

                {/* Video */}
                <div className="mb-3">
                  <label className="form-label">Upload Video</label>
                  <input
                    type="file"
                    name="video"
                    className="form-control"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Remarks */}
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name="remarks"
                    className="form-control"
                    value={chapterData.remarks}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddChapter;
