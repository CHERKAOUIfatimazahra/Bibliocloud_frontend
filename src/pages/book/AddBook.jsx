import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    categoryId: "",
    description: "",
    available_copies: 1,
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://7idbofutgi.execute-api.eu-north-1.amazonaws.com/v1/category")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setError("Failed to load categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://7idbofutgi.execute-api.eu-north-1.amazonaws.com/v1/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to create book");
      navigate("/BookDashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "available_copies" ? parseInt(value) : value,
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-16 bg-white rounded-md shadow-md">
      <div className="mb-6">
        <button
          onClick={() => navigate("/BookDashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="categoryId"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            required
            rows="3"
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Copies
          </label>
          <input
            type="number"
            name="available_copies"
            required
            min="0"
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.available_copies}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
