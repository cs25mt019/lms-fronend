import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import { Routes as Switch, Route } from 'react-router-dom';
import axios from "axios";

function Addcourse() {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [teacherId, setTeacherId] = useState('');
    
    const [courseData, setCourseData] = useState({
        "category": '',
        "title": '',
        "description": '',
        "featured_image": null,
        "techs": ''
    });

    useEffect(() => {
        // Get teacher ID (adjust based on your auth system)
        const storedTeacherId = localStorage.getItem('teacherId');
        console.log('Teacher ID:', storedTeacherId);
        setTeacherId(storedTeacherId);
        
        // Load categories
        axios.get("http://127.0.0.1:8000/api/category/").then((response) => {
            setCats(response.data);
        }).catch(error => {
            console.log(error);
            setError('Failed to load categories');
        });
    }, []);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }

    const submitForm = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const courseFormData = new FormData();
        
        // FIX: Use "Teacher" with capital T to match serializer
        courseFormData.append("Teacher", teacherId);
        courseFormData.append("category", courseData.category);
        courseFormData.append("title", courseData.title);
        courseFormData.append("description", courseData.description);
        courseFormData.append("techs", courseData.techs);
        
        if (courseData.featured_image) {
            courseFormData.append("featured_image", courseData.featured_image, courseData.featured_image.name);
        }

        // Debug: log FormData
        for (let [key, value] of courseFormData.entries()) {
            console.log(key, value);
        }

        try {
            axios.post("http://127.0.0.1:8000/api/course/", courseFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response) => {
                setSuccess('Course added successfully!');
                setCourseData({
                    "category": '',
                    "title": '',
                    "description": '',
                    "featured_image": null,
                    "techs": ''
                });
                setTimeout(() => {
                    window.location.href = "/teacher-mycourses";
                }, 2000);
            }).catch(error => {
                console.log('Error response:', error.response);
                if (error.response && error.response.data) {
                    setError(`Error: ${JSON.stringify(error.response.data)}`);
                } else {
                    setError('Failed to add course. Please try again.');
                }
            });
        } catch (error) {
            console.log('Network error:', error);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Teachersidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select 
                                        name="category" 
                                        onChange={handleChange} 
                                        value={courseData.category}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {cats.map((category, index) =>
                                            <option key={index} value={category.id}>{category.title}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        onChange={handleChange} 
                                        value={courseData.title}
                                        className="form-control" 
                                        id="title"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        onChange={handleChange}
                                        value={courseData.description}
                                        rows="4"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="featured_image" className="form-label">Featured Image</label>
                                    <input 
                                        type="file" 
                                        id="featured_image" 
                                        onChange={handleFileChange} 
                                        name="featured_image" 
                                        className="form-control"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Technologies used</label>
                                    <textarea 
                                        className="form-control" 
                                        onChange={handleChange} 
                                        name="techs"
                                        value={courseData.techs}
                                        rows="3"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Adding Course...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Addcourse;