function About() {
  return (
    <div className="container mt-5">

      {/* ======================= HERO SECTION ======================= */}
      <div className="row align-items-center mb-5">
        {/* Left: Image */}
        <div className="col-md-6 mb-4">
          <img
            src="https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg"
            alt="About LMS"
            className="img-fluid rounded shadow-sm"
            style={{ borderRadius: "12px" }}
          />
        </div>

        {/* Right: Text */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">About Our Learning Platform</h2>
          <p className="fs-6 text-muted">
            Our Learning Management System (LMS) is designed to empower students and educators
            by providing a seamless, interactive, and personalized learning environment.
            We combine modern technology, AI-driven recommendations, and intuitive tools
            to support meaningful learning experiences.
          </p>

          <p className="fs-6">
            From beginners to advanced learners, our platform adapts to individual paths
            and makes learning accessible anytime, anywhere.
          </p>

          <p className="fw-semibold">
            Because we believe learning never stops — and neither should you.
          </p>
        </div>
      </div>

      {/* ======================= FEATURES ======================= */}
      <div className="mt-5">
        <h3 className="fw-bold mb-3">What Makes Us Different?</h3>
        <div className="row g-4">

          {/* Feature 1 */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="fw-bold mb-2">Interactive Learning</h5>
              <p className="text-muted">
                Courses include videos, quizzes, assignments, and hands-on practice 
                to make learning engaging and effective.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="fw-bold mb-2">AI-Powered Recommendations</h5>
              <p className="text-muted">
                Our ML engine analyzes your interests and suggests relevant, 
                personalized courses tailored to your goals.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3 h-100">
              <h5 className="fw-bold mb-2">Teacher-Friendly Tools</h5>
              <p className="text-muted">
                Educators can create courses, upload content, track progress, 
                and interact with students effortlessly.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ======================= CALL TO ACTION ======================= */}
      <div className="text-center mt-5 mb-5">
        <h4 className="fw-bold">Be a part of the future of learning.</h4>
        <p className="text-muted">
          Join thousands of students and teachers shaping tomorrow’s education.
        </p>
      </div>

    </div>
  );
}

export default About;