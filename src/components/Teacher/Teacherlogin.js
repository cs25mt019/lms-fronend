import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = 'http://127.0.0.1:8000/api';

function Teacherlogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = (event) => {
        event.preventDefault(); // Prevent form submission
        
        const teacherFormData = new FormData();
        teacherFormData.append('email', teacherLoginData.email);
        teacherFormData.append('password', teacherLoginData.password);
        
        axios.post(baseUrl + '/teacher-login', teacherFormData)
            .then((res) => {
                if (res.data.bool === true) {
                    localStorage.setItem('teacherLoginStatus', 'true');
                    localStorage.setItem('teacherId', res.data.teacher_id);
                    window.location.href = "/teacher-dashboard"; // lowercase 'l'
                } else {
                    setError('Invalid email or password');
                }
            })
            .catch((error) => {
                console.log(error);
                setError('Login failed. Please try again.');
            });
    }

    // Check login status on component mount
    useEffect(() => {
        document.title = "Teacher Login";
        
        const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
        if (teacherLoginStatus === 'true') {
            window.location.href = "/teacher-dashboard";
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        onChange={handleChange} 
                                        value={teacherLoginData.email} 
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        onChange={handleChange} 
                                        value={teacherLoginData.password} 
                                        className="form-control" 
                                        id="password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teacherlogin;