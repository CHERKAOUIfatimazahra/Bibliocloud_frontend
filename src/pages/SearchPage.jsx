import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Filter,
  Star,
  ChevronRight,
  ChevronLeft,
  BookmarkPlus,
  Heart,
  X,
} from "lucide-react";
import axios from "axios";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setErreur] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book");
        setBooks(response.data);
      } catch (error) {
        setErreur(error.message);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        setCategories(response.data);
      } catch (error) {
        setErreur(error.message);
      }
    };
    fetchBooks();
    fetchCategories();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const booksPerPage = 6;

  // Toggle favorite books
  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filtering and pagination
  const filteredBooks = books.filter(
    (book) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(book.category)) &&
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      {/* Search Header */}
      <section className="bg-white shadow-md py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center">
            Recherche de Livres
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explorez notre vaste collection. Filtrez par titre, auteur,
            catégorie ou tags pour trouver votre prochaine lecture.
          </p>

          {/* Search Bar with Advanced Filters */}
          <div className="max-w-4xl mx-auto relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Rechercher un livre, auteur ou tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-l-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}
                className="bg-blue-500 text-white px-4 py-3 rounded-r-xl hover:bg-blue-600 transition"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Advanced Filters Dropdown */}
            {advancedFiltersOpen && (
              <div className="mt-4 p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Filtres Avancés
                </h3>

                {/* Category Filters */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-gray-700">Catégories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const isSelected = selectedCategories.includes(
                        category.name
                      );
                      return (
                        <button
                          key={category.name}
                          onClick={() => toggleCategory(category.name)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                            isSelected
                              ? "bg-blue-100 text-blue-800 ring-2 ring-offset-2"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{category.name}</span>
                          {isSelected && <X className="w-4 h-4 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedCategories.length > 0 || searchTerm) && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setSelectedCategories([]);
                        setSearchTerm("");
                        setAdvancedFiltersOpen(false);
                      }}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredBooks.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {currentBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl group"
                  >
                    <div className="relative">
                      <img
                        src={
                          book.image ||
                          "https://t4.ftcdn.net/jpg/07/18/45/41/360_F_718454107_bllWMfUzftPuzsD44xb6m757Tssh8P33.jpg"
                        }
                        alt={book.title}
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(book.id)}
                        className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white transition"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            favorites.includes(book.id)
                              ? "text-red-500 fill-current"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm font-medium ${
                            categories.find((c) => c.id === book.categoryId)
                              ?.color || "bg-blue-50 text-blue-600"
                          } px-3 py-1 rounded-full`}
                        >
                          {categories.find((c) => c.id === book.categoryId)
                            ?.name || "Unknown Category"}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{book.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                        {book.title}
                      </h3>
                      <p className="text-gray-600">{book.author}</p>
                      <p className="text-gray-500 line-clamp-3 text-sm">
                        {book.description}
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition transform">
                          Emprunter
                        </button>
                        <button className="bg-gray-200 text-gray-800 p-3 rounded-xl hover:bg-gray-300 transition">
                          <BookmarkPlus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-200 p-3 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  <ChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-xl transition ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-200 p-3 rounded-xl disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  <ChevronRight />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-2xl text-gray-500">
                Aucun livre trouvé correspondant à votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;