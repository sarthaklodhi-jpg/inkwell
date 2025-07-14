import React from "react";
import {Container, Logo, LogoutBtn} from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
export function Header(){
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
     const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
    return (
      <header className="w-full bg-white bg-opacity-90 shadow-lg sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/">
              <Logo width="80px" />
            </Link>
            <ul className="flex gap-6 ml-8">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-blue-100 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          {authStatus && (
            <div className="ml-4">
              <LogoutBtn />
            </div>
          )}
        </nav>
      </header>
    )
}

export default Header