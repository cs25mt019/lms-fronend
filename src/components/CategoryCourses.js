import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/";
const siteURL = "http://localhost:8000/";

function CategoryCourses() {
  const [courses, setCourses] = useState([]);
  const { category_slug } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}course/?category=${category_slug}`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching category courses:", error));
  }, [category_slug]);

  return (
    <div className="container mt-4">
      <h3 className="pb-1 mb-4 text-capitalize">{category_slug} Courses</h3>

      <div className="row mb-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="col-md-3 mb-3">
              <div className="card h-100">
                <img
                    src={`${course.featured_image}`}
                    className="card-img-top"
                    alt={course.title}
                  />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>

                  <Link to={`/detail/${course.id}`} className="btn btn-primary mt-auto">
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No courses found in this category.</p>
        )}
      </div>

      {/* Static pagination placeholder */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <button className="page-link" tabIndex="-1" disabled>
              Previous
            </button>
          </li>
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CategoryCourses;
