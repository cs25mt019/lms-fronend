import { useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../utils/api";
import Swal from "sweetalert2";

function Changepassword() {
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  const [formData, setFormData] = useState({
    email: student?.email || "",
    old_password: "",
    new_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`student-change-password/${studentId}/`, {
    old_password: formData.old_password,
    new_password: formData.new_password,
});


      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({
        ...formData,
        old_password: "",
        new_password: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.error || "Failed to change password",
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Change Password</h5>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Email (readonly) */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    readOnly
                  />
                </div>

                {/* Old Password */}
                <div className="mb-3">
                  <label className="form-label">Old Password</label>
                  <input
                    type="password"
                    name="old_password"
                    className="form-control"
                    value={formData.old_password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    className="form-control"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Changepassword;
