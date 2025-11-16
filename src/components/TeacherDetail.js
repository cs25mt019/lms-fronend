import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/teacher/";
const BACKEND = "http://127.0.0.1:8000";

function TeacherDetails() {
  const [teacherData, setTeacherData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const { teacher_id } = useParams();

useEffect(() => {
  axios
    .get(`${API}${teacher_id}/`)
    .then((response) => {
      const data = response.data;

      setTeacherData({
        ...data,
        total_courses: data.teacher_courses ? data.teacher_courses.length : 0
      });

      setCourses(data.teacher_courses || []);
      setSkillList(data.skill_list || []);
    })
    .catch((error) => {
      console.error("Error fetching teacher data:", error);
    });
}, [teacher_id]);


  if (!teacherData) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading teacher details...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="row">

        {/* ================= TEACHER IMAGE ================= */}
        <div className="col-md-4 mb-3">
          <img
            src={
              teacherData.profile_image
                ?  teacherData.profile_image
                : "https://via.placeholder.com/400x400?text=No+Image"
            }
            className="img-thumbnail shadow-sm"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            alt={teacherData.full_name}
          />
        </div>

        {/* ================= TEACHER INFO ================= */}
        <div className="col-md-8">
          <h3 className="fw-bold">{teacherData.full_name}</h3>
          <p className="text-muted">{teacherData.details}</p>

          {/* Skills */}
          <p className="fw-bold">
            Skills:
            <br />
            {skillList.map((skill, idx) => (
              <span key={idx} className="badge bg-secondary me-2 fs-6">
                {/* <Link
                  to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                  className="text-white text-decoration-none"
                > */}
                  {skill.trim()}
                {/* </Link> */}
              </span>
            ))}
          </p>

          <p className="mt-3 fs-5 fw-bold">
            ⭐ Rating: {teacherData.teacher_rating}/5
          </p>

          <p className="fs-6 text-muted">
            Total Courses: {teacherData.total_courses}
          </p>
        </div>
      </div>

      {/* ================= COURSE LIST ================= */}
      <div className="card mt-4 shadow-sm">
        <h5 className="card-header fw-bold">Course List</h5>
        <ul className="list-group list-group-flush">
          {courses.map((course) => (
            <Link
              to={`/detail/${course.id}`}
              key={course.id}
              className="list-group-item list-group-item-action"
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
