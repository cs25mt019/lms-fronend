import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/";

function TeacherSkillCourses() {
  const { skill_name, teacher_id } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
        axios.get(`${baseURL}course/?skill=${skill_name}&teacher=${teacher_id}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, [skill_name, teacher_id]);

  return (
    <div className="container mt-3">
      <h3>
        Courses for skill: <span className="text-primary">{skill_name}</span>
      </h3>

      <div className="row mt-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="col-md-4 mb-3" key={course.id}>
              <div className="card">
                <img
                    src={course.featured_image ? course.featured_image : "/logo512.png"}
                    className="card-img-top"
                    alt={course.title}
                    />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <Link to={`/detail/${course.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found for this skill.</p>
        )}
      </div>
    </div>
  );
}

export default TeacherSkillCourses;
