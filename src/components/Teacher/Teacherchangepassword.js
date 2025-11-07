import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Teachersidebar from "./Teachersidebar";

const baseUrl = "http://127.0.0.1:8000/api/";

function Teacherchangepassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });

  const teacherId = localStorage.getItem("teacherId");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}teacher-change-password/${teacherId}/`,
        formData
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Password changed successfully!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ old_password: "", new_password: "" });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title:
          error.response?.data?.error || "Something went wrong. Try again!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

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
