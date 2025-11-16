import React from "react";
import smartImg from "../assets/flow.svg"; // Use your image

function SmartEducationSection() {
  return (
    <section className="smart-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Illustration */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src={smartImg}
              alt="Smart online education illustration"
              className="img-fluid smart-image"
            />
          </div>

          {/* Right Content */}
          <div className="col-md-6">
            <h2 className="smart-title">
              We Provide{" "}
              <span className="highlight-bg">Smart</span> <br /> Online Education
            </h2>
            <p className="smart-description mt-3">
              Our courses come with assigned projects, direct interactions with
              mentors, and curated learning resources designed to help you dive
              into in-depth learning — anywhere, anytime.
            </p>
            <ul className="smart-list mt-4">
              <li>Learn with real-world projects</li>
              <li>Get mentorship from top instructors</li>
              <li>Access curated study materials</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartEducationSection;
