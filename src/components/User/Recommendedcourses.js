import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";
const BACKEND_URL = "http://127.0.0.1:8000";

function Recommendedcourses() {
  const [courses, setCourses] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (student?.id) {
      axios
        .get(`${API_URL}recommended-courses/${student.id}/`)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recommended courses:", error);
        });
    }
  }, [student]);

  return (
    <div className="container mt-4">
      <div className="row">
        
        {/* Sidebar */}
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        {/* Recommended Courses */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Recommended Courses For You</h5>

            <div className="card-body">
              {courses.length === 0 ? (
                <p className="text-muted">No recommendations available yet.</p>
              ) : (
                <div className="row g-4">

                  {courses.map((course) => (
                    <div className="col-md-4" key={course.id}>
                      
                      <div
                        className="card h-100 shadow-sm"
                        style={{ borderRadius: "12px", overflow: "hidden" }}
                      >
                        
                        {/* ================= IMAGE ================= */}
                        <img
                          src={
                            course.featured_image
                              ? BACKEND_URL + course.featured_image
                              : "https://via.placeholder.com/400x250"
                          }
                          alt={course.title}
                          className="card-img-top"
                          style={{
                            height: "180px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />

                        {/* ================= BODY ================= */}
                        <div className="card-body">
                          
                          {/* Title */}
                          <h6 className="fw-bold" style={{ minHeight: "40px" }}>
                            {course.title.length > 40
                              ? course.title.substring(0, 40) + "..."
                              : course.title}
                          </h6>

                          {/* Teacher */}
                          <div className="d-flex align-items-center mt-2">
                            <img
                              src={
                                course.Teacher?.profile_image
                                  ? BACKEND_URL + course.Teacher.profile_image
                                  : "https://via.placeholder.com/40"
                              }
                              width="40"
                              height="40"
                              className="rounded-circle me-2"
                              alt="teacher"
                              style={{ objectFit: "cover" }}
                            />

                            <Link
                              to={`/teacher-detail/${course.Teacher?.id}`}
                              className="fw-semibold text-decoration-none"
                            >
                              {course.Teacher?.full_name}
                            </Link>
                          </div>

                        </div>

                        {/* ================= FOOTER ================= */}
                        <div className="card-footer bg-white border-0">
                          <Link
                            to={`/detail/${course.id}`}
                            className="btn btn-primary w-100"
                            style={{ borderRadius: "6px" }}
                          >
                            View Course
                          </Link>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default Recommendedcourses;
