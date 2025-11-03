import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { Routes as Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function AddChapter() {
    const [chapterData, setChapterData] = useState({
        "title": '',
        "description": '',
        "video": "",
        "remarks": ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { course_id } = useParams();

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const chapterFormData = new FormData();
        
        chapterFormData.append("course", course_id);
        chapterFormData.append("title", chapterData.title);
        chapterFormData.append("description", chapterData.description);
        
        // Only append video if a file was selected
        if (chapterData.video) {
            chapterFormData.append("video", chapterData.video, chapterData.video.name);
        }
        
        chapterFormData.append("remarks", chapterData.remarks);

        try {
            const response = await axios.post(baseUrl + "/chapter/", chapterFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            
            setSuccess('Chapter added successfully!');
            // Optional: Reset form
            setChapterData({
                "title": '',
                "description": '',
                "video": "",
                "remarks": ''
            });
            
            // Redirect after success
            setTimeout(() => {
                window.location.href = "/teacher-mycourses";
            }, 2000);
            
        } catch (error) {
            console.log(error);
            setError('Failed to add chapter. Please try again.');
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
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            {/* Success and Error Messages */}
                            {success && (
                                <div className="alert alert-success">{success}</div>
                            )}
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}
                            
                            
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input 
                                        type="text" 
                                        onChange={handleChange} 
                                        name="title" 
                                        className="form-control" 
                                        id="title"
                                        value={chapterData.title}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        onChange={handleChange} 
                                        name="description"
                                        value={chapterData.description}
                                        rows="4"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Video</label>
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange} 
                                        name="video" 
                                        id="video" 
                                        className="form-control"
                                        accept="video/*"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarks" className="form-label">Remarks</label>
                                    <textarea 
                                        className="form-control" 
                                        onChange={handleChange} 
                                        name="remarks"
                                        value={chapterData.remarks}
                                        rows="3"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Adding...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddChapter;