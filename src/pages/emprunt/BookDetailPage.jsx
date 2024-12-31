import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { Calendar, User, BookOpen, Star } from "lucide-react";
import { format, addDays, startOfDay } from "date-fns";
import axios from "axios";

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 7));
  const id = useParams().bookId;
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(
          `https://7idbofutgi.execute-api.eu-north-1.amazonaws.com/v1/book/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookDetail();
  }, [id]);

  const handleLoanClick = () => {
    if (!auth.isAuthenticated) {
      auth.signinRedirect();
      return;
    }
    setShowModal(true);
  };

  const handleLoanSubmit = async () => {
    setIsLoading(true);

    try {
      const responce = axios.post(
        "https://7idbofutgi.execute-api.eu-north-1.amazonaws.com/v1/emprunts",
        {
          bookId: book.id,
          userId: auth.user.profile.sub,
          returnDate: startOfDay(returnDate).toISOString(),
        }
      );
      if (responce.status === 201) {
        navigate("/Search");
      }
      setShowModal(false);
      alert(responce.data.message);
    } catch (error) {
      setError(error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl p-6 bg-red-50 rounded-lg shadow-lg">
          <div className="text-center text-red-600">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 mt-16">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover Image */}
            <div className="w-full md:w-1/3">
              <img
                src={book.image || "/api/placeholder/400/600"}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />

              {/* Loan Button */}
              <div className="mt-6">
                <button
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleLoanClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Borrow this Book"}
                </button>
              </div>
            </div>

            {/* Book Details */}
            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <h2 className="text-xl text-gray-600 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {book.author}
                </h2>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{book.publishedDate || "Publication Date"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-5 h-5" />
                  <span>{book.pages || "Pages"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-5 h-5" />
                  <span>{book.rating || "Rating"}/5</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Genre</h4>
                    <p className="text-gray-600">{book.genre || "Genre"}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ISBN</h4>
                    <p className="text-gray-600">{book.isbn || "ISBN"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Select Return Date</h3>

              {/* Date Input avec date minimale fixée à aujourd'hui */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date (minimum 1 day)
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={format(returnDate, "yyyy-MM-dd")}
                  min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    if (selectedDate >= addDays(new Date(), 1)) {
                      setReturnDate(selectedDate);
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-1">
                  La date d'emprunt sera automatiquement fixée à aujourd'hui
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  onClick={handleLoanSubmit}
                >
                  Confirm Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;