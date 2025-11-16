import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const baseUrl = "http://127.0.0.1:8000/api/";

function Teachermycourses() {
  const [courses, setCourses] = useState([]);

  // -------- FIX: Load Teacher ID safely ----------
  let teacherId = localStorage.getItem("teacherId");

  if (!teacherId) {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    teacherId = teacher?.id;
  }

  useEffect(() => {
    if (!teacherId) {
      console.error("Teacher ID missing → redirecting to login");
      window.location.href = "/teacher-login";
      return;
    }

    fetchCourses();
  }, [teacherId]);

  const fetchCourses = () => {
    axios
      .get(`${baseUrl}teacher-course/${teacherId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);

        // Session expired → logout
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/teacher-login";
        }
      });
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`${baseUrl}course/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then(() => {
          alert("Course deleted successfully!");
          setCourses(courses.filter((course) => course.id !== courseId));
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          alert("Failed to delete course.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        {/* Main Section */}
        <section className="col-md-9">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-warning bg-opacity-50 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="bi bi-journal-bookmark me-2 text-warning"></i>
                My Courses
              </h5>
            </div>

            <div className="card-body bg-light">
              {courses.length > 0 ? (
                <div className="row">
                  {courses.map((course, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">

                        <img
                          src={course.featured_image}
                          alt={course.title}
                          className="card-img-top"
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            borderTopLeftRadius: "0.5rem",
                            borderTopRightRadius: "0.5rem",
                          }}
                        />

                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="fw-bold text-dark mb-1">
                              {course.title}
                            </h6>
                            <p className="text-muted small mb-1">
                              Enrolled:{" "}
                              <span className="badge bg-warning text-dark">
                                {course.total_enrolled_students}
                              </span>
                            </p>
                            <p className="text-muted small mb-2">
                              ⭐ <strong>{course.average_rating}</strong>/5
                            </p>
                          </div>

                          <div className="mt-2">
                            <Link
                              to={`/course-chapters/${course.id}`}
                              className="btn btn-sm btn-outline-warning me-2 mb-2"
                            >
                              <i className="bi bi-journal-text"></i> Chapters
                            </Link>

                            <Link
                              to={`/course-assignments/${course.id}`}
                              className="btn btn-sm btn-outline-secondary me-2 mb-2"
                            >
                              <i className="bi bi-file-earmark-text"></i> Assignments
                            </Link>

                            <Link
                              to={`/teacher/${course.id}/quizzes`}
                              className="btn btn-sm btn-outline-success mb-2"
                            >
                              <i className="bi bi-ui-checks"></i> Quizzes
                            </Link>
                          </div>
                        </div>

                        <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
                          <div>
                            <Link
                              to={`/edit-course/${course.id}`}
                              className="btn btn-outline-primary btn-sm me-2"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>

                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="btn btn-outline-danger btn-sm"
                            >
                              <i className="bi bi-trash"></i>
                            </button>

                            <Link
                              to={`/teacher/course/${course.id}/discussions`}
                              className="btn btn-sm btn-outline-dark mx-1"
                            >
                              <i className="bi bi-chat-dots"></i> Discussions
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <i className="bi bi-collection-play text-secondary fs-1"></i>
                  <p className="mt-3">
                    No courses found. Start by creating one!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Teachermycourses;
