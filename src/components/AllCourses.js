import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000/";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/course/`)
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });

    axios
      .get(`${API_URL}/category/`) // Adjust based on your API endpoint
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // FILTER COURSES
  const handleCategoryFilter = (cat) => {
    setSelectedCategory(cat);

    if (cat === "all") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) => course.category?.title === cat
      );
      setFilteredCourses(filtered);
    }
  };

  // SORT COURSES
  const handleSort = (option) => {
    setSortOption(option);

    let sorted = [...filteredCourses];

    if (option === "title-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (option === "title-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    if (option === "newest") {
      sorted.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
    }

    setFilteredCourses(sorted);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h3>Loading courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h3 className="pb-1 mb-4">All Courses</h3>

      {/* ===================== FILTER + SORT BAR ===================== */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
        
        {/* Category Filter */}
        <div>
          <label className="fw-bold me-2">Category:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="fw-bold me-2">Sort:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="title-asc">Title (A → Z)</option>
            <option value="title-desc">Title (Z → A)</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* ===================== COURSE GRID ===================== */}
      <div className="row mb-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            className="col-md-3 col-sm-6 col-lg-3 mb-4"
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
                    ? course.featured_image
                    : "https://via.placeholder.com/300x200"
                }
                className="card-img-top"
                alt={course.title}
                style={{ height: "170px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title" style={{ minHeight: "50px" }}>
                  {course.title.length > 40
                    ? course.title.substring(0, 40) + "..."
                    : course.title}
                </h5>

                <Link
                  to={`/detail/${course.id}`}
                  className="btn btn-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default AllCourses;
