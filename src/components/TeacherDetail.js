import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8000/api/teacher/";
const siteURL = "http://localhost:8000/";

function TeacherDetails() {
  const [teacherData, setTeacherData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const { teacher_id } = useParams();

  useEffect(() => {
    axios.get(`${baseURL}${teacher_id}/`)
      .then((response) => {
        setTeacherData(response.data);
        setCourses(response.data.teacher_courses || []);
        setSkillList(response.data.skill_list || []);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [teacher_id]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/logo512.png" className="img-thumbnail" alt="..." />
        </div>

        <div className="col-8">
          <h3>{teacherData?.full_name}</h3>
          <p>{teacherData?.details}</p>

          <p className="fw-bold">
            Skills:{" "}
            {skillList.map((skill, index) => (
              <span key={index} className="badge bg-secondary me-1">
                <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData?.id}`}>
                  {skill.trim()}
                </Link>
              </span>
            ))}
          </p>

          <p className="fw-bold">Recent Courses:</p>
          <p className="fw-bold">Rating: 4.5/5</p>
        </div>
      </div>

      <div className="card mt-4">
        <h5 className="card-header">Course List</h5>
        <ul className="list-group list-group-flush">
          {courses.map((course, index) => (
            <Link
              to={`/detail/${course.id}`}
              key={index}
              className="list-group-item"
            >
              {course.title}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeacherDetails;
