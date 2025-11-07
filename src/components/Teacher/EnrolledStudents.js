import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EnrolledStudents() {
  const { course_id } = useParams();
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/fetch-enrolled-students/${course_id}/`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching enrolled students", err);
      });
  }, [course_id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Enrolled Students</h3>

      {students.length === 0 ? (
        <p className="text-muted">No students have enrolled in this course yet.</p>
      ) : (
        <table className="table table-bordered">
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

      <Link to="/teacher-mycourses" className="btn btn-secondary mt-2">Back</Link>
    </div>
  );
}

export default EnrolledStudents;
