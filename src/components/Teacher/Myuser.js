import { useEffect, useState } from "react";
import axios from "axios";
import Teachersidebar from "./Teachersidebar";

function Myuser() {
  const [students, setStudents] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/teacher-students/${teacherId}/`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3"><Teachersidebar /></aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">My Students</h5>
            <div className="card-body">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Interested Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.full_name}</td>
                      <td>{s.email}</td>
                      <td>{s.username}</td>
                      <td>{s.interested_categories}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5">No students yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Myuser;
