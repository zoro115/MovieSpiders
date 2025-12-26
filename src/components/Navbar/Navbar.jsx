import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  function logout() {
    setUser(null); // clear user state
    localStorage.removeItem('user'); // optional: clear persisted user
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            EgySpiders
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav md-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="https://www.facebook.com/">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="https://www.instagram.com/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="https://youtube.com/">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/tv">
                  TV Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/upcoming">
                  Upcoming Movies
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="home" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
