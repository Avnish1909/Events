import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css"; // ✅ Correct import

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Links = [
    { name: "Home", link: "https://thought-labv2.netlify.app/" },
    { name: "Utter Your Thoughts", link: "https://thought-labv2.netlify.app/utter-your-thoughts" },
    { name: "Blogs", link: "https://thought-labv2.netlify.app/blogs" },
    { name: "Leaderboard", link: "https://thought-labv2.netlify.app/leaderboard" },
    { name: "Counsellor Support", link: "https://thought-labv2.netlify.app/appointment-form" },
    { name: "Events", link: "/" },
  ];

  return (
    <nav  className={`sticky top-0 pt-[10px] z-50 ${styles.navBackground}`}>
      <div className="flex items-center justify-between px-6 md:px-[100px] py-0.4 relative">
        <Link to={"/"}>
          <div className="flex items-center space-x-4">
            <div className={styles.logoIcon}>
              <img src={logo} alt="Logo" style={{ height: "100%", width: "100%", objectFit: "contain" }} />
            </div>
            <span className={styles.logoText}>
              Thought<br />Lab
            </span>
          </div>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-4">
          {Links.map(({ name, link }) => (
            <li key={name}>
              <Link
                to={link}
                className={`${styles.navLink} ${location.pathname === link ? styles.active : ""}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

     {/* Mobile Nav */}
{isMenuOpen && (
  <ul className="md:hidden px-6 pb-4 space-y-2">
    {Links.map(({ name, link }) => (
      <li key={name}>
        <Link
          to={link}
          className={`navLink block text-base font-sans py-2 px-4 rounded-full font-medium ${
            location.pathname === link ? styles.navLink : styles.navLink
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {name}
        </Link>
      </li>
    ))}
  </ul>
)}

    </nav>
  );
}

export default Navbar;
