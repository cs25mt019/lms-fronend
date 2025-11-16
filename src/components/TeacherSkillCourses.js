import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://127.0.0.1:8000/api/";
const BACKEND = "http://127.0.0.1:8000";

function TeacherSkillCourses() {
  const { skill_name, teacher_id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!skill_name) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${API}course/?skill=${encodeURIComponent(skill_name)}&teacher=${teacher_id}`)
      .then((response) => {
        setCourses(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Something went wrong. Try again.");
        setLoading(false);
      });
  }, [skill_name, teacher_id]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h4>Loading courses...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h3 className="mb-3">
        Courses for skill: <span className="text-primary text-capitalize">{skill_name}</span>
      </h3>

      {/* ===================== Empty State Illustration ===================== */}
      {courses.length === 0 && (
        <div className="text-center mt-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="No courses illustration"
            width="170"
            className="mb-3 opacity-75"
          />
          <h5 className="text-muted">No courses found for this skill</h5>
          <p className="text-secondary">Try checking another skill or explore all courses.</p>

          <Link to="/all-courses" className="btn btn-primary mt-2 px-4">
            Browse All Courses
          </Link>
        </div>
      )}

      {/* ===================== Responsive Grid ===================== */}
      <div className="row">
        {courses.map((course, i) => (
          <motion.div
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            key={course.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={
                  course.featured_image
                    ? BACKEND + course.featured_image
                    : "https://via.placeholder.com/400x250?text=No+Image"
                }
                className="card-img-top"
                alt={course.title}
                style={{ height: "190px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ minHeight: "48px" }}>
                  {course.title?.length > 60
                    ? course.title.substring(0, 57) + "..."
                    : course.title}
                </h5>

                {course.description && (
                  <p className="text-muted" style={{ fontSize: 14 }}>
                    {course.description.length > 100
                      ? course.description.substring(0, 97) + "..."
                      : course.description}
                  </p>
                )}

                <div className="mt-auto">
                  <Link to={`/detail/${course.id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TeacherSkillCourses;
