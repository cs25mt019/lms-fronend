import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";

function StudentQuizView() {
  const { quiz_id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousAttempt, setPreviousAttempt] = useState(null);

  // ⏳ TIMER
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  // logged in student
  let studentId = null;
  try {
    studentId = JSON.parse(localStorage.getItem("student"))?.id;
  } catch {}

  useEffect(() => {
  if (!studentId) {
    Swal.fire("Login Required", "Please log in first.", "warning").then(() => {
      window.location.href = "/student-login";
    });
    return;
  }

  (async () => {
    try {
      await fetchQuiz();
      const startData = await startAttempt();

if (startData.already_attempted) {
    setSubmitted(true);
    setScore(startData.score);
    setPreviousAttempt(startData);
    return;   // stop timer / prevent answering
}
   // <-- must be awaited AFTER attempt exists
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  })();

  return () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
}, [quiz_id]);


  // -----------------------------
  // fetch quiz from backend
  // -----------------------------
  const fetchQuiz = async () => {
    try {
      const res = await api.get(`quizzes/${quiz_id}/`);
      setQuiz(res.data);
      return res.data;
    } catch (error) {
      Swal.fire("Error", "Quiz not found.", "error");
      throw error;
    }
  };

  // -----------------------------
  // Start or resume attempt using backend StartQuizView
  // Returns attempt data
  // -----------------------------
  const startAttempt = async () => {
    try {
      if (!studentId) throw new Error("No student id");

      // call start-quiz endpoint
      const res = await api.post(`start-quiz/`, {
        quiz: quiz_id,
        student: studentId,
      });

      // response contains { attempt_id, started_at }
      const startedAt = res.data.started_at; // ISO string from backend
      const attemptId = res.data.attempt_id;

      // compute endTime:
      // prefer quiz.duration_minutes from loaded quiz. If not loaded yet, refetch.
      let durationMin = quiz?.duration_minutes;
      if (!durationMin) {
        // ensure quiz is loaded
        const q = await fetchQuiz();
        durationMin = q.duration_minutes || 0;
      }

      // parse startedAt (backend timezone-aware) into ms
      const startMs = new Date(startedAt).getTime();
      const endTime = startMs + durationMin * 60 * 1000;

      // Save endTime to localStorage in case of refresh. Use attempt-specific key.
      const key = `quiz_timer_${quiz_id}`;
      localStorage.setItem(key, String(endTime));
      // Also optionally save attempt id
      localStorage.setItem(`quiz_attempt_${quiz_id}`, String(attemptId));

      // initialize the countdown based on that endTime
      initTimerFromEndTime(endTime);
      return res.data;
    } catch (error) {
      // If server returns an error about missing attempt, show friendly message
      console.error("startAttempt error:", error?.response?.data || error);
      throw error;
    }
  };

  // -----------------------------
  // Initialize timer from endTime (ms)
  // -----------------------------
  const initTimerFromEndTime = (endTime) => {
    // clear existing interval
    if (timerRef.current) clearInterval(timerRef.current);

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft(diff);
      if (diff <= 0) {
        // time up: clear interval, remove stored key and auto submit
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        localStorage.removeItem(`quiz_timer_${quiz_id}`);
        autoSubmit();
      }
    };

    tick(); // immediate update
    timerRef.current = setInterval(tick, 1000);
  };

  // -----------------------------
  // Auto submit when time expires
  // -----------------------------
  const autoSubmit = async () => {
    if (submitted) return;
    Swal.fire({
      icon: "warning",
      title: "Time is up!",
      text: "Your quiz has been auto-submitted.",
      timer: 1500,
      showConfirmButton: false,
    });
    await handleSubmit(true);
  };

  // -----------------------------
  // Check previous (completed) attempt
  // -----------------------------
 const checkPreviousAttempt = async () => {
  try {
    const res = await api.get(
      `quiz-attempts/?student=${studentId}&quiz=${quiz_id}`
    );

    if (res.data.length > 0) {
      const attempt = res.data[0];

      // 👇 Only treat as completed if attempt.completed is TRUE
      if (attempt.completed === true) {
        setPreviousAttempt(attempt);
        setScore(attempt.score);
        setSubmitted(true);

        localStorage.removeItem(`quiz_timer_${quiz_id}`);
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }

      // For ongoing attempt, restore timer
      const key = `quiz_timer_${quiz_id}`;
      const end = localStorage.getItem(key);
      if (end) initTimerFromEndTime(parseInt(end, 10));
    }
  } catch (error) {
    console.error("Error checking attempt:", error);
  }
};


  // Select an answer
  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // -----------------------------
  // Submit quiz (manual or auto)
  // -----------------------------
  const handleSubmit = async (auto = false) => {
    // if auto submit, we still send the answers we have (could be empty)
    const formattedAnswers = Object.entries(answers).map(([question, selected_option]) => ({
      question,
      selected_option,
    }));

    if (!auto && formattedAnswers.length === 0) {
      Swal.fire("Warning", "Please answer at least one question.", "warning");
      return;
    }

    try {
      if (!auto) {
        Swal.fire({
          title: "Submitting...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
      }

      const payload = {
        student: studentId,
        quiz: quiz_id,
        answers: formattedAnswers,
      };

      // POST to quiz-attempts/ — backend expects a non-completed attempt to exist
      const res = await api.post("quiz-attempts/", payload);

      if (!auto) Swal.close();
      setSubmitted(true);
      setScore(res.data.score);

      // Clear timer storage
      localStorage.removeItem(`quiz_timer_${quiz_id}`);
      localStorage.removeItem(`quiz_attempt_${quiz_id}`);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        text: `You scored ${res.data.score.toFixed(2)}%`,
      }).then(() => {
        // redirect to course or stay — your choice
        window.location.href = `/student-course-detail/${quiz.course}`;
      });
    } catch (error) {
      Swal.close();
      console.error("submit error:", error?.response?.data || error);
      Swal.fire("Error", error?.response?.data?.error || "Failed to submit quiz.", "error");
    }
  };

  // Format ms -> mm:ss
  const formatTime = (ms) => {
    if (ms === null) return "--:--";
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // If loading
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!quiz) return <div className="alert alert-danger">Quiz not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h4>{quiz.title}</h4>
        {quiz.duration_minutes && !submitted && (
          <div className="px-3 py-2 bg-warning text-dark rounded fw-bold">
            Time Left: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <p className="text-muted">{quiz.description}</p>
      <hr />

      {previousAttempt && (
        <div className="alert alert-info">
          You already attempted this quiz on{" "}
          <strong>
            {previousAttempt.submitted_at
              ? new Date(previousAttempt.submitted_at).toLocaleString()
              : ""}
          </strong>
          . Your score:{" "}
          <strong style={{ color: previousAttempt.score >= 80 ? "green" : previousAttempt.score >= 50 ? "orange" : "red" }}>
            {previousAttempt.score?.toFixed(2)}%
          </strong>
        </div>
      )}

      {quiz.questions.length > 0 ? (
        quiz.questions.map((q, idx) => (
          <div key={q.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h6>Q{idx + 1}. {q.question_text}</h6>
              {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <div key={i} className="form-check">
                    <input
                      disabled={submitted}
                      type="radio"
                      className="form-check-input"
                      name={`q-${q.id}`}
                      checked={isSelected || false}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    <label className="form-check-label">{opt}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-center">No questions found for this quiz.</p>
      )}

      {!submitted && (
        <button className="btn btn-success mt-3" onClick={() => handleSubmit(false)}>
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="alert alert-primary mt-3">
          Score: <strong>{score?.toFixed(2) ?? 0}%</strong>
        </div>
      )}
    </div>
  );
}

export default StudentQuizView;
