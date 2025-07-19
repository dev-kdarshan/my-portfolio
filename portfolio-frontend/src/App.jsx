

import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import './App.css';
import About from './pages/About';
import Footer from './components/Footer';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Projects from './pages/Projects';
import Preloader from './components/preloader';
import Contact from './pages/Contact';
import FloatingNav from './components/floatingNav';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
      ScrollTrigger.refresh();
    }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
       <FloatingNav />

      {/* Conditionally rendering Footer */}
      {location.pathname !== "/contact" && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <Router>
        {loading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <AppContent />
        )}
      </Router>
    </div>
  );
}

export default App;
