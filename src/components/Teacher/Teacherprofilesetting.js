import { useState, useEffect } from "react";
import axios from "axios";
import Teachersidebar from "./Teachersidebar";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/teacher/";

function Teacherprofilesetting() {
  const teacherId = localStorage.getItem("teacherId");

  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    profile_image: "",
    new_image: null,
  });

  // Fetch teacher data
  useEffect(() => {
    axios
      .get(`${baseUrl}${teacherId}/`)
      .then((response) => {
        setTeacherData(response.data);
      })
      .catch((error) => console.error(error));
  }, [teacherId]);

  // handle text input
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  // handle file input
  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      new_image: event.target.files[0],
    });
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("full_name", teacherData.full_name);
    formData.append("email", teacherData.email);
    formData.append("qualification", teacherData.qualification);
    formData.append("mobile_no", teacherData.mobile_no);
    formData.append("skills", teacherData.skills);

    if (teacherData.new_image) {
      formData.append("profile_image", teacherData.new_image);
    }

    axios
      .patch(`${baseUrl}${teacherId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Error updating profile!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="mb-3 text-center">
                  {teacherData.profile_image && (
                    <img
                      src={`${teacherData.profile_image}`}
                      alt="Profile"
                      width="120"
                      height="120"
                      className="rounded-circle mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="profile_image"
                    onChange={handleFileChange}
                    className="form-control mt-2"
                  />
                </div>

                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={teacherData.full_name || ""}
                    onChange={handleChange}
                    className="form-control"
                    id="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={teacherData.email || ""}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    required
                  />
                </div>

                {/* Qualification */}
                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={teacherData.qualification || ""}
                    onChange={handleChange}
                    className="form-control"
                    id="qualification"
                  />
                </div>

                {/* Mobile No */}
                <div className="mb-3">
                  <label htmlFor="mobile_no" className="form-label">
                    Mobile No
                  </label>
                  <input
                    type="text"
                    name="mobile_no"
                    value={teacherData.mobile_no || ""}
                    onChange={handleChange}
                    className="form-control"
                    id="mobile_no"
                  />
                </div>

                {/* Skills */}
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <textarea
                    name="skills"
                    value={teacherData.skills || ""}
                    onChange={handleChange}
                    className="form-control"
                    id="skills"
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

export default Teacherprofilesetting;
