import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/undraw_adventure-map_3e4p.svg";

function HeroSection() {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!access) {
      // Not logged in → go to student login
      navigate("/user-login");
    } else if (role === "student") {
      // Logged in as student → go to student dashboard
      navigate("/user-dashboard");
    } else {
      // Logged in as teacher but pressed student button → still go to student login
      navigate("/user-login");
    }
  };

  const handleStartTeaching = () => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!access) {
      // Not logged in → go to teacher login
      navigate("/teacher-login");
    } else if (role === "teacher") {
      // Logged in as teacher → go to teacher dashboard
      navigate("/teacher-dashboard");
    } else {
      // Logged in as student but pressed teaching → still go to teacher login
      navigate("/teacher-login");
    }
  };

  return (
    <section className="hero container-fluid py-5 px-5 position-relative">
      <div className="row align-items-center px-5">

        {/* LEFT CONTENT */}
        <div className="col-md-6 p-3">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="fw-bold display-2"
          >
            Empower Your <span className="highlight">Learning Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted my-3 fs-3"
          >
            Learn from world-class instructors and gain the skills you need to
            achieve your goals. Join a thriving global community of learners.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="d-flex gap-3 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartLearning}
              className="btn btn-dark px-4 py-2 rounded-pill display-6"
            >
              Start Learning
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartTeaching}
              className="btn btn-outline-dark px-4 py-2 rounded-pill display-6"
            >
              Start Teaching
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 text-center mt-5 mt-md-0">
          <motion.img
            src={heroImg}
            alt="Learning"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="img-fluid hero-img"
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
