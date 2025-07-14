import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Footer from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <span className="text-xl text-gray-600 animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-3xl mx-auto">
        <header className="flex justify-center items-center py-4">
          <Header />
        </header>
        <main className="flex justify-center items-center">
          <div className="w-full bg-white bg-opacity-80 rounded-xl shadow-lg p-6">
            <Outlet />
          </div>
        </main>
        <footer className="flex justify-center items-center py-4">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
