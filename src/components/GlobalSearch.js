import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const baseUrl = "http://127.0.0.1:8000/api/";

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ courses: [], teachers: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);

  //Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Search handler
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}search/?q=${value}`);
      setResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setResults({ courses: [], teachers: [] });
    setShowResults(false);
  };

  return (
    <div className="position-relative  global-search" ref={dropdownRef}>
      {/*  Search Input with Clear Button */}
      <div className="input-group shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search for courses or teachers..."
          value={query}
          onChange={handleSearch}
          onFocus={() => query.length > 1 && setShowResults(true)}
        />
        {query && (
          <button
            className="btn btn-outline-secondary border-start-0"
            type="button"
            onClick={clearSearch}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showResults && (
        <div
          className="position-absolute bg-white shadow rounded p-3 mt-1"
          style={{
            width: "100%",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 9999,
          }}
        >
          {loading ? (
            <div className="text-center text-muted py-3">
              <div className="spinner-border spinner-border-sm"></div>{" "}
              Searching...
            </div>
          ) : results.courses.length === 0 && results.teachers.length === 0 ? (
            <p className="text-muted text-center mb-0">No results found.</p>
          ) : (
            <>
              {results.courses.length > 0 && (
                <>
                  <h6 className="text-dark border-bottom pb-1">
                    Courses ({results.courses.length})
                  </h6>
                  {results.courses.map((c) => (
                    <Link
                      to={`/detail/${c.id}`}
                      key={c.id}
                      className="d-block text-decoration-none text-dark py-1 px-1 rounded hover-bg"
                      onClick={clearSearch}
                    >
                      <strong>{c.title}</strong>
                      <small className="text-muted d-block">{c.techs}</small>
                    </Link>
                  ))}
                </>
              )}

              {results.teachers.length > 0 && (
                <>
                  <h6 className="text-dark border-bottom pb-1 mt-3">
                    Teachers ({results.teachers.length})
                  </h6>
                  {results.teachers.map((t) => (
                    <Link
                      to={`/teacher-detail/${t.id}`}
                      key={t.id}
                      className="d-block text-decoration-none text-dark py-1 px-1 rounded hover-bg"
                      onClick={clearSearch}
                    >
                      <strong>{t.full_name}</strong>
                      <small className="text-muted d-block">{t.skills}</small>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
