import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/category/${categoryId}`
        );
        if (!response.ok) throw new Error("Failed to fetch category details");

        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
        });
      } catch (err) {
        setError("Failed to load category details");
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/category/${categoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update category");
      navigate("/CategoryDashboard");
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
      [name]: value,
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-16 bg-white rounded-md shadow-md">
      <div className="mb-6">
        <button
          onClick={() => navigate("/CategoryDashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Update Category</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            required
            className="mt-1 block w-full rounded-md border p-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
