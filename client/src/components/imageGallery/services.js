import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import './services.css'
const baseUrl = process.env.REACT_APP_BASE_URL

const Services = ({props, ref}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/get-services-images`);
        const data = await res.data.data
        setImages(data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };
    fetchImageData();
  }, []);
  // console.log(images)



  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const imageHeight = viewportHeight * .25; // Adjust this value as needed
      const newIndex = Math.floor(
        (scrollPosition + imageHeight / 2) / imageHeight
      ) % images.length;

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex, images]);

  const base64Images = images.map((img, index) => {
    return `data:image/jpeg;base64,${img.serviceImage}`
  })
  // console.log(base64Images)

  const containerStyle = {
    backgroundImage: `url(${images[currentIndex]})`,
  };

  return (
    <div ref={ref} className="image-gallery">
      <div className="image-gallery">
      <div
        className="image-container"
        style={{
          backgroundImage: `url('${base64Images[currentIndex]}')`,
        }}
      ></div>
    </div>
    </div>
  );
};

export default Services;
