import { Link, useLocation } from "react-router-dom";

const navStyles = `
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(26, 26, 24, 0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(196, 98, 45, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 60px;
  }

  .navbar-brand {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: #f5f2eb;
    letter-spacing: 0.05em;
  }

  .navbar-brand span {
    color: #c4622d;
  }

  .navbar-links {
    display: flex;
    gap: 40px;
  }

  .navbar-links a {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 400;
    color: #888;
    transition: color 0.2s ease;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
  }

  .navbar-links a:hover {
    color: #f5f2eb;
  }

  .navbar-links a.active {
    color: #c4622d;
    border-bottom-color: #c4622d;
  }

  @media (max-width: 600px) {
    .navbar { padding: 0 24px; }
    .navbar-brand { font-size: 13px; }
    .navbar-links { gap: 20px; }
  }
`;

function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      <style>{navStyles}</style>
      {/* spacer per compensare la navbar fixed */}
      <div style={{ height: 60 }} />
      <nav className="navbar">
        <div className="navbar-brand">Polo Chimico <span>·</span> Terni</div>
        <div className="navbar-links">
          <Link to="/"          className={pathname === "/"          ? "active" : ""}>Home</Link>
          <Link to="/impatto"   className={pathname === "/impatto"   ? "active" : ""}>Impatto</Link>
          <Link to="/soluzione" className={pathname === "/soluzione" ? "active" : ""}>Soluzione</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
