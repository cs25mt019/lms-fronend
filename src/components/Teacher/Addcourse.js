import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";

function Addcourse() {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teacherId, setTeacherId] = useState(null);

  const [courseData, setCourseData] = useState({
    category: "",
    title: "",
    description: "",
    featured_image: null,
    techs: "",
  });

  // ------------------------------------------------------
  // LOAD TEACHER ID + CATEGORIES
  // ------------------------------------------------------
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));

    if (!teacher || !teacher.id) {
      alert("Login expired. Please log in again.");
      window.location.href = "/teacher-login";
      return;
    }

    setTeacherId(teacher.id);
    console.log("Teacher ID Loaded:", teacher.id);

    axios
      .get("http://127.0.0.1:8000/api/category/")
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load categories");
      });
  }, []);

  // ------------------------------------------------------
  // Handle Text Input
  // ------------------------------------------------------
  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  // ------------------------------------------------------
  // Handle File Input
  // ------------------------------------------------------
  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

  // ------------------------------------------------------
  // Submit Form
  // ------------------------------------------------------
  const submitForm = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!teacherId) {
      setError("Teacher ID missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("teacher_id", teacherId);
    formData.append("category", courseData.category);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("techs", courseData.techs);

    if (courseData.featured_image) {
      formData.append(
        "featured_image",
        courseData.featured_image,
        courseData.featured_image.name
      );
    }

    axios
      .post("http://127.0.0.1:8000/api/course/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setSuccess("Course added successfully!");

        setCourseData({
          category: "",
          title: "",
          description: "",
          featured_image: null,
          techs: "",
        });

        setTimeout(() => {
          window.location.href = "/teacher-mycourses";
        }, 1500);
      })
      .catch((error) => {
        console.log("Error response:", error.response);
        if (error.response?.data) {
          setError(`Error: ${JSON.stringify(error.response.data)}`);
        } else {
          setError("Failed to add course. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // ------------------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">

              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={submitForm}>
                
                {/* CATEGORY */}
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={courseData.category}
                    className="form-control"
                    required
                  >
                    <option value="">Select Category</option>
                    {cats.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TITLE */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={courseData.title}
                    className="form-control"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    value={courseData.description}
                    rows="4"
                  ></textarea>
                </div>

                {/* IMAGE */}
                <div className="mb-3">
                  <label className="form-label">Featured Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="featured_image"
                    className="form-control"
                    accept="image/*"
                  />
                </div>

                {/* TECHNOLOGIES */}
                <div className="mb-3">
                  <label className="form-label">Technologies used</label>
                  <textarea
                    className="form-control"
                    onChange={handleChange}
                    name="techs"
                    value={courseData.techs}
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding Course..." : "Submit"}
                </button>

              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Addcourse;
