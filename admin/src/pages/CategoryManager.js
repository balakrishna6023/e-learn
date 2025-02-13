import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });
  const [updatedCategory, setUpdatedCategory] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [categoryIdToFetch, setCategoryIdToFetch] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeForm, setActiveForm] = useState(""); // Track the active form (create, delete, update, fetch)
  const navigate = useNavigate(); // For navigation

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/category/categories");
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      } else {
        setError(data.error || "Error fetching categories");
      }
    } catch (err) {
      setError("Error fetching categories");
    }
  };

  // Upload image and get the URL
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/category/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data.imageUrl; // Assuming the server returns the image URL
      } else {
        setError(data.error || "Error uploading image");
        return null;
      }
    } catch (err) {
      setError("Error uploading image");
      return null;
    }
  };

  // Create a new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.categoryId.trim()) {
      setError("Category ID is required");
      return;
    }

    let imageUrl = newCategory.image ? await handleImageUpload(newCategory.image) : null;
    if (!imageUrl && newCategory.image) {
      setError("Image upload failed");
      return;
    }

    const categoryData = {
      categoryId: newCategory.categoryId,
      name: newCategory.name,
      description: newCategory.description,
      image: imageUrl,
    };

    const formData = new FormData();
    formData.append("categoryId", categoryData.categoryId);
    formData.append("name", categoryData.name);
    formData.append("description", categoryData.description);
    formData.append("image", newCategory.image);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/category/create-category", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Category created successfully!");
        setNewCategory({
          categoryId: "",
          name: "",
          description: "",
          image: null,
        });
        fetchCategories(); // Refresh category list
      } else {
        setError(data.error || "Error creating category");
      }
    } catch (err) {
      setError("Error submitting the form");
    }
  };

  // Delete category by categoryId
  const handleDeleteCategory = async () => {
    if (!categoryIdToDelete) {
      setError("Category ID to delete is required");
      return;
    }
  
    try {
      // Confirm that the categoryId is correct
      console.log("Deleting category with ID:", categoryIdToDelete);
  
      // Make DELETE request to delete the category
      const response = await fetch(
        `http://localhost:5000/api/category/delete-category/${categoryIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
          },
        }
      );
  
      const data = await response.json();
      
      // Check the response status
      if (response.ok) {
        setSuccessMessage("Category deleted successfully!");
        fetchCategories(); // Refresh the category list after deletion
      } else {
        setError(data.error || "Error deleting category");
      }
  
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Error deleting category");
    }
  };
  
  // Fetch category by categoryId
  const handleFetchCategory = async () => {
    if (!categoryIdToFetch) {
      setError("Category ID to fetch is required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/category/category/${categoryIdToFetch}`
      );
      const data = await response.json();
      if (response.ok) {
        alert(JSON.stringify(data.category, null, 2)); // Display category details
      } else {
        setError(data.error || "Error fetching category");
      }
    } catch (err) {
      setError("Error fetching category");
    }
  };

  // Update category
  // Update category
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


  useEffect(() => {
    fetchCategories();
  }, []);
  const handleViewCategories = () => {
    navigate("/categories");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Category Manager</h1>

      {/* Buttons to toggle between different operations */}
      <div>
        <button onClick={() => setActiveForm("create")}>Add Category</button>
        <button onClick={() => setActiveForm("delete")}>Delete Category</button>
        <button onClick={() => setActiveForm("update")}>Update Category</button>
        <button onClick={() => setActiveForm("fetch")}>Fetch Category</button>
        <button onClick={handleViewCategories}>View Categories</button>
      </div>

      {/* Create Category Form */}
      {activeForm === "create" && (
        <form onSubmit={handleCreateCategory} encType="multipart/form-data">
          <div>
            <label htmlFor="categoryId">Category ID:</label>
            <input
              type="text"
              id="categoryId"
              name="categoryId"
              value={newCategory.categoryId}
              onChange={(e) => setNewCategory({ ...newCategory, categoryId: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="name">Category Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
            />
          </div>

          <button type="submit">Create Category</button>
        </form>
      )}

      {/* Update Category Form */}
      {activeForm === "update" && (
        <form onSubmit={handleUpdateCategory}>
          <div>
            <label htmlFor="updateCategoryId">Category ID to update:</label>
            <input
              type="text"
              id="updateCategoryId"
              value={updatedCategory.categoryId}
              onChange={(e) => setUpdatedCategory({ ...updatedCategory, categoryId: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="updateName">Category Name:</label>
            <input
              type="text"
              id="updateName"
              value={updatedCategory.name}
              onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="updateDescription">Description:</label>
            <textarea
              id="updateDescription"
              value={updatedCategory.description}
              onChange={(e) => setUpdatedCategory({ ...updatedCategory, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="updateImage">Upload Image:</label>
            <input
              type="file"
              id="updateImage"
              onChange={(e) => setUpdatedCategory({ ...updatedCategory, image: e.target.files[0] })}
            />
          </div>

          <button type="submit">Update Category</button>
        </form>
      )}

      {/* Delete Category Form */}
      {activeForm === "delete" && (
        <div>
          <input
            type="text"
            placeholder="Enter Category ID to delete"
            value={categoryIdToDelete}
            onChange={(e) => setCategoryIdToDelete(e.target.value)}
          />
          <button onClick={handleDeleteCategory}>Delete Category</button>
        </div>
      )}

      {/* Fetch Category Form */}
      {activeForm === "fetch" && (
        <div>
          <input
            type="text"
            placeholder="Enter Category ID to fetch"
            value={categoryIdToFetch}
            onChange={(e) => setCategoryIdToFetch(e.target.value)}
          />
          <button onClick={handleFetchCategory}>Fetch Category</button>
        </div>
      )}

      {/* View Categories */}
      {activeForm === "view" && (
        <div>
          <h2>All Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <strong>{category.name}</strong>: {category.description}
                {category.image && <img src={category.image} alt="Category" />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display error or success messages */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </div>
  );
};

export default CategoryManager;
 