import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function Mycourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get student from localStorage
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  useEffect(() => {
    // If student is not logged in → redirect to login
    if (!studentId) {
      setError("Please log in to view your courses.");
      setLoading(false);
      navigate("/student-login");
      return;
    }

    // Get access token
    const token = localStorage.getItem("access");
    if (!token) {
      setError("Session expired. Please log in again.");
      setLoading(false);
      navigate("/student-login");
      return;
    }

    // Fetch student enrolled courses WITH AUTH HEADER
    axios
      .get(`${baseUrl}student-courses/${studentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error loading student courses:", error);
        setError("Failed to load your courses.");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [studentId, navigate]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        
        {/* Sidebar */}
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">

              {/* Error Message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Course List */}
              {courses.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>
                          {course.Teacher ? (
                            <Link to={`/teacher-detail/${course.Teacher.id}`}>
                              {course.Teacher.full_name}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/student-course-detail/${course.id}`}
                            className="btn bg-primary text-light px-3"
                          >
                            Watch
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted text-center mt-3">
                  You haven't enrolled in any courses yet.
                </p>
              )}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Mycourses;
