import { useEffect, useState } from "react";
import api from "../../utils/api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function Dashboard() {
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  const [courses, setCourses] = useState([]);
  const [totalChapters, setTotalChapters] = useState(0);
  const [completedChapters, setCompletedChapters] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) {
      setError("Student ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    loadCourses();
  }, [studentId]);

  const loadCourses = () => {
    api
      .get(`student-courses/${studentId}/`)
      .then((res) => {
        setCourses(res.data);
        calculateProgress(res.data);
      })
      .catch(() => {
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  };

  const calculateProgress = async (courseList) => {
    let total = 0;
    let completed = 0;

    for (let course of courseList) {
      try {
        const res = await api.get(`course-progress/${studentId}/${course.id}/`);
        total += res.data.total_chapters;
        completed += res.data.completed;
      } catch (error) {
        console.error("Progress error:", error);
      }
    }

    const progress = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;

    setTotalChapters(total);
    setCompletedChapters(completed);
    setOverallProgress(progress);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/user-login";
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="card shadow-sm">
            
            {/* HEADER */}
            <h4 className="card-header d-flex justify-content-between align-items-center">
              Student Dashboard
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </h4>

            <div className="card-body">

              {/* ERROR BLOCK */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                  <div className="mt-2">
                    <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>
                      Retry
                    </button>
                    <button className="btn btn-outline-secondary btn-sm ms-2" onClick={handleLogout}>
                      Login Again
                    </button>
                  </div>
                </div>
              )}

              <h5>
                Hello, <strong>{student?.full_name || "Student"}</strong> 👋
              </h5>
              <p className="text-muted">Here's a summary of your learning journey.</p>

              {/* STATS */}
              <div className="row text-center mt-4">

                <div className="col-md-4">
                  <div className="border rounded p-3 shadow-sm">
                    <h3>{courses.length}</h3>
                    <p className="text-muted">Courses Enrolled</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 shadow-sm">
                    <h3>{completedChapters}</h3>
                    <p className="text-muted">Chapters Completed</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 shadow-sm">
                    <h3>{overallProgress}%</h3>
                    <p className="text-muted">Overall Progress</p>
                  </div>
                </div>

              </div>

              {/* QUICK ACTIONS */}
              <h5 className="mt-4">Quick Actions</h5>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <Link to="/my-courses" className="btn btn-primary w-100">
                    My Courses
                  </Link>
                </div>
                <div className="col-md-4 mt-3">
                  <Link to="/recommended-courses" className="btn btn-warning w-100">
                    Recommended Courses
                  </Link>
                </div>
              </div>

              {/* LOADING SPINNER */}
              {loading && !error && (
                <div className="text-center mt-4">
                  <div className="spinner-border text-primary"></div>
                  <p className="text-muted mt-2">Loading dashboard...</p>
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
