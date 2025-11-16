import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../utils/api";
import Swal from "sweetalert2";

function Profilesetting() {
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    interested_categories: "",
  });

  // Load student profile
  useEffect(() => {
    api
      .get(`student/${studentId}/`)
      .then((res) => {
        setFormData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          interested_categories: res.data.interested_categories || "",
        });
      })
      .catch(() => Swal.fire("Error", "Failed to load profile.", "error"));
  }, [studentId]);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`student/${studentId}/`, formData);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1200,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
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
            <h5 className="card-header">Profile Settings</h5>

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email (read-only) */}
                <div className="mb-3">
                  <label className="form-label">Email (cannot be changed)</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    disabled
                    readOnly
                  />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Interests */}
                <div className="mb-3">
                  <label className="form-label">Interests / Categories</label>
                  <textarea
                    className="form-control"
                    name="interested_categories"
                    value={formData.interested_categories}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>

              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Profilesetting;
