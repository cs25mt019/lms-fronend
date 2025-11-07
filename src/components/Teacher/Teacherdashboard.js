import { useState, useEffect } from "react";
import axios from "axios";
import Teachersidebar from "./Teachersidebar";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api/";

function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_courses: 0,
    total_students: 0,
    avg_rating: 0,
  });

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    axios
      .get(`${baseUrl}teacher-dashboard/${teacherId}/`)
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error loading dashboard:", error);
      });
  }, [teacherId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Teachersidebar />
        </aside>

        <section className="col-md-9">
          <div className="card shadow-sm border-0">
            <h5 className="card-header bg-primary text-white">
              Teacher Dashboard
            </h5>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm p-3">
                    <h6>Total Courses</h6>
                    <h2>{dashboardData.total_courses}</h2>
                    <Link to="/teacher-mycourses" className="btn btn-outline-primary btn-sm mt-2">
                      View Courses
                    </Link>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm p-3">
                    <h6>Total Students</h6>
                    <h2>{dashboardData.total_students}</h2>
                    <Link to="/teacher-user" className="btn btn-outline-success btn-sm mt-2">
                      View Students
                    </Link>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm p-3">
                    <h6>Average Rating</h6>
                    <h2>⭐ {dashboardData.avg_rating}</h2>
                    <Link to="/teacher-reviews" className="btn btn-outline-warning btn-sm mt-2">
                      View Reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
