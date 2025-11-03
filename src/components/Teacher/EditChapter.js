import { Link, useParams } from "react-router-dom";
import Teachersidebar from "./Teachersidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function EditChapter() {
  const { course_id, chapter_id } = useParams();

  const [chapterData, setChapterData] = useState({
    course: '',
    title: '',
    description: '',
    video: null,
    remarks: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setChapterData({ ...chapterData, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setChapterData({ ...chapterData, video: e.target.files[0] });
  };

  // Fetch chapter on mount
  useEffect(() => {
    axios.get(`${baseUrl}/chapter/${chapter_id}/`)
      .then((res) => {
        setChapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          video: res.data.video,
          remarks: res.data.remarks
        });
        setIsFetching(false);
      })
      .catch(() => setError("Failed to load chapter data"));
  }, [chapter_id]);

  // Submit updated chapter
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append("course", chapterData.course);
    formData.append("title", chapterData.title);
    formData.append("description", chapterData.description);
    formData.append("remarks", chapterData.remarks);

    if (chapterData.video && typeof chapterData.video !== "string") {
      formData.append("video", chapterData.video);
    }

    try {
      await axios.patch(
        `${baseUrl}/chapter/${chapter_id}/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSuccess("Chapter updated successfully!");
      window.location.href = `/course-chapters/${chapterData.course}`;
    } catch (err) {
      setError("Update failed");
    }

    setIsLoading(false);
  };

  const getVideoUrl = (video) => {
    if (!video) return '';
    return video.startsWith("http") ? video : `${baseUrl}${video}`;
  };

  if (isFetching) return <h3 className="text-center mt-5">Loading chapter...</h3>;

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3"><Teachersidebar /></aside>
        <section className="col-md-9">

          <div className="card">
            <h5 className="card-header">Edit Chapter</h5>
            <div className="card-body">

              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              {chapterData.video && (
                <div className="mb-3">
                  <label>Current Video</label>
                  <video controls width="320">
                    <source src={getVideoUrl(chapterData.video)} />
                  </video>
                </div>
              )}

              <form onSubmit={submitForm}>

                <label className="form-label">Title</label>
                <input
                  name="title"
                  className="form-control mb-3"
                  value={chapterData.title}
                  onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control mb-3"
                  value={chapterData.description}
                  onChange={handleChange}
                />

                <label>Upload New Video</label>
                <input
                  type="file"
                  name="video"
                  className="form-control mb-3"
                  onChange={handleFileChange}
                />

                <label>Remarks</label>
                <textarea
                  name="remarks"
                  className="form-control mb-3"
                  value={chapterData.remarks}
                  onChange={handleChange}
                />

                <button className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Chapter"}
                </button>

                <Link to="/teacher-mycourses" className="btn btn-secondary ms-2">Cancel</Link>

              </form>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default EditChapter;
