import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";
const videoBaseUrl = "http://127.0.0.1:8000";

function StudentCourseDetail() {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}student-course-detail/${course_id}/`)
      .then((response) => {
        setCourse(response.data.course);
        setChapters(response.data.chapters);

        // Auto-select the first chapter
        if (response.data.chapters.length > 0) {
          setSelectedChapter(response.data.chapters[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setError("Failed to load course details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [course_id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">{course?.title}</h4>
        <Link to="/user-dashboard" className="btn btn-outline-secondary">
          ← Go Back
        </Link>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              Chapters ({chapters.length})
            </div>
            <ul className="list-group list-group-flush">
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <li
                    key={chapter.id}
                    className={`list-group-item ${
                      selectedChapter?.id === chapter.id ? "active" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedChapter?.id === chapter.id ? "#007bff" : "",
                      color:
                        selectedChapter?.id === chapter.id ? "white" : "inherit",
                    }}
                    onClick={() => setSelectedChapter(chapter)}
                  >
                    {chapter.title}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">
                  No chapters available yet.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          {selectedChapter ? (
              <div className="card-body">
                <h5>{selectedChapter.title}</h5>
                <div className="ratio ratio-16x9 mb-3">
                  <iframe
                    src={videoBaseUrl+selectedChapter.video}
                    title={selectedChapter.title}
                    allowFullScreen
                  ></iframe>
                </div>
                <p>{selectedChapter.description}</p>
                <p className="text-muted">
                  <b>Remarks:</b> {selectedChapter.remarks || "No remarks"}
                </p>
              </div>
          ) : (
            <p className="text-muted mt-3 text-center">
              Select a chapter to start watching.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCourseDetail;
