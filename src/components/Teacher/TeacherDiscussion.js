import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import DiscussionForum from "../DiscussionForum";
import Swal from "sweetalert2";

function TeacherDiscussions() {
  const { course_id } = useParams();
  const navigate = useNavigate();

  const [teacherId, setTeacherId] = useState(null);

  // ------------------------------------------------------
  // LOAD TEACHER LOGIN VALIDATION
  // ------------------------------------------------------
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const token = localStorage.getItem("access");

    if (!teacher || !teacher.id || !token) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please login as a teacher to continue.",
      });
      navigate("/teacher-login");
      return;
    }

    setTeacherId(teacher.id);
  }, [navigate]);

  if (!teacherId) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-warning"></div>
        <p className="text-muted mt-2">Loading...</p>
      </div>
    );
  }

  // ------------------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        {/* Discussion Forum */}
        <section className="col-md-9">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-warning bg-opacity-25 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold text-dark mb-0">
                <i className="bi bi-chat-left-text text-warning me-2"></i>
                Course Discussions
              </h5>
              <Link
                to={`/teacher-mycourses`}
                className="btn btn-outline-secondary btn-sm"
              >
                ← Back to Course
              </Link>
            </div>

            <div className="card-body">
              <p className="text-muted">
                View and respond to student messages for this course.
              </p>

              {/* Pass Correct Teacher ID */}
              <DiscussionForum courseId={course_id} teacherId={teacherId} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDiscussions;
