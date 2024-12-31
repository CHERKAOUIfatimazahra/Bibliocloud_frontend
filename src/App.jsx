import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BookDashboard from "./pages/book/BookDashboard.jsx";
import SearchPage from "./pages/SearchPage";
import AddBook from "./pages/book/AddBook.jsx";
import UpdateBook from "./pages/book/UpdateBook.jsx";
import CategoryDashboard from "./pages/categories/CategoryDashboard.jsx";
import AddCategories from "./pages/categories/AddCategories.jsx";
import UpdateCategories from "./pages/categories/UpdateCategories.jsx";
import BookDetailPage from "./pages/emprunt/BookDetailPage";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:bookId" element={<BookDetailPage />} />
          <Route
            path="/bookDashboard"
            element={
              <ProtectedRoute>
                <BookDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbook"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-book/:bookId"
            element={
              <ProtectedRoute>
                <UpdateBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categoryDashboard"
            element={
              <ProtectedRoute>
                <CategoryDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addCategory"
            element={
              <ProtectedRoute>
                <AddCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-category/:categoryId"
            element={
              <ProtectedRoute>
                <UpdateCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
