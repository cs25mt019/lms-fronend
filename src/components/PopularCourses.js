import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/api/";
const BACKEND = "http://127.0.0.1:8000";

function Popularcourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}home/`)
      .then((res) => {
        setCourses(res.data.popular_courses || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching popular courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading popular courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="pb-3 mb-4 fw-bold"> Popular Courses</h3>

      <div className="row">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div
              className="col-md-3 col-sm-6 mb-4"
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="card h-100 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180 }}
              >
                {/* Course Thumbnail */}
                <img
                  src={
                    course.featured_image
                      ? BACKEND + course.featured_image
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "170px", objectFit: "cover" }}
                />

                <div className="card-body">
                  {/* Course Title */}
                  <h5 className="card-title" style={{ minHeight: "50px" }}>
                    {course.title.length > 40
                      ? course.title.slice(0, 40) + "..."
                      : course.title}
                  </h5>

                  {/* Teacher */}
                  <p className="text-muted mb-1">
                    {course.Teacher.full_name}
                  </p>

                  {/* Rating + Enrollments */}
                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-semibold">
                    {course.average_rating}/5
                    </span>

                    <span className="text-muted small">
                      👥 {course.total_enrolled_students} students
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/detail/${course.id}`}
                    className="btn btn-primary w-100 mt-3"
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="text-muted">No popular courses available.</p>
        )}
      </div>
    </div>
  );
}

export default Popularcourses;
