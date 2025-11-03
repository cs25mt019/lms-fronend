import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api";

function Editcourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    featured_image: "",
    techs: "",
  });

  const { course_id: courseId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryRes = await axios.get(`${baseURL}/category`);
        setCats(categoryRes.data);

        const courseRes = await axios.get(
          `${baseURL}/teacher-course-detail/${courseId}`
        );
        setCourseData({
          category: courseRes.data.category,
          title: courseRes.data.title,
          description: courseRes.data.description,
          featured_image: courseRes.data.featured_image,
          techs: courseRes.data.techs,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [courseId]);

  const handleChange = (e) =>
    setCourseData({ ...courseData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setCourseData({ ...courseData, featured_image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = localStorage.getItem("teacherId");

    const formData = new FormData();
    formData.append("teacher", teacherId);
    formData.append("category", courseData.category);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("techs", courseData.techs);

    if (courseData.featured_image instanceof File) {
      formData.append("featured_image", courseData.featured_image);
    }

    try {
      await axios.patch(
        `${baseURL}/teacher-course-detail/${courseId}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      window.location.href = "/teacher-mycourses";
    } catch (error) {
      console.log(error);
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
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={courseData.category}
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {cats.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={courseData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={courseData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Featured Image</label>
                  <input
                    type="file"
                    name="featured_image"
                    className="form-control"
                    onChange={handleFileChange}
                  />

                  {courseData.featured_image &&
                    typeof courseData.featured_image === "string" && (
                      <img
                        src={courseData.featured_image || null}
                        alt={courseData.title}
                        width="100"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                </div>

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
