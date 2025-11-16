import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api";

function Editcourse() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    featured_image: "",
    techs: "",
  });

  const { course_id: courseId } = useParams();

  // -------------------------------------------------------------
  // Load teacher ID & redirect if not logged in
  // -------------------------------------------------------------
  const teacherObj = JSON.parse(localStorage.getItem("teacher"));
  const teacherId = teacherObj?.id;

  useEffect(() => {
    if (!teacherId) {
      alert("You must be logged in as a teacher!");
      window.location.href = "/teacher-login";
      return;
    }

    async function fetchData() {
      try {
        // Load categories
        const categoryRes = await axios.get(`${baseURL}/category/`);
        setCats(categoryRes.data);

        // Load course details
        const courseRes = await axios.get(
          `${baseURL}/teacher-course-detail/${courseId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        setCourseData({
          category: courseRes.data.category,
          title: courseRes.data.title,
          description: courseRes.data.description,
          featured_image: courseRes.data.featured_image, // string URL
          techs: courseRes.data.techs,
        });
      } catch (error) {
        console.log("Load error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId, teacherId]);

  // -------------------------------------------------------------
  // Handle text updates
  // -------------------------------------------------------------
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // -------------------------------------------------------------
  // Handle file upload
  // -------------------------------------------------------------
  const handleFileChange = (e) => {
    setCourseData({ ...courseData, featured_image: e.target.files[0] });
  };

  // -------------------------------------------------------------
  // Submit form
  // -------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("teacher_id", teacherId); // FIX 1
    formData.append("category", courseData.category);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("techs", courseData.techs);

    // Only append file if user selected a new one
    if (courseData.featured_image instanceof File) {
      formData.append("featured_image", courseData.featured_image);
    }

    try {
      await axios.patch(
        `${baseURL}/teacher-course-detail/${courseId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`, // FIX 2
          },
        }
      );

      alert("Course updated successfully!");
      window.location.href = "/teacher-mycourses";
    } catch (error) {
      console.log("Update error:", error.response || error);
      alert("Failed to update course.");
    }
  };

  // -------------------------------------------------------------
  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">

        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* CATEGORY */}
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={courseData.category}
                    className="form-select"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {cats.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TITLE */}
                <div className="mb-3">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={courseData.description}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>

                {/* IMAGE */}
                <div className="mb-3">
                  <label className="form-label">Featured Image</label>
                  <input
                    type="file"
                    name="featured_image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {typeof courseData.featured_image === "string" && (
                    <img
                      src={courseData.featured_image}
                      alt="Current"
                      width="120"
                      className="mt-2 border rounded"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>

                {/* TECHNOLOGIES */}
                <div className="mb-3">
                  <label className="form-label">Technologies</label>
                  <input
                    type="text"
                    name="techs"
                    className="form-control"
                    value={courseData.techs}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Course
                </button>

              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Editcourse;
