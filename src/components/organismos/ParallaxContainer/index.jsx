import React, { useState, useEffect, useRef } from 'react';
import './ParallaxContainer.css';

const ParallaxContainer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
    '/img/img_molecule1.png',
    '/img/img_molecule2.png',
    '/img/img_molecule1.png',
    '/img/img_molecule1.png',
    '/img/img_molecule1.png',
    '/img/img_molecule2.png',
    // Añadir más rutas de imágenes
  ];

  const getRandomPosition = () => {
    return {
      top: `${Math.floor(Math.random() * 60) + 10}%`, // Mantén las imágenes dentro de los márgenes superiores e inferiores
      left: `${Math.floor(Math.random() * 60) + 10}%`, // Mantén las imágenes dentro de los márgenes laterales
    };
  };

  const getRandomSize = () => {
    return {
      width: `${Math.floor(Math.random() * 30) + 70}px`, // Ajuste del tamaño para mantener coherencia
      height: `${Math.floor(Math.random() * 30) + 70}px`,
    };
  };

  const getRandomRotation = () => {
    return `rotate(${Math.floor(Math.random() * 20) - 10}deg)`; // Rotación sutil para evitar que se vea desordenado
  };

  return (
    <div ref={containerRef} className="parallax-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Random Image ${index + 1}`}
          className="parallax-image"
          style={{
            ...getRandomPosition(),
            ...getRandomSize(),
            transform: `${getRandomRotation()} translateY(${scrollPosition * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`,
          }}
        />
      ))}
    </div>
  );
};

export { ParallaxContainer };
