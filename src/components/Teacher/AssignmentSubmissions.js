import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/";

function AssignmentSubmissions() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ grade: "", feedback: "" });

  // -------------------------------------------------------------
  // FETCH SUBMISSIONS
  // -------------------------------------------------------------
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

    fetchSubmissions();
  }, [assignmentId, navigate]);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}assignment-submissions/${assignmentId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setSubmissions(res.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      Swal.fire("Error", "Failed to load submissions", "error");
    }
  };

  // -------------------------------------------------------------
  // ENABLE EDIT MODE
  // -------------------------------------------------------------
  const handleEditClick = (submission) => {
    setEditing(submission.id);
    setFormData({
      grade: submission.grade || "",
      feedback: submission.feedback || "",
    });
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setFormData({ grade: "", feedback: "" });
  };

  // -------------------------------------------------------------
  // SAVE UPDATED GRADE + FEEDBACK
  // -------------------------------------------------------------
  const handleSave = async (submissionId) => {
    try {
      await axios.patch(
        `${baseUrl}grade-submission/${submissionId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Saved!", "Grade and feedback updated successfully.", "success");
      setEditing(null);
      fetchSubmissions();
    } catch (error) {
      console.error("Grade update error:", error);
      Swal.fire("Error!", "Failed to update grade or feedback.", "error");
    }
  };

  // -------------------------------------------------------------
  // HANDLE FORM INPUT CHANGES
  // -------------------------------------------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card shadow-sm">
            <h5 className="card-header bg-light d-flex justify-content-between align-items-center">
              <span>Student Submissions</span>
              <Link to={-1} className="btn btn-sm btn-outline-secondary">
                ← Back
              </Link>
            </h5>

            <div className="card-body">
              {submissions.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>File</th>
                      <th>Submitted At</th>
                      <th>Grade</th>
                      <th>Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id}>
                        <td>{s.student_name}</td>

                        <td>
                          {s.submitted_file ? (
                            <a
                              href={s.submitted_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View File
                            </a>
                          ) : (
                            "No File"
                          )}
                        </td>

                        <td>{new Date(s.submitted_at).toLocaleString()}</td>

                        {editing === s.id ? (
                          <>
                            {/* Edit MODE */}
                            <td>
                              <input
                                type="text"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                                placeholder="Enter grade"
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                                placeholder="Enter feedback"
                              />
                            </td>

                            <td>
                              <button
                                className="btn btn-sm btn-success mx-1"
                                onClick={() => handleSave(s.id)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-sm btn-secondary mx-1"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            {/* Normal MODE */}
                            <td>{s.grade || "Not graded"}</td>
                            <td>{s.feedback || "No feedback"}</td>

                            <td>
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEditClick(s)}
                              >
                                Grade / Edit
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted text-center mb-0">
                  No student submissions yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AssignmentSubmissions;
