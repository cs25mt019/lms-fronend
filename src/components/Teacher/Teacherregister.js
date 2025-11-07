import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/teacher/";

function Teacherregister() {
    const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    profile_image: null,
    status: ""
});

// handle text fields
const handleChange = (event) => {
    setTeacherData({
        ...teacherData,
        [event.target.name]: event.target.value
    });
};

// handle file input
const handleFileChange = (event) => {
    setTeacherData({
        ...teacherData,
        profile_image: event.target.files[0]
    });
};

// Submit form
const submitForm = (event) => {
    event.preventDefault();
    
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    
    if (teacherData.profile_image) {
        teacherFormData.append("profile_image", teacherData.profile_image);
    }

    axios.post(baseUrl, teacherFormData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    .then((response) => {
        setTeacherData({
            full_name: "",
            email: "",
            password: "",
            qualification: "",
            mobile_no: "",
            skills: "",
            profile_image: null,
            status: "success"
        });
    })
    .catch((error) => {
        console.log(error);
        setTeacherData({ ...teacherData, status: "error" });
    });
};

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
        window.Location.href="/teacher-dashboard"
    }
    useEffect(() => {
        document.title = "Teacher Registration";
    }, []); // Added empty dependency array to run only once

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status == "success" && <p className="text-success">Thanks for the registration</p>}
                    {teacherData.status == "error" && <p className="text-danger">Something went wrong</p>}
                    <div className="card">
                        <h5 className="card-header">Teacher Register</h5>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} type="text" name="full_name" className="form-control" id="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input value={teacherData.email} onChange={handleChange} type="email" name="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Profile Picture</label>
                                    <input onChange={handleFileChange} type="file" name="profile_image" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input value={teacherData.password} onChange={handleChange} type="password" name="password" className="form-control" id="password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">Qualification</label>
                                    <input value={teacherData.qualification} onChange={handleChange} type="text" name="qualification" className="form-control" id="qualification" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} type="text" name="mobile_no" className="form-control" id="mobile_no" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">Skills</label>
                                    <textarea value={teacherData.skills} name="skills" onChange={handleChange} className="form-control" required></textarea>
                                    <div id="help" className="form-text">Webdev, dataScience, Python</div>
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teacherregister;