import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api/";

function DiscussionForum({ courseId, studentId, teacherId }) {
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = localStorage.getItem("access");

  // -----------------------------
  // Fetch discussions
  // -----------------------------
  useEffect(() => {
    if (courseId) {
      fetchDiscussions();
    }
  }, [courseId]);

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}discussions/?course=${Number(courseId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDiscussions(res.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  // -----------------------------
  // Post new comment
  // -----------------------------
  const handlePost = async () => {
    if (!newComment.trim()) return;

    if (!token) {
      Swal.fire("Login Required", "Please login to post a message.", "warning");
      return;
    }

    // Build payload safely
    let payload = {
      course: Number(courseId),
      content: newComment,
    };

    // Attach correct user type
    if (studentId) payload.student = Number(studentId);
    if (teacherId) payload.teacher = Number(teacherId);

    try {
      await axios.post(`${baseUrl}discussions/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNewComment("");
      fetchDiscussions();

      Swal.fire({
        icon: "success",
        title: "Posted!",
        timer: 700,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("Discussion post error:", error.response?.data);

      Swal.fire("Error", "Failed to post comment.", "error");
    }
  };

  return (
    <div className="card mt-4 shadow-sm border-0">
      <div className="card-header bg-warning bg-opacity-25">
        <h6 className="fw-bold text-dark mb-0">
          <i className="bi bi-chat-dots text-warning me-2"></i>
          Discussion Forum
        </h6>
      </div>

      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {discussions.length > 0 ? (
          discussions.map((d) => (
            <div key={d.id} className="border-bottom mb-2 pb-2">
              <strong className="text-dark">
                {d.user_name || "Unknown User"}
              </strong>
              <small className="text-muted ms-2">
                {new Date(d.created_at).toLocaleString()}
              </small>
              <p className="mb-0">{d.content}</p>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            No discussions yet. Be the first to post!
          </p>
        )}
      </div>

      <div className="card-footer bg-light">
        <textarea
          className="form-control mb-2"
          placeholder="Write a message..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button
          onClick={handlePost}
          className="btn btn-warning btn-sm text-dark"
        >
          <i className="bi bi-send"></i> Post
        </button>
      </div>
    </div>
  );
}

export default DiscussionForum;
