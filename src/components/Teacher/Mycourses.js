import { Link } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";

function Teachermycourses() {
  const [courses, setCourses] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get(`http://127.0.0.1:8000/api/teacher-course/${teacherId}/`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/course/${courseId}/`)
        .then((response) => {
          alert("Course deleted successfully!");
          // remove deleted course from state
          setCourses(courses.filter((course) => course.id !== courseId));
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          alert("Failed to delete course.");
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
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Enrolled</th>
                    <th>Rating</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr className="px-2 py-2" key={index}>
                        <td>
                          <Link to={`/course-chapters/${course.id}`}>
                            {course.title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/enrolled-students/${course.id}`}
                            className="btn btn-sm btn-info ms-2"
                          >
                            {course.total_enrolled_students}
                          </Link>
                        </td>
                        <td>⭐ {course.average_rating}</td>
                        <td>
                          <img
                            src={course.featured_image}
                            alt={course.title}
                            width="100"
                          />
                        </td>
                        <td>
                          <Link
                            to={`/edit-course/${course.id}`}
                            className="btn btn-sm btn-success mx-2"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/add-chapter/${course.id}`}
                            className="btn btn-sm btn-primary mx-2"
                          >
                            Add Chapters
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="btn btn-sm btn-danger mx-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No courses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Teachermycourses;
