import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:8000/api/course/";
const siteURL = "http://localhost:8000/";

function CourseDetail() {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [techList, setTechList] = useState([]);
  const [enrolled, setEnrolled] = useState(false);

  // Rating States
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${baseURL}${course_id}/`);
       // console.log(res.data);
        setCourseData(res.data);
        setChapters(res.data.course_chapters || []);
        setTechList(res.data.tech_list || []);

        const related =
          typeof res.data.related_videos === "string"
            ? JSON.parse(res.data.related_videos)
            : res.data.related_videos;
        setRelatedCourses(related || []);

        if (student) {
          const isEnrolled = await axios.get(
            `http://localhost:8000/api/check-enrollment/?student=${student.id}&course=${course_id}`
          );
          if (isEnrolled.data.enrolled) setEnrolled(true);
        }

        const avg = await axios.get(
          `http://localhost:8000/api/course-rating/${course_id}/`
        );
        setAvgRating(avg.data.average_rating || 0);

        const reviewData = await axios.get(
          `http://localhost:8000/api/course-reviews/${course_id}/`
        );
        setReviews(reviewData.data);

      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [course_id]);

  if (!courseData) return <div>Loading...</div>;

  const enrollCourse = async () => {
    if (!student) {
      Swal.fire("Login Required", "Please login first!", "warning").then(() => {
        window.location.href = "/user-login";
      });
      return;
    }

    const check = await axios.get(
      `http://localhost:8000/api/check-enrollment/?student=${student.id}&course=${course_id}`
    );

    if (check.data.enrolled) {
      Swal.fire("Already Enrolled!", "", "info");
      return;
    }

    const formData = new FormData();
    formData.append("student", student.id);
    formData.append("course", course_id);

    const res = await axios.post(
      `http://localhost:8000/api/student-enroll-course/`,
      formData
    );

    if (res.status === 201) {
      Swal.fire("Enrolled Successfully!", "", "success");
      setEnrolled(true);
    }
  };

  // Submit or Update Rating
  const submitRating = async () => {
    if (!student) {
      Swal.fire("Login first", "", "warning");
      return;
    }
    if (!enrolled) {
      Swal.fire("You must enroll first", "", "info");
      return;
    }

    await axios.post("http://localhost:8000/api/rate-course/", {
      student: student.id,
      course: course_id,
      rating,
      review,
    });

    Swal.fire("Review Submitted!", "", "success");

    const avg = await axios.get(`http://localhost:8000/api/course-rating/${course_id}/`);
    setAvgRating(avg.data.average_rating || 0);

    const reviewData = await axios.get(
      `http://localhost:8000/api/course-reviews/${course_id}/`
    );
    setReviews(reviewData.data);
  };

  // Delete Review
  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:8000/api/delete-review/${id}/`);
    Swal.fire("Review Deleted", "", "success");
    setReviews(reviews.filter((x) => x.id !== id));
  };

  return (
    <div className="container mt-3">
      {/* ---------- Course Header ---------- */}
      <div className="row">
        <div className="col-4">
          <img src={courseData.featured_image} className="img-thumbnail" alt="course" />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>

          <p><b>Instructor:</b>{" "}
            <Link to={`/teacher-detail/${courseData.Teacher?.id}`}>
              {courseData.Teacher?.full_name}
            </Link>
          </p>

          <p><b>Technologies:</b>{" "}
            {techList.map((t, i) => (
              <Link key={i} to={`/category/${t.trim()}`} className="badge bg-secondary me-2">
                {t.trim()}
              </Link>
            ))}
          </p>

          <p><b>Duration:</b> {courseData.duration}</p>
          <p><b>Enrolled:</b> {courseData.total_enrolled_students}</p>

          <p><b>Rating:</b> ⭐ {avgRating.toFixed(1)}</p>

          {enrolled ? (
            <button className="btn btn-secondary" disabled>Enrolled</button>
          ) : (
            <button onClick={enrollCourse} className="btn btn-success">
              Enroll Now
            </button>
          )}

          {/* Rating UI */}
          <div className="mt-3 border p-3 rounded">
            <h6>Rate this Course:</h6>
            <div style={{ fontSize: "24px" }}>
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              className="form-control mt-2 mb-2"
              placeholder="Write a review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button className="btn btn-warning" onClick={submitRating}>
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Chapters ---------- */}
      <div className="card mt-4">
        <h5 className="card-header">Course Content</h5>
        <ul className="list-group list-group-flush">
          {chapters.map((chapter) => (
            <li className="list-group-item" key={chapter.id}>
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Reviews ---------- */}
      <div className="mt-4">
        <h4>Student Reviews</h4>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="border p-2 rounded mb-2">
            <b>{r.student_name}</b> — {"⭐".repeat(r.rating)} ({r.rating}/5)
            <p>{r.review}</p>

            {student && student.id === r.student && (
              <button className="btn btn-sm btn-danger" onClick={() => deleteReview(r.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ---------- Related Courses ---------- */}
      <h4 className="mt-4">Related Courses</h4>
      <div className="row">
        {relatedCourses.length > 0 ? relatedCourses.map((course) => (
          <div key={course.pk} className="col-md-3 mb-3">
            <div className="card">
              <Link to={`/detail/${course.pk}`}>
                <img
                  src={`${siteURL}media/${course.fields.featured_image}`}
                  className="card-img-top"
                  alt={course.fields.title}
                />
              </Link>
              <div className="card-body">
                <h5>{course.fields.title}</h5>
                <Link to={`/detail/${course.pk}`} className="btn btn-primary">
                  View Course
                </Link>
              </div>
            </div>
          </div>
        )) : <p>No related courses found.</p>}
      </div>
    </div>
  );
}

export default CourseDetail;
