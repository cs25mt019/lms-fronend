import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Teachersidebar from "./Teachersidebar";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api/";

function Teacherchangepassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });

  const [teacherId, setTeacherId] = useState(null);

  // -----------------------------------------------
  // Load teacher login info
  // -----------------------------------------------
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const token = localStorage.getItem("access");

    if (!teacher || !teacher.id || !token) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please login as a teacher first.",
      });
      navigate("/teacher-login");
      return;
    }

    setTeacherId(teacher.id);
  }, [navigate]);

  // -----------------------------------------------
  // Handle input change
  // -----------------------------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------------------------
  // Submit form
  // -----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${baseUrl}teacher-change-password/${teacherId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Password changed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({ old_password: "", new_password: "" });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title:
          error.response?.data?.error ||
          "Failed to change password. Try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // -----------------------------------------------

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div className="mb-3">
                  <label className="form-label">Old Password</label>
                  <input
                    type="password"
                    name="old_password"
                    value={formData.old_password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Teacherchangepassword;
