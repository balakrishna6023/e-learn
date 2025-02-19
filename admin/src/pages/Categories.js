import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [updatedCategory, setUpdatedCategory] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/category/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    // Check user role (e.g., from JWT or API)
    const checkUserRole = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
          },
        });
        const data = await response.json();
        setIsAdmin(data.role === "admin"); // Adjust according to your API response
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    };

    // Fetch categories
    checkUserRole();
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate to CategoryRelatedCourses component
    navigate(`/CategoryRelatedCourses/${categoryId}`);
  };

  const handleEditClick = (category) => {
    setUpdatedCategory({
      categoryId: category.categoryId,
      name: category.name,
      description: category.description,
      image: null, // Reset image when editing
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedCategory((prev) => ({
      ...prev,
      image: e.target.files[0], // Set selected image file
    }));
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatedCategory.categoryId.trim()) {
      setError("Category ID is required to update");
      return;
    }

    const formData = new FormData();
    formData.append("categoryId", updatedCategory.categoryId);
    formData.append("name", updatedCategory.name);
    formData.append("description", updatedCategory.description);

    if (updatedCategory.image) {
      formData.append("image", updatedCategory.image);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/category/update-category/${updatedCategory.categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Category updated successfully!");
        setUpdatedCategory({
          categoryId: "",
          name: "",
          description: "",
          image: null,
        });
        fetchCategories(); // Refresh category list
      } else {
        setError(data.error || "Error updating category");
      }
    } catch (err) {
      setError("Error updating category");
    }
  };

  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore Your Passion, Master Your Skills</h1>
          <p>
            With a variety of IT, Non-IT, and specialized courses, our platform
            is designed to cater to learners from all walks of life. Whether
            you're a tech enthusiast, an aspiring artist, or a student aiming to
            excel, our diverse range of categories ensures that there's a path
            just for you.
          </p>
        </div>
      </section>

      <div className="categories-list">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category._id}
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            <img
              src={`http://localhost:5000${
                category.image || "/uploads/default.jpg"
              }`}
              alt={`${category.name} category`}
              className="category-image"
              // Navigate to the category-related courses
            />
            {updatedCategory.categoryId === category.categoryId ? (
              <div>
                <form onSubmit={handleUpdateCategory}>
                  <input
                    type="text"
                    name="name"
                    value={updatedCategory.name}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description"
                    value={updatedCategory.description}
                    onChange={handleInputChange}
                  />
                  <input type="file" onChange={handleImageChange} />
                  <div className="card-buttons">
                    <button type="submit">Save</button>
                    <button
                      type="button"
                      onClick={() =>
                        setUpdatedCategory({
                          categoryId: "",
                          name: "",
                          description: "",
                          image: null,
                        })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
              </div>
            ) : (
              <div>
                <h2>{category.name}</h2>
                <p>{category.description || "No description available."}</p>
                {isAdmin && (
                  <div className="card-buttons">
                    <button onClick={() => handleEditClick(category)}>
                      Update
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Categories;
