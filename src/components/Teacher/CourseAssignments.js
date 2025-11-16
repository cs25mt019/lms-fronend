import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/";

function CourseAssignments() {
  const { courseId } = useParams();  // <-- FIXED
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

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

    fetchAssignments();
  }, [courseId, navigate]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${baseUrl}course-assignments/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setAssignments(res.data);
    } catch (error) {
      console.error("Error fetching course assignments:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Assignment?",
      text: "Are you sure you want to delete this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}assignments/${id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          });

          Swal.fire("Deleted!", "Assignment removed successfully.", "success");

          setAssignments(assignments.filter((a) => a.id !== id));
        } catch (error) {
          Swal.fire("Error!", "Failed to delete assignment.", "error");
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card shadow-sm">
            <h5 className="card-header bg-light d-flex justify-content-between">
              <span>Assignments for This Course</span>

              <Link
                to={`/add-assignment/${courseId}`}   // <-- FIXED
                className="btn btn-sm btn-primary"
              >
                + Add Assignment
              </Link>
            </h5>

            <div className="card-body">
              {assignments.length > 0 ? (
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>File</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignments.map((a) => (
                      <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.description}</td>
                        <td>{new Date(a.due_date).toLocaleString()}</td>

                        <td>
                          {a.file ? (
                            <a
                              href={a.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </a>
                          ) : (
                            "No file"
                          )}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-danger mx-1"
                            onClick={() => handleDelete(a.id)}
                          >
                            Delete
                          </button>

                          <Link
                            to={`/assignment-submissions/${a.id}`}
                            className="btn btn-sm btn-info mx-1"
                          >
                            View Submissions
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted text-center">
                  No assignments created for this course yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CourseAssignments;
