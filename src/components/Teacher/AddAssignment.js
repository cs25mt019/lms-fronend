import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:8000/api/";

function AddAssignment() {
  const { courseId } = useParams(); // <-- Correct param name
  const navigate = useNavigate();
  
  const [teacherId, setTeacherId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  // ------------------------------------------------------
  // LOAD TEACHER LOGIN STATUS
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

  // ------------------------------------------------------
  // SUBMIT FORM
  // ------------------------------------------------------
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    //console.log(courseId)
    //console.log("hello")
    const formData = new FormData();
     const dueDateISO = new Date(dueDate).toISOString();
    formData.append("course", Number(courseId));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", dueDateISO);
    //formData.append("due_date", dueDate);
    formData.append("created_by", Number(teacherId));
    
    if (file instanceof File) {
      formData.append("file", file);
    }

    try {
      await axios.post(`${BASE_URL}assignments/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Assignment added successfully",
        icon: "success",
        confirmButtonColor: "#28a745",
      }).then(() => {
        navigate("/teacher-mycourses");
      });
    }  catch (error) {
  console.error("ERROR:", error.response?.data);

  Swal.fire({
    title: "Error_",
    text: JSON.stringify(error.response?.data, null, 2),
    icon: "error",
    confirmButtonColor: "#d33",
  });
}

  };

  // ------------------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card p-3 shadow-sm">
            <h4 className="mb-3 text-center">Add Assignment</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label>Due Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Upload File (optional)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success px-4">
                  Submit Assignment
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddAssignment;
