import React, { useEffect, useState, useRef } from 'react';
import { Text, Box, Button } from "@chakra-ui/react";
import Carousel from "../../components/imageGallery/carousel";
import Services from '../../components/imageGallery/services';

const Home = () => {
    const servicesRef = useRef(null);
    const [servicesVisible, setServicesVisible] = useState(false);

    const scrollToServices = () => {
        if (servicesRef.current) {
            servicesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setServicesVisible(true);
                observer.unobserve(servicesRef.current); // Stop observing once it's visible
            }
        });

        if (servicesRef.current) {
            observer.observe(servicesRef.current);
        }
    }, []);

    useEffect(() => {
        if (servicesVisible) {
            scrollToServices();
        }
    }, [servicesVisible]);

    return (
        <>
            <Box bg='brown.10'>
                
            </Box>
        </>
    );
};

export default Home;
