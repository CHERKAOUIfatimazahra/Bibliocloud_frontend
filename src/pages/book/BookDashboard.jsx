import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BookDashboard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [categoryMap, setCategoryMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, categoriesResponse] = await Promise.all([
          fetch(import.meta.env.VITE_API + "/book"),
          fetch(import.meta.env.VITE_API + "/category"),
        ]);
        const booksData = await booksResponse.json();
        const categoriesData = await categoriesResponse.json();

        setBooks(booksData);
        const categoryMapping = {};
        categoriesData.forEach((cat) => {
          categoryMapping[cat.id] = cat.name;
        });
        setCategoryMap(categoryMapping);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API + `/book/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the book from the state after successful deletion
        setBooks(books.filter((book) => book.id !== bookId));
        alert("Book deleted successfully!");
      } else {
        alert("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred while deleting the book.");
    }
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue =
      sortConfig.key === "category"
        ? categoryMap[a.categoryId]
        : a[sortConfig.key];
    const bValue =
      sortConfig.key === "category"
        ? categoryMap[b.categoryId]
        : b[sortConfig.key];
    return sortConfig.direction === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  const filteredBooks = sortedBooks.filter((book) => {
    const matchesSearch = Object.values({
      ...book,
      category: categoryMap[book.categoryId],
    }).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
      selectedCategory === "all" || book.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortableHeader = ({ label, sortKey }) => (
    <th
      className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown className="w-4 h-4" />
      </div>
    </th>
  );

  return (
    <div className="flex-1 p-6 mt-16 bg-gray-50">
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Book Management
          </h2>
          <button
            onClick={() => navigate("/addbook")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Add Book
          </button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <SortableHeader label="Title" sortKey="title" />
              <SortableHeader label="Author" sortKey="author" />
              <SortableHeader label="Category" sortKey="category" />
              <SortableHeader label="Available" sortKey="available_copies" />
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{categoryMap[book.categoryId]}</td>
                <td className="px-4 py-3">{book.available_copies}</td>
                <td className="px-4 py-3">
                  <img
                    src={book.image || "/api/placeholder/48/48"}
                    alt={book.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/update-book/${book.id}`}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredBooks.length)} of{" "}
            {filteredBooks.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(pageCount, prev + 1))
              }
              disabled={currentPage === pageCount}
              className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDashboard;
