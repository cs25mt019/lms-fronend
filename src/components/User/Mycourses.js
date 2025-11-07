import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

function Mycourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  useEffect(() => {
    if (!studentId) {
      setError("Please log in first.");
      setLoading(false);
      return;
    }

    axios
      .get(`${baseUrl}student-courses/${studentId}/`)
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
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

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
                  You haven’t enrolled in any courses yet.
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
