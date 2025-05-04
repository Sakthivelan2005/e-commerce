import React, { useState, useEffect, useRef } from "react";
import "./HeroCarousel.css"; // Import your CSS

const HeroCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

  const length = images.length;
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  // Get container dimensions
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Swipe logic
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) setCurrent((current + 1) % length);
    else if (distance < -50) setCurrent(current === 0 ? length - 1 : current - 1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          maxWidth: `${dimensions.width * length}px`,
          maxHeight: `${dimensions.height * length}px`
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            width={`${dimensions.width}px`}
            height={`${dimensions.height}px`}
            className="carousel-image"
          />
        ))}
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`dot ${current === index ? "active" : ""}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
