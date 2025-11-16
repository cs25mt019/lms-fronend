import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DiscussionForum from "../DiscussionForum";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/";
const videoBaseUrl = "http://127.0.0.1:8000";

function StudentCourseDetail() {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  // Load student ID
  const storedStudent = localStorage.getItem("student");
  const token = localStorage.getItem("access");

  let studentId = null;
  try {
    if (storedStudent) {
      studentId = JSON.parse(storedStudent).id;
    }
  } catch (err) {
    console.error("Error parsing student:", err);
  }

 // Load course whenever course_id changes
useEffect(() => {
  if (!studentId || !token) {
    Swal.fire({
      icon: "warning",
      title: "Not Logged In",
      text: "Please log in as a student to view this page.",
      confirmButtonText: "Go to Login",
    }).then(() => (window.location.href = "/student-login"));
    return;
  }

  fetchCourseDetails();
  fetchProgress();
  fetchAssignments();
  fetchQuizzes();
}, [course_id]);

// Load lecture notes whenever a chapter is selected
useEffect(() => {
  if (selectedChapter) {
    fetchLectureNotes();
  }
}, [selectedChapter]);


  // Fetch course + chapters
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}student-course-detail/${course_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourse(response.data.course);
      setChapters(response.data.chapters);

      if (response.data.chapters.length > 0) {
        setSelectedChapter(response.data.chapters[0]);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };
const [notes, setNotes] = useState([]);

const fetchLectureNotes = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}lecture-notes/?chapter=${selectedChapter.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setNotes(res.data);
  } catch (err) {
    console.error("Error fetching notes:", err);
  }
};

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}assignments/?course=${course_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssignments(res.data);
      fetchSubmissions();
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // Fetch submissions made by this student
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}submissions/?student=${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const map = {};
      res.data.forEach((sub) => {
        map[sub.assignment] = sub;
      });
      setSubmissions(map);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // Handle file upload change
  const handleFileChange = (assignmentId, file) => {
    setSelectedFiles({
      ...selectedFiles,
      [assignmentId]: file,
    });
  };

  // Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}quizzes/?course=${course_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Handle assignment submission
  const handleSubmit = async (assignmentId) => {
    const formData = new FormData();
    formData.append("assignment", assignmentId);
    formData.append("student", studentId);
    formData.append("submitted_file", selectedFiles[assignmentId]);

    try {
      Swal.fire({
        title: "Submitting...",
        text: "Please wait while your assignment uploads.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axios.post(`${baseUrl}submissions/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Assignment submitted successfully",
      });
      fetchSubmissions();
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit assignment. Please try again.",
      });
    }
  };

  // Edit submission
  const handleEditSubmit = async (assignmentId, submissionId) => {
    const formData = new FormData();
    formData.append("submitted_file", selectedFiles[assignmentId]);

    try {
      Swal.fire({
        title: "Updating...",
        text: "Uploading your new file...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axios.patch(
        `${baseUrl}submissions/${submissionId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your submission was updated successfully.",
      });
      fetchSubmissions();
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update submission. Please try again.",
      });
    }
  };

  // Fetch progress
  const fetchProgress = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}course-progress/${studentId}/${course_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgress(res.data.progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  // Mark chapter completed
  const markChapterCompleted = async (chapterId) => {
    try {
      await axios.post(
        `${baseUrl}chapter-progress/`,
        {
          student: studentId,
          chapter: chapterId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Chapter Completed!",
        text: "Your progress has been updated.",
      });
      fetchProgress();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update progress.",
      });
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">{course?.title}</h4>
        <Link to="/user-dashboard" className="btn btn-outline-secondary">
          ← Go Back
        </Link>
      </div>

      <div className="row">

        {/* Sidebar with chapters */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <small className="text-muted ms-3 mt-2">
              Your learning progress
            </small>

            <div
              className="progress my-2 mx-3"
              style={{ height: "20px", borderRadius: "4px" }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%`, transition: "0.5s" }}
              ></div>
            </div>
            <small className="text-muted ms-3">{progress.toFixed(0)}%</small>

            <div className="card-header bg-dark text-white">
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
                      background:
                        selectedChapter?.id === chapter.id ? "#5f6563" : "",
                      color:
                        selectedChapter?.id === chapter.id ? "white" : "black",
                    }}
                    onClick={() => setSelectedChapter(chapter)}
                  >
                    {chapter.title}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted text-center">
                  No chapters yet.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Video and Assignments */}
        <div className="col-md-8">

          {selectedChapter ? (
            <div className="card-body">
              <h5>{selectedChapter.title}</h5>

              <div className="ratio ratio-16x9 mb-3">
                <iframe
                  src={videoBaseUrl + selectedChapter.video}
                  title={selectedChapter.title}
                  allowFullScreen
                ></iframe>
              </div>

              <button
                className="btn btn-success btn-sm mb-2"
                onClick={() => markChapterCompleted(selectedChapter.id)}
              >
                Mark as Completed
              </button>

              <p>{selectedChapter.description}</p>
              <p className="text-muted">
                <b>Remarks:</b> {selectedChapter.remarks || "No remarks"}
              </p>
            </div>
          ) : (
            <p className="text-center text-muted mt-3">
              Select a chapter to start learning.
            </p>
          )}
{/* Lecture Notes */}
<div className="card mt-4 shadow-sm">
  <h5 className="card-header bg-light">Lecture Notes</h5>

  <div className="card-body">
    {notes.length === 0 ? (
      <p className="text-muted">No lecture notes available.</p>
    ) : (
      notes.map((note) => (
        <div key={note.id} className="border p-3 rounded mb-3">
          <h6>{note.title}</h6>

          {/* Description */}
          {note.description && (
            <p className="text-muted">{note.description}</p>
          )}

          {/* File Download */}
          {note.file && (
            <a
              href={note.file}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary mt-2"
            >
              View / Download File
            </a>
          )}

          {!note.file && !note.description && (
            <p className="text-muted">No content for this note.</p>
          )}
        </div>
      ))
    )}
  </div>
</div>

          {/* Assignments */}
          <div className="card mt-4 shadow-sm">
            <h5 className="card-header bg-light">Assignments</h5>
            <div className="card-body">
              {assignments.length > 0 ? (
                assignments.map((a) => {
                  const submission = submissions[a.id];
                  const dueDatePassed =
                    new Date(a.due_date).getTime() < Date.now();
                  const canEdit =
                    submission && !submission.grade && !dueDatePassed;

                  return (
                    <div key={a.id} className="border mb-3 p-3 rounded">
                      <h6>{a.title}</h6>
                      <p>{a.description}</p>

                      <p>
                        <strong>Due:</strong>{" "}
                        {new Date(a.due_date).toLocaleString()}
                      </p>

                      {a.file && (
                        <a
                          href={a.file}
                          target="_blank"
                          className="btn btn-outline-primary btn-sm mb-2"
                        >
                          Download File
                        </a>
                      )}

                      {/* Submitted view */}
                      {submission ? (
                        <div className="alert alert-success p-2">
                          <strong>Submitted on:</strong>{" "}
                          {new Date(
                            submission.submitted_at
                          ).toLocaleString()}
                          <br />

                          {submission.grade ? (
                            <>
                              <b>Grade:</b> {submission.grade} <br />
                              <b>Feedback:</b>{" "}
                              {submission.feedback || "N/A"}
                            </>
                          ) : (
                            <>
                              <span className="text-muted">
                                Awaiting grading...
                              </span>

                              {canEdit && (
                                <div className="mt-2">
                                  <input
                                    type="file"
                                    className="form-control mb-2"
                                    onChange={(e) =>
                                      handleFileChange(
                                        a.id,
                                        e.target.files[0]
                                      )
                                    }
                                  />
                                  <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() =>
                                      handleEditSubmit(a.id, submission.id)
                                    }
                                  >
                                    Update Submission
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          {!dueDatePassed ? (
                            <>
                              <input
                                type="file"
                                className="form-control mb-2"
                                onChange={(e) =>
                                  handleFileChange(
                                    a.id,
                                    e.target.files[0]
                                  )
                                }
                              />
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSubmit(a.id)}
                              >
                                Submit Assignment
                              </button>
                            </>
                          ) : (
                            <div className="alert alert-danger p-2">
                              Due date passed — submission closed.
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted">
                  No assignments for this course.
                </p>
              )}
            </div>
          </div>

          {/* Quizzes */}
          <div className="card mt-4 shadow-sm">
            <h5 className="card-header bg-light">Quizzes</h5>
            <div className="card-body">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div key={quiz.id} className="border p-3 mb-3 rounded">
                    <h6>{quiz.title}</h6>
                    <p>{quiz.description}</p>
                    <Link
                      to={`/student/quiz/${quiz.id}`}
                      className="btn btn-outline-info btn-sm"
                    >
                      Take Quiz
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-muted">No quizzes available yet.</p>
              )}
            </div>
          </div>

          {/* Discussion Forum */}
          <DiscussionForum courseId={course_id} studentId={studentId} />

        </div>
      </div>
    </div>
  );
}

export default StudentCourseDetail;
