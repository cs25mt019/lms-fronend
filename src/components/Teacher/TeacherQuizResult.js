import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Teachersidebar from "./Teachersidebar";
import { FaArrowLeft, FaUserGraduate, FaTrophy, FaClock } from "react-icons/fa";

const baseUrl = "http://127.0.0.1:8000/api/";

function TeacherQuizResults() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchQuizDetails();
    fetchQuizResults();
  }, [quiz_id]);

  // -----------------------------
  // FETCH QUIZ DETAILS
  // -----------------------------
  const fetchQuizDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}quizzes/${quiz_id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuiz(res.data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // -----------------------------
  // FETCH QUIZ ATTEMPTS
  // -----------------------------
  const fetchQuizResults = async () => {
    try {
      const res = await axios.get(`${baseUrl}quiz/${quiz_id}/attempts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttempts(res.data);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    } finally {
      setLoading(false);
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-dark">
              {quiz ? quiz.title : "Quiz Results"}
            </h4>
            <Link
              to={`/teacher/${quiz?.course}/quizzes`}
              className="btn btn-outline-secondary btn-sm"
            >
              <FaArrowLeft className="me-1" /> Back to Quizzes
            </Link>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2">Loading results...</p>
            </div>
          ) : attempts.length === 0 ? (
            <div className="alert alert-info text-center">
              No students have attempted this quiz yet.
            </div>
          ) : (
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-light fw-semibold">
                Total Attempts: {attempts.length}
              </div>

              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Student</th>
                      <th>Score</th>
                      <th>Submitted At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td>
                          <FaUserGraduate className="text-primary me-2" />
                          {attempt.student?.full_name ?? "Unknown Student"}
                        </td>

                        <td>
                          <FaTrophy className="text-warning me-2" />
                          {Number(attempt.score).toFixed(2)}%
                        </td>

                        <td>
                          <FaClock className="text-muted me-1" />
                          {new Date(attempt.submitted_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TeacherQuizResults;
