import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import { content } from "./data/content";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="*" element={<section className="page-wrap"><div className="empty-state"><h1>{content.notFound}</h1><Link className="button button-primary" to="/">{content.home.cta}</Link></div></section>} />
          </Routes>
        </main>
        <footer className="site-footer"><span>{content.brand}</span><span>{content.footer}</span></footer>
      </div>
    </BrowserRouter>
  );
}
