import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../utils/api";

const baseURL = "http://127.0.0.1:8000/api/";

function CourseDetail() {
  const { course_id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [techList, setTechList] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const [enrolled, setEnrolled] = useState(false);

  // Favorite system
  const [isFavorite, setIsFavorite] = useState(false);

  // Ratings
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const student = JSON.parse(localStorage.getItem("student") || "{}");

  /* -----------------------------------------
      HANDLE SESSION EXPIRED 
    ----------------------------------------- */
  const handleSessionExpired = () => {
    Swal.fire("Session Expired", "Please log in again.", "warning");
    localStorage.clear();
    window.location.href = "/user-login";
  };

  /* -----------------------------------------
      LOAD COURSE DETAILS 
    ----------------------------------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Course Data
        const res = await api.get(`course/${course_id}/`);
        setCourseData(res.data);
        setTechList(res.data.tech_list || []);

        // 2. Chapters
        const chapterRes = await api.get(`course-chapters/${course_id}/`);
        setChapters(chapterRes.data || []);

        // 3. Enrollment check
        if (student.id) {
          try {
            const enrollCheck = await api.get(
              `check-enrollment/?student=${student.id}&course=${course_id}`
            );
            setEnrolled(enrollCheck.data.enrolled);
          } catch (err) {
            if (err.response?.status === 401) handleSessionExpired();
          }
        }

        // 4. Favorite check 
        if (student.id) {
          try {
            const favRes = await api.get(
              `check-favorite/?student=${student.id}&course=${course_id}`
            );
            setIsFavorite(favRes.data.is_favorite);
          } catch (err) {
            console.log("Fav check error:", err);
          }
        }

        // 5. Average Rating
        const ratingRes = await api.get(`course-rating/${course_id}/`);
        setAvgRating(ratingRes.data.average_rating || 0);

        // 6. Reviews
        const reviewRes = await api.get(`course-reviews/${course_id}/`);
        setReviews(reviewRes.data || []);
      } catch (err) {
        console.error("Course load error:", err);
      }
    };

    loadData();
  }, [course_id]);

  if (!courseData)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-3">Loading course details...</p>
      </div>
    );

  /* -----------------------------------------
      ENROLL COURSE
    ----------------------------------------- */
  const enrollCourse = async () => {
    if (!student.id) {
      Swal.fire("Login Required", "Please login first!", "warning").then(() => {
        window.location.href = "/user-login";
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("student", student.id);
      formData.append("course", course_id);

      await api.post("student-enroll-course/", formData);

      Swal.fire("Enrolled Successfully!", "", "success");
      setEnrolled(true);
    } catch (err) {
      if (err.response?.status === 401) handleSessionExpired();
      else Swal.fire("Enrollment failed", "", "error");
    }
  };

  /* -----------------------------------------
      ADD TO FAVORITE 
    ----------------------------------------- */
  const addToFavorite = async () => {
    if (!student.id) {
      Swal.fire("Login Required", "Please login to continue.", "warning");
      return;
    }

    try {
      await api.post("add-favorite/", {
        student: student.id,
        course: course_id,
      });

      setIsFavorite(true);
      Swal.fire("Added to Favorites ", "", "success");
    } catch (err) {
      if (err.response?.status === 401) handleSessionExpired();
      else Swal.fire("Error", "Failed to add to favorites.", "error");
    }
  };

  /* -----------------------------------------
       REMOVE FAVORITE 
    ----------------------------------------- */
  const removeFromFavorite = async () => {
    if (!student.id) {
      Swal.fire("Login Required", "Please login to continue.", "warning");
      return;
    }

    try {
      await api.delete(
        `remove-favorite/?student=${student.id}&course=${course_id}`
      );

      setIsFavorite(false);
      Swal.fire("Removed from Favorites ", "", "success");
    } catch (err) {
      if (err.response?.status === 401) handleSessionExpired();
      else Swal.fire("Error", "Failed to remove favorite.", "error");
    }
  };

  /* -----------------------------------------
      SUBMIT RATING + REVIEW 
    ----------------------------------------- */
  const submitRating = async () => {
    if (!student.id) {
      Swal.fire("Login first", "", "warning");
      return;
    }
    if (!enrolled) {
      Swal.fire("You must enroll first", "", "info");
      return;
    }

    try {
      await api.post("rate-course/", {
        student: student.id,
        course: course_id,
        rating,
        review,
      });

      Swal.fire("Review Submitted!", "", "success");

      const avg = await api.get(`course-rating/${course_id}/`);
      const reviewData = await api.get(`course-reviews/${course_id}/`);

      setAvgRating(avg.data.average_rating || 0);
      setReviews(reviewData.data);

      setReview("");
      setRating(0);
    } catch (err) {
      if (err.response?.status === 401) handleSessionExpired();
      else Swal.fire("Something went wrong", "", "error");
    }
  };

  /* -----------------------------------------
      DELETE REVIEW
    ----------------------------------------- */
  const deleteReview = async (id) => {
    try {
      await api.delete(`delete-review/${id}/`);

      Swal.fire("Review Deleted", "", "success");

      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      if (err.response?.status === 401) handleSessionExpired();
      else Swal.fire("Failed to delete review", "", "error");
    }
  };

  /* -----------------------------------------
      UI SECTION
    ----------------------------------------- */

  return (
    <div className="container mt-3">
      {/* ---------- Course Header ---------- */}
      <div className="row">
        <div className="col-md-4">
          <img
            src={courseData.featured_image || "/logo512.png"}
            className="img-thumbnail"
            alt="course"
          />
        </div>

        <div className="col-md-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>

          <p>
            <b>Instructor:</b>{" "}
            <Link to={`/teacher-detail/${courseData.Teacher?.id}`}>
              {courseData.Teacher?.full_name}
            </Link>
          </p>

          <p>
            <b>Technologies:</b>{" "}
            {techList.map((t, i) => (
              <Link
                key={i}
                to={`/category/${t.trim()}`}
                className="badge bg-secondary me-2"
              >
                {t.trim()}
              </Link>
            ))}
          </p>

         
          <p>
            <b>Enrolled:</b> {courseData.total_enrolled_students}
          </p>
          <p>
            <b>Rating:</b> ⭐ {avgRating.toFixed(1)}
          </p>

          {/* Enroll Button */}
          {enrolled ? (
            <button className="btn btn-secondary" disabled>
              Enrolled
            </button>
          ) : (
            <button onClick={enrollCourse} className="btn btn-success">
              Enroll Now
            </button>
          )}

          {/* Favorite Button */}
          {student?.id && (
            <button
              className={`btn ms-2 ${
                isFavorite ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={isFavorite ? removeFromFavorite : addToFavorite}
            >
              {isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          )}

          {/* Rating UI */}
          <div className="mt-3 border p-3 rounded">
            <h6>Rate this Course:</h6>
            <div style={{ fontSize: "24px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "gray",
                  }}
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
          {chapters.length ? (
            chapters.map((chapter) => (
              <li className="list-group-item" key={chapter.id}>
                {chapter.title}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">
              No chapters available.
            </li>
          )}
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
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteReview(r.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
