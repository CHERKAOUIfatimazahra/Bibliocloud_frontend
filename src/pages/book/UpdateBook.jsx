import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
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

  // Fetch book details and categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch(
          import.meta.env.VITE_API + "/category"
        );
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        // Fetch book details
        const bookResponse = await fetch(
          import.meta.env.VITE_API + `/book/${bookId}`
        );
        if (!bookResponse.ok) throw new Error("Failed to fetch book details");
        const bookData = await bookResponse.json();

        setFormData({
          title: bookData.title,
          author: bookData.author,
          categoryId: bookData.categoryId,
          description: bookData.description,
          available_copies: bookData.available_copies,
          image: bookData.image,
        });
      } catch (err) {
        setError("Failed to load book details or categories");
      }
    };

    fetchData();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        import.meta.env.VITE_API + `/book/${bookId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update book");
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

      <h2 className="text-2xl font-bold mb-6">Update Book</h2>

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
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
