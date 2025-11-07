import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/";

function Register() {
  const [students, setStudents] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    interests: "",
  });

  const [status, setStatus] = useState(""); // ✅ separate status

  const handleChange = (e) => {
    setStudents({ ...students, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    const studentsData = new FormData();
    studentsData.append("full_name", students.full_name);
    studentsData.append("email", students.email);
    studentsData.append("username", students.username);
    studentsData.append("password", students.password);
    studentsData.append("interested_categories", students.interests); // ✅ correct field

    axios.post(`${baseURL}student/`, studentsData)
      .then((response) => {
        setStatus("success");
        setStudents({
          full_name: "",
          email: "",
          username: "",
          password: "",
          interests: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  };

  useEffect(() => {
    document.title = "Student Register";
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">

          {status === "success" && 
            <div className="alert alert-success">You have registered successfully</div>
          }
          {status === "error" &&
            <div className="alert alert-danger">Registration failed</div>
          }

          <div className="card">
            <h5 className="card-header">User Register</h5>
            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="full_name" onChange={handleChange} className="form-control" value={students.full_name}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" onChange={handleChange} className="form-control" value={students.email}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" onChange={handleChange} className="form-control" value={students.username}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" onChange={handleChange} className="form-control" value={students.password}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Interests</label>
                <textarea name="interests" onChange={handleChange} className="form-control" value={students.interests}/>
              </div>

              <button type="button" onClick={submitForm} className="btn btn-primary">
                Register
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
