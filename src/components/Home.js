import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeHeroSection from "./HomeHeroSection";
import SmartEducationSection from "./SmartEducationSection";
import Slider from "react-slick";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import api from "../utils/api"; // 

const baseUrl = "http://127.0.0.1:8000";

function Home() {
  const [homeData, setHomeData] = useState({
    latest_courses: [],
    popular_courses: [],
    popular_teachers: [],
  });
  const [studentCourses, setStudentCourses] = useState([]);
  const [teacherStats, setTeacherStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const teacher = JSON.parse(localStorage.getItem("teacher") || "{}");

  // Unified session expiry handler
  const handleSessionExpired = (roleType) => {
    console.warn("Session expired. Logging out...");
    localStorage.clear();
    window.location.href =
      roleType === "teacher" ? "/teacher-login" : "/user-login";
  };

  useEffect(() => {
    document.title = "SpringBoard";

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch public home data (uses JWT instance)
        const { data: homeJson } = await api.get("home/");
        setHomeData({
          latest_courses: homeJson.latest_courses || [],
          popular_courses: homeJson.popular_courses || [],
          popular_teachers: homeJson.popular_teachers || [],
        });

        // Fetch student enrolled courses
        if (role === "student" && student?.id) {
          try {
            const res = await api.get(`student-courses/${student.id}/`);
            setStudentCourses(Array.isArray(res.data) ? res.data : []);
          } catch (err) {
            if (err.response?.status === 401)
              handleSessionExpired("student");
          }
        }

        //  Fetch teacher dashboard
        if (role === "teacher" && teacher?.id) {
          try {
            const res = await api.get(`teacher-dashboard/${teacher.id}/`);
            setTeacherStats(res.data || null);
          } catch (err) {
            if (err.response?.status === 401)
              handleSessionExpired("teacher");
          }
        }
      } catch (err) {
        console.error("Error loading home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]); //  only role triggers reload

  // Handle image paths
  const getImageUrl = (path) => {
    if (!path) return "/logo512.png";
    if (path.startsWith("http")) return path;
    return `${baseUrl}${path}`;
  };

  // Loading UI
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status"></div>
        <h5 className="mt-3 text-muted">Loading SpringBoard...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 px-0">
      <HomeHeroSection />
      <SmartEducationSection />

      {/* TEACHER DASHBOARD SNAPSHOT */}
      {role === "teacher" && (
        <section className="home-section teacher-dashboard bg-light py-5">
          <div className="container text-center">
            {teacherStats ? (
              <>
                <h3 className="fw-bold mb-4">
                  Welcome Back, {teacher.full_name} 👋
                </h3>
                <div className="row g-4">
                  {[
                    {
                      label: "Total Courses",
                      value: teacherStats.total_courses || 0,
                    },
                    {
                      label: "Total Students",
                      value: teacherStats.total_students || 0,
                    },
                    {
                      label: "Average Rating",
                      value: `${teacherStats.avg_rating?.toFixed(1) || 0} ⭐`,
                    },
                  ].map((stat, i) => (
                    <div className="col-md-4" key={i}>
                      <div className="card p-4 shadow-sm border-0">
                        <h4>{stat.value}</h4>
                        <p className="text-muted">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted">No dashboard data available.</p>
            )}
          </div>
        </section>
      )}

      {/* STUDENT CONTINUE LEARNING */}
      {role === "student" && (
        <section className="home-section continue-learning py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Continue Learning 📘</h3>
              <Link to="/my-courses" className="see-all-btn">
                View All →
              </Link>
            </div>

            {studentCourses.length > 0 ? (
              <div className="row g-4">
                {studentCourses.map((course) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6"
                    key={course.id}
                  >
                    <Link
                      to={`/student-course-detail/${course.id}`}
                      className="text-decoration-none"
                    >
                      <div className="course-modern-card h-100 shadow-sm">
                        <img
                          src={getImageUrl(course.featured_image)}
                          alt={course.title}
                          className="course-img"
                        />
                        <div className="course-body p-3">
                          <h5 className="course-title">{course.title}</h5>
                          <p className="text-muted small mb-0">
                            {" "}
                            {course.Teacher?.full_name || "Instructor"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">
                You haven’t enrolled in any courses yet.
              </p>
            )}
          </div>
        </section>
      )}

      {/* LATEST COURSES */}
      <section className="home-section latest-modern">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-heading text-dark mb-2">
                Latest <span>Courses</span>
              </h2>
              <p className="section-subtext text-muted">
                Discover new courses designed to help you upskill faster.
              </p>
            </div>
            <Link to="/all-courses" className="see-all-btn-dark">
              See All →
            </Link>
          </div>

          <div className="row g-4">
            {homeData.latest_courses?.length ? (
              homeData.latest_courses.map((course) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6"
                  key={course.id}
                >
                  <Link
                    to={`/detail/${course.id}`}
                    className="text-decoration-none"
                  >
                    <div className="course-latest-card h-100 shadow-sm">
                      <img
                        src={getImageUrl(course.featured_image)}
                        alt={course.title}
                        className="course-img"
                      />
                      <div className="course-body p-3">
                        <h5 className="course-title">{course.title}</h5>
                        <p className="instructor text-muted mb-1">
                           {course.Teacher?.full_name || "Instructor"}
                        </p>
                        <span className="rating">
                          ⭐ {course.average_rating || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">
                No latest courses available.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="home-section alt-bg py-5"> <div className="container text-center"> <h3 className="section-title mb-4">🚀 Why Learn with SpringBoard</h3> <div className="row g-4"> {[ { icon: "🎯", title: "Project-Based Learning", desc: "Apply knowledge through real-world tasks." }, { icon: "👨‍🏫", title: "Expert Mentors", desc: "Learn directly from industry professionals." }, { icon: "🏆", title: "Certificates", desc: "Earn shareable credentials for your achievements." }, { icon: "🌍", title: "Global Community", desc: "Join thousands of learners worldwide." }, ].map((b, i) => ( <div className="col-md-3" key={i}> <div className="benefit-card shadow-sm p-3 h-100"> <div className="icon fs-1">{b.icon}</div> <h5 className="fw-bold mt-2">{b.title}</h5> <p className="text-muted small">{b.desc}</p> </div> </div> ))} </div> </div> </section>
      {/* POPULAR COURSES */}
      <section className="home-section popular-modern">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-heading mb-2">Popular <span>Courses</span></h2>
            <Link to="/popular-courses" className="see-all-btn">See All →</Link>
          </div>
          <Slider
            dots={false}
            infinite
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={4000}
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 3 } },
              { breakpoint: 992, settings: { slidesToShow: 2 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } },
            ]}
          >
            {homeData.popular_courses?.length > 0 ? (
              homeData.popular_courses.map((course) => (
                <div key={course.id}>
                  <div className="course-modern-card mx-2 shadow-sm">
                    <Link to={`/detail/${course.id}`} className="text-decoration-none">
                      <img
                        src={getImageUrl(course.featured_image)}
                        alt={course.title}
                        className="course-img"
                      />
                      <div className="course-body p-3">
                        <h5 className="course-title">{course.title}</h5>
                        <div className="course-meta">
                          <span className="rating">
                            <FaStar className="text-warning" /> {course.average_rating || 0}
                          </span>
                          <span className="instructor"> {course.Teacher?.full_name || "Instructor"}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No popular courses yet.</p>
            )}
          </Slider>
        </div>
      </section>

      {/*  POPULAR TEACHERS */}
      <section className="home-section py-5">
  <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h3 className="section-title">Popular Teachers</h3>
      <Link to="/popular-teachers" className="see-all">See All</Link>
    </div>

    <div className="row g-4">
      {homeData.popular_teachers?.length > 0 ? (
        homeData.popular_teachers.map((teacher) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={teacher.id}>
            <div
              className="card teacher-card text-center shadow-sm h-100 position-relative"
              style={{ cursor: "pointer" }}
            >
              {/* CLICKABLE OVERLAY */}
              <Link
                to={`/teacher-detail/${teacher.id}`}
                className="stretched-link"
                style={{ zIndex: 5 }}
              ></Link>

              <img
                src={getImageUrl(teacher.profile_image)}
                className="card-img-top"
                alt={teacher.full_name}
              />

              <div className="card-body">
                <h5 className="card-title">{teacher.full_name}</h5>
                <p className="text-muted small mb-1">{teacher.qualification}</p>

                <div className="skills">
                  {teacher.skills?.split(",").slice(0, 3).map((s, i) => (
                    <span key={i} className="badge bg-light text-dark mx-1">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No teachers available yet.</p>
      )}
    </div>
  </div>
</section>


      {/* TESTIMONIALS */}
      <section className="home-section testimonials-modern py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-heading">
              What Our <span>Students Say</span>
            </h2>
            <p className="section-subtext">
              Hear from learners who’ve achieved their dreams with SpringBoard.
            </p>
          </div>
          <Slider
            dots
            infinite
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={4000}
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 2 } },
              { breakpoint: 768, settings: { slidesToShow: 1 } },
            ]}
          >
            {[{
              name: "Aarav Sharma",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              text: "SpringBoard helped me land my first job as a data analyst! The real-world projects were invaluable.",
            }, {
              name: "Priya Mehta",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              text: "The mentors were super helpful and guided me every step of the way. Highly recommended!",
            }, {
              name: "Rohit Kumar",
              image: "https://randomuser.me/api/portraits/men/76.jpg",
              text: "The course content is excellent and up-to-date. I loved the flexibility of learning at my own pace.",
            }, {
              name: "Sneha Patel",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              text: "This platform gave me confidence to switch careers into Machine Learning — absolutely worth it!",
            }].map((t, index) => (
              <div key={index} className="testimonial-card mx-3 shadow-sm">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <img src={t.image} alt={t.name} className="testimonial-img" />
                  <h6 className="student-name">{t.name}</h6>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Home;
