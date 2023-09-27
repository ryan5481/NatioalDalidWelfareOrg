import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image } from '@chakra-ui/react';
const baseUrl = process.env.REACT_APP_BASE_URL

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/get-services-images`);
        const data = await res.data
        setImageData(data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const newIndex = Math.floor(scrollY / (window.innerHeight * 0.5));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  }, [scrollY, currentIndex]);

  const backgroundImageStyle = {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    transition: 'background-image 0.5s ease-in-out',
    backgroundImage: `url('../../uploads/serviceImages/${imageData[currentIndex]?.serviceImage}')`, // Construct the URL manually
  };

  return (
    <div style={{ height: '100vh' }}>
      {imageData.length > 0 && (
        <div style={backgroundImageStyle}>
          <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <h2>{imageData[currentIndex].imageTitle}</h2>
            <p>{imageData[currentIndex].imageDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
