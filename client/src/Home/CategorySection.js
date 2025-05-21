import React from 'react';
import './CategorySection.css';
import { useNavigate } from 'react-router-dom';

const CategorySection = ({ title, images }) => {
  const navigate = useNavigate();

  return (
    <div className="category-section">
      <div className="category-header">
        <h3>{title}</h3>
        <button className="view-all" onClick={() => navigate(`/products`)}>View All</button>
      </div>
      <div className="image-scroll">
        {images.map((url, index) => (
          <img key={index} src={url} alt={title} className="category-img" />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
