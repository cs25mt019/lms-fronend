import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Teachersidebar from "./Teachersidebar";
import { FaChartBar, FaTrash, FaPlusCircle } from "react-icons/fa";

const baseUrl = "http://127.0.0.1:8000/api/";

function TeacherQuizManager() {
  const { course_id } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // NEW: duration state
  const [duration, setDuration] = useState(10);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  const token = localStorage.getItem("access");

  const [questionForm, setQuestionForm] = useState({
    question_text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_option: "",
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // ---------------------------
  // Fetch quizzes
  // ---------------------------
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${baseUrl}quizzes/?course=${course_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // ---------------------------
  // Create quiz
  // ---------------------------
  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${baseUrl}quizzes/`,
        { 
          course: course_id, 
          title, 
          description,
          duration_minutes: duration  // NEW FIELD
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Success!", "Quiz created successfully.", "success");

      setTitle("");
      setDescription("");
      setDuration(10);

      fetchQuizzes();
    } catch (error) {
      Swal.fire("Error", "Failed to create quiz.", "error");
    }
  };

  // ---------------------------
  // Delete quiz
  // ---------------------------
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axios.delete(`${baseUrl}quizzes/${quizId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Deleted!", "Quiz deleted successfully.", "success");

      if (selectedQuiz === quizId) setSelectedQuiz(null);

      fetchQuizzes();
    } catch (error) {
      Swal.fire("Error", "Failed to delete quiz.", "error");
    }
  };

  // ---------------------------
  // Fetch quiz questions
  // ---------------------------
  const fetchQuestions = async (quizId) => {
    setSelectedQuiz(quizId);

    try {
      const res = await axios.get(`${baseUrl}questions/?quiz=${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // ---------------------------
  // Add question
  // ---------------------------
  const handleAddQuestion = async (e) => {
    e.preventDefault();

    if (!selectedQuiz) {
      Swal.fire("Select a quiz first!", "Choose a quiz to add questions.", "warning");
      return;
    }

    try {
      await axios.post(
        `${baseUrl}questions/`,
        {
          quiz: selectedQuiz,
          ...questionForm,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Success", "Question added successfully!", "success");

      setQuestionForm({
        question_text: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct_option: "",
      });

      fetchQuestions(selectedQuiz);
    } catch (error) {
      Swal.fire("Error", "Failed to add question.", "error");
    }
  };

  // ---------------------------
  // Delete question
  // ---------------------------
  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await axios.delete(`${baseUrl}questions/${questionId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Deleted!", "Question removed.", "success");

      fetchQuestions(selectedQuiz);
    } catch (error) {
      Swal.fire("Error", "Failed to delete question.", "error");
    }
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="container mt-4">
      <div className="row">

        {/* Sidebar */}
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        {/* Main section */}
        <section className="col-md-9">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-light">
              <h4 className="fw-bold mb-0">Manage Quizzes</h4>
            </div>

            <div className="card-body">

              {/* Create Quiz */}
              <form onSubmit={handleCreateQuiz} className="mb-4">
                <h6 className="fw-semibold mb-2">Add New Quiz</h6>

                <input
                  type="text"
                  placeholder="Quiz Title"
                  className="form-control mb-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Description"
                  className="form-control mb-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* NEW DURATION FIELD */}
                <p>Time in minutes</p>
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  className="form-control mb-2"
                  value={duration}
                  min="1"
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <button type="submit" className="btn btn-success btn-sm">
                  <FaPlusCircle className="me-1" /> Create Quiz
                </button>
              </form>

              {/* Quiz List */}
              <h6 className="fw-semibold mb-2">Existing Quizzes</h6>

              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`border p-3 mb-2 rounded d-flex justify-content-between align-items-center ${
                      selectedQuiz === quiz.id ? "bg-light" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchQuestions(quiz.id)}
                  >
                    <div>
                      <h6 className="fw-bold mb-1">{quiz.title}</h6>
                      <p className="text-muted small mb-0">
                        {quiz.description || "No description"}
                      </p>

                      {/* Show Duration */}
                      <p className="text-muted small mb-0">
                        ⏳ Duration: {quiz.duration_minutes} min
                      </p>
                    </div>

                    <div className="d-flex gap-2">
                      <Link
                        to={`/teacher/quiz/${quiz.id}/results`}
                        className="btn btn-outline-info btn-sm"
                      >
                        <FaChartBar className="me-1" /> Results
                      </Link>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuiz(quiz.id);
                        }}
                      >
                        <FaTrash className="me-1" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No quizzes yet.</p>
              )}

              {/* Question Section */}
              {selectedQuiz && (
                <div className="card mt-4 border-0 shadow-sm">
                  <div className="card-header bg-secondary text-white">
                    <h6 className="mb-0">Add Questions</h6>
                  </div>

                  <div className="card-body">

                    <form onSubmit={handleAddQuestion}>
                      {["question_text", "option1", "option2", "option3", "option4", "correct_option"].map(
                        (field, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            placeholder={
                              field === "question_text"
                                ? "Question text"
                                : field === "correct_option"
                                ? "Correct option (enter exact text)"
                                : `Option ${index}`
                            }
                            value={questionForm[field]}
                            onChange={(e) =>
                              setQuestionForm({ ...questionForm, [field]: e.target.value })
                            }
                            required
                          />
                        )
                      )}

                      <button type="submit" className="btn btn-primary btn-sm">
                        Add Question
                      </button>
                    </form>

                    <hr />

                    <h6>Questions</h6>

                    {questions.length > 0 ? (
                      <ul className="list-group">
                        {questions.map((q) => (
                          <li
                            key={q.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{q.question_text}</strong>
                              <div className="text-muted small">
                                Correct: {q.correct_option}
                              </div>
                            </div>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteQuestion(q.id)}
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mt-2">No questions added yet.</p>
                    )}

                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherQuizManager;
