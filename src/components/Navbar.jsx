import { useState } from "react";
import { NavLink } from "react-router-dom";
import { content } from "../data/content";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label={content.navLabel}>
        <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>{content.brand}<small>{content.brandTagline}</small></span>
        </NavLink>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? content.closeMenu : content.openMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <ul className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {content.nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
