
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Center,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  IconButton
} from '@chakra-ui/react'
import { FaWhatsapp, FaFacebook, FaFacebookMessenger } from 'react-icons/fa'
import { ReactNode } from 'react'
const baseUrl = process.env.REACT_APP_BASE_URL 



const Header = () => {
  const hoverColor = "#0D74FF"

  const [isMobileView, setIsMobileView] = useState(false);
  const [data, setData] = useState([])

  const GetHeaderData = async () => {
    const res = await axios.get(`${baseUrl}/get-contact-info`)
    if (res) {
      // console.log("DATAAAA:" + data)
      setData(res.data.data)
    } else {
      alert("Failed to fech header data")
    }
  }

  useEffect(() => {
    GetHeaderData()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function openMessengerChat(recipientId) {
    // Replace 'your-app-id' with your Facebook App ID
    const appId = 'your-app-id';
    const messengerUrl = `https://m.me/${data.messangerId}`;
    window.open(messengerUrl, 'Messenger Chat', 'width=600,height=400');
  }

  function openFaceBookPage(recipientId) {
    // Replace 'your-app-id' with your Facebook App ID
    const appId = 'your-app-id';
    const facebookUrl = `https://facebook.com/${data.facebookId}`;
    window.open(facebookUrl, 'Facebook Page', 'width=600,height=400');
  }

  function openWhatsappChat(recipientId) {
    // Replace 'your-app-id' with your Facebook App ID
    const appId = 'your-app-id';
    const whatsappPhoneNumber = `https://wa.me/${data.whatsappId}`;
    window.open(whatsappPhoneNumber, 'Whatsapp Chat', 'width=600,height=400');
  }

  if (isMobileView) {
    return null; // Render nothing if in mobile view
  }
  return (
    <>
      <Box
        pos='sticky'
        w='100%'
        h='45px'
        z-index={11}
        top='0px'
        bg='brown.700'
        color='gray.50'
        fontSize={{ sm: 'xxs', md: 'sm' }}
      >
        <Container
          as={Stack}
          maxW={'full'}
          maxH={50}
          py={2}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Stack direction={'row'} spacing={6}>
            <Center>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </Center>
            <Center>
              <a href={`tel:${data.phoneNumber1}`}>{data.phoneNumber}</a>
            </Center>
          </Stack>
          <Stack direction={'row'} spacing={6}>
            <Center>
              <IconButton
                color={'white'}
                aria-label="facebook"
                variant="ghost"
                size="sm"
                isRound={true}
                _hover={{ bg: hoverColor }}
                icon={<FaWhatsapp size="22px" />}
                onClick={() => openWhatsappChat(data.whatsappId)}
              />
            </Center>
            <Center>
              <IconButton
                color={'white'}
                aria-label="facebook"
                variant="ghost"
                size="sm"
                isRound={true}
                _hover={{ bg: hoverColor }}
                icon={<FaFacebook size="22px" />}
                onClick={() => openWhatsappChat(data.facebookId)}
              />
            </Center>
            <Center>
              <IconButton
                color={'white'}
                aria-label="facebook"
                variant="ghost"
                size="sm"
                isRound={true}
                _hover={{ bg: hoverColor }}
                icon={<FaFacebookMessenger size="22px" />}
                onClick={() => openWhatsappChat(data.messangerId)}
              />
            </Center>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Header