import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://127.0.0.1:8000/api";
const BACKEND = "http://127.0.0.1:8000";

function PopularTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/teacher/`)
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => b.teacher_rating - a.teacher_rating)
          .slice(0, 8); // top 8

        setTeachers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teachers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h3>Loading teachers...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4 fw-bold">🔥 Popular Teachers</h3>

      <div className="row mb-4">
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <motion.div
              className="col-md-3 col-sm-6 mb-4"
              key={teacher.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="card h-100 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180 }}
              >
                {/* Teacher Image */}
                <img
                  src={
                    teacher.profile_image
                      ?teacher.profile_image
                      : ""
                  }
                  className="card-img-top"
                  alt={teacher.full_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{teacher.full_name}</h5>

                  <p className="text-muted mb-2">
                    ⭐ {teacher.teacher_rating}/5 <br />
                    📚 {teacher.total_courses} courses
                  </p>

                  <p className="small text-muted">
                    {teacher.skills ? teacher.skills.substring(0, 40) + "..." : ""}
                  </p>

                  <Link
                    to={`/teacher-detail/${teacher.id}`}
                    className="btn btn-primary w-100 mt-2"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="text-muted">No teachers available.</p>
        )}
      </div>
    </div>
  );
}

export default PopularTeachers;
