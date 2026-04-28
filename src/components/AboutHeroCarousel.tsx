'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/about_imgs/lob1.jpg',
  '/about_imgs/crab1.jpeg',
  '/about_imgs/red-snapper.jpg',
  '/about_imgs/grouper2.jpeg',
];

export default function AboutHeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt="Ocean Wealth Ceylon Environment"
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
      ))}
    </div>
  );
}