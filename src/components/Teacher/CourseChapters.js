import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Teachersidebar from "./Teachersidebar";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'; // Correct import

const baseUrl = "http://127.0.0.1:8000/api/course-chapters/";

function CourseChapters() {
    const [chapterData, setChapterData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { course_id } = useParams();
    console.log("Course ID:", course_id);

    useEffect(() => {
        fetchChapters();
    }, [course_id]); 

    const fetchChapters = async () => {
        try {
            const res = await axios.get(`${baseUrl}${course_id}`);
            console.log("Chapters data:", res.data);
            setChapterData(res.data);
            setTotalResult(res.data.length);
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load chapters',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleDeleteClick = (chapterId, chapterTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Once deleted, you will not be able to recover chapter: ${chapterTitle}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/chapter/${chapterId}/`);
                    
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your chapter has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    
                    // Refresh the chapter list
                    fetchChapters();
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete chapter',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };

    // Function to get video URL
    const getVideoUrl = (video) => {
        if (!video) return '';
        if (typeof video === 'string') return video;
        if (video.url) return video.url;
        return '';
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Teachersidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Chapters ({totalResult})</h5>
                        <div className="card-body">
                            {chapterData.length === 0 ? (
                                <div className="alert alert-info">
                                    No chapters found. <Link to={`/add-chapter/${course_id}`}>Add your first chapter</Link>
                                </div>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Video</th>
                                            <th>Remarks</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chapterData.map((chapter, index) => (
                                            <tr key={chapter.id || index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link to={`/edit-chapter/${chapter.id}`}>
                                                        {chapter.title}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {getVideoUrl(chapter.video) ? (
                                                        <video 
                                                            width="200" 
                                                            height="120" 
                                                            controls
                                                            style={{ maxWidth: '100%', height: 'auto' }}
                                                        >
                                                            <source src={getVideoUrl(chapter.video)} type="video/mp4" />
                                                            <source src={getVideoUrl(chapter.video)} type="video/ogg" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <span className="text-muted">No video</span>
                                                    )}
                                                </td>
                                                <td>{chapter.remarks || 'No remarks'}</td>
                                                <td>
                                                    <Link 
                                                        to={`/edit-chapter/${chapter.id}`} 
                                                        className="btn btn-sm btn-info mx-1 mb-1"
                                                    >
                                                        Edit
                                                    </Link>   
                                                    <button 
                                                        onClick={() => handleDeleteClick(chapter.id, chapter.title)} 
                                                        className="btn btn-sm btn-danger mx-1 mb-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            
                            {/* Add Chapter Button */}
                            <div className="mt-3">
                                <Link 
                                    to={`/add-chapter/${course_id}`} 
                                    className="btn btn-success"
                                >
                                    + Add New Chapter
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CourseChapters;