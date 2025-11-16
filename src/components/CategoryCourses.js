import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/api/";
const BACKEND_URL = "http://127.0.0.1:8000";

function CategoryCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category_slug } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API_URL}course/?category=${category_slug}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category courses:", err);
        setLoading(false);
      });
  }, [category_slug]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4 text-capitalize">
        {category_slug} Courses
      </h3>

      <div className="row mb-4">
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
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={
                    course.featured_image
                      ? BACKEND_URL + course.featured_image
                      : "https://via.placeholder.com/300x200"
                  }
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "170px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ minHeight: "50px" }}>
                    {course.title.length > 40
                      ? course.title.substring(0, 40) + "..."
                      : course.title}
                  </h5>

                  <p className="card-text text-muted" style={{ fontSize: "14px" }}>
                    {course.description.length > 70
                      ? course.description.substring(0, 70) + "..."
                      : course.description}
                  </p>

                  <Link
                    to={`/detail/${course.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="text-muted">No courses found in this category.</p>
        )}
      </div>

      {/* Pagination placeholder */}
     
    </div>
  );
}

export default CategoryCourses;
