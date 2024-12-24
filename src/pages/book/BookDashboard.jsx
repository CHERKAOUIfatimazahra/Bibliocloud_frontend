import React, { useState } from "react";
import Sidebar from '../../components/Sidebar'

import {
  Pencil,
  Trash2,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
} from "lucide-react";

const BookDashboard = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      category: "Fiction",
      status: "Available",
      year: 2004,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      category: "Science Fiction",
      status: "Borrowed",
      year: 1999,
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
      category: "Classic",
      status: "Available",
      year: 2002,
    },
  ]);
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    status: "Available",
    year: new Date().getFullYear(),
  });

  const handleEdit = () => {
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleSaveEdit = () => {
    
  };

  const handleAdd = () => {
    
  };

  const filteredBooks = books.filter((book) =>
    Object.values(book).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

    return (
      <>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {/* Main content with dynamic width */}
        <div
          className={`flex-1 p-9 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Book Management
            </h2>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add New Book
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    ISBN
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Year
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    {editingBook?.id === book.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={editingBook.title}
                            onChange={(e) =>
                              setEditingBook({
                                ...editingBook,
                                title: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={editingBook.author}
                            onChange={(e) =>
                              setEditingBook({
                                ...editingBook,
                                author: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={editingBook.isbn}
                            onChange={(e) =>
                              setEditingBook({
                                ...editingBook,
                                isbn: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full p-1 border rounded"
                            value={editingBook.category}
                            onChange={(e) =>
                              setEditingBook({
                                ...editingBook,
                                category: e.target.value,
                              })
                            }
                          />
                        </td>
                        
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            
                            <button
                              onClick={() => setEditingBook(null)}
                              className="p-1 text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : 
                      <>
                        <td className="px-4 py-3">{book.title}</td>
                        <td className="px-4 py-3">{book.author}</td>
                        <td className="px-4 py-3">{book.isbn}</td>
                        <td className="px-4 py-3">{book.category}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              book.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{book.year}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(book)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default BookDashboard;

