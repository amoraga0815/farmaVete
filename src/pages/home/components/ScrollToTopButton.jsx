import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      onClick={scrollToTop}
      className="btn btn-primary position-fixed"
      style={{ right: 24, bottom: 24, zIndex: 999, borderRadius: '50%', width: 48, height: 48, display: visible ? 'block' : 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      aria-label="Volver arriba"
    >
      <i className="bi bi-arrow-up" style={{ fontSize: 24 }}></i>
    </button>
  );
}
