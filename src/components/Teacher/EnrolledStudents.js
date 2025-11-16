import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

function EnrolledStudents() {
  const { course_id } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check teacher login
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const access = localStorage.getItem("access");

    if (!teacher || !teacher.id || !access) {
      alert("Please login as teacher first!");
      window.location.href = "/teacher-login";
      return;
    }

    fetchStudents();
  }, [course_id]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}fetch-enrolled-students/${course_id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching enrolled students:", err);
      setError("Failed to load enrolled students");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------

  if (loading)
    return <div className="text-center mt-4">Loading enrolled students...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold">Enrolled Students</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {students.length === 0 ? (
        <p className="text-muted">No students have enrolled in this course yet.</p>
      ) : (
        <table className="table table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.full_name}</td>
                <td>{student.username}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/teacher-mycourses" className="btn btn-secondary mt-2">
        ← Back to My Courses
      </Link>
    </div>
  );
}

export default EnrolledStudents;
