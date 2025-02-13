import React, { useState } from "react";
import axios from "axios";

const AddContentForm = () => {
  const [courseId, setCourseId] = useState(""); // Track courseId entered by the user
  const [contents, setContents] = useState([{ title: "", duration: "", description: "", video: null }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // Success state

  // Handle input change for courseId
  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  // Handle input changes for content details
  const handleContentChange = (index, e) => {
    const newContents = [...contents];
    newContents[index][e.target.name] = e.target.value;
    setContents(newContents);
  };

  // Handle video file selection
  const handleVideoChange = (index, e) => {
    const newContents = [...contents];
    newContents[index].video = e.target.files[0];
    setContents(newContents);
  };

  // Handle adding new content fields
  const handleAddContent = () => {
    setContents([...contents, { title: "", duration: "", description: "", video: null }]);
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form data
    if (!courseId) {
      setError("Course ID is required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("contents", JSON.stringify(contents)); // Append contents as a JSON string
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      if (content.video) {
        formData.append("videos", content.video); // Append video file for each content
      }
    }

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/course/add-content/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Add token in Authorization header
          },
        }
      );
      setSuccess("Content added successfully!"); // Set success message
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error adding content");
      setSuccess(null); // Clear success message on error
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Content to Course</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      {/* Input for Course ID */}
      <div>
        <label>Course ID:</label>
        <input
          type="text"
          value={courseId}
          onChange={handleCourseIdChange}
          placeholder="Enter Course ID"
          required
        />
      </div>

      <form onSubmit={handleSubmit}>
        {contents.map((content, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={content.title}
              onChange={(e) => handleContentChange(index, e)}
              required
            />
            
            <br />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={content.description}
              onChange={(e) => handleContentChange(index, e)}
              required
            />
            <br />
            <label>Upload Video:</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e) => handleVideoChange(index, e)}
              required
            />
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddContent}>
          Add Another Content
        </button>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Content"}
        </button>
      </form>
    </div>
  );
};

export default AddContentForm;
