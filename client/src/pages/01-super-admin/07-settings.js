import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { Box, HStack, Text, VStack, Image, useToast, Button } from '@chakra-ui/react'
const baseUrl = process.env.REACT_APP_BASE_URL


const Settings = () => {
    const logoImageInputRef = useRef()
    const imageInputRef = useRef()
    const toast = useToast()
    const [logoImageData, setLogoImageData] = useState({})
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0])
        if (event.target.files && event.target.files[0]) {
          setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
      }

    const fetchLogoImage = async () => {
        const res = await axios.get(`${baseUrl}/get-logo-image`)
        if (res) {
            const data = res.data.data;
            setLogoImageData(data);
        }
    }

    useEffect(() => {
        fetchLogoImage()
    }, [])

    const HandleUpdateLogoImage = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('logoImageName', selectedImage);
            }
            formData.append('id', logoImageData._id);

            const res = await axios.patch(`${baseUrl}/update-logo-image`, formData);
            if (res) {
                toast({
                    title: 'Success.',
                    description: 'Logo updated.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
                window.location.reload()
            } else {
                toast({
                    title: 'Error.',
                    description: 'Failed to update data.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
            }
      
        } catch (error) {
            console.error("Error updating image: ", error)
            toast({
                title: 'Error.',
                description: "Could not connect to server.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
        }
    };

    return (<>
        <Box
            pos="relative"
            left="250px"
        >
            <Text p={1} fontWeight="bold" >Update Logo</Text>
            <HStack justifyItems="left" >
                {logoImageData && logoImageData.logoImageName &&
                    <Image
                        maxH="60px"
                        src={previewImage || require(`../../uploads/logoImage/${logoImageData.logoImageName}`)}
                        onClick={() => logoImageInputRef.current.click()}
                    />}
                <input
                    id='jobImage'
                    type='file'
                    accept='image/*'
                    // style={{ display: 'none' }}
                    ref={logoImageInputRef}
                    onChange={handleImageSelect}
                />
                <Button onClick={HandleUpdateLogoImage} >Submit</Button>
            </HStack>
            <Text p={1} fontWeight="bold" >Update Login Banner Image</Text>

            {/* <HStack justifyItems="left" >
                {logoImageData && logoImageData.logoImageName &&
                    <Image
                        maxH="60px"
                        src={require(`../../uploads/logoImage/${logoImageData.logoImageName}`)}
                        onClick={() => imageInputRef.current.click()}
                    />}
                <input
                    id='jobImage'
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    ref={logoImageInputRef}
                    onChange={handleImageSelect}
                />
                <Button onClick={HandleUpdateLogoImage} >Submit</Button>
            </HStack> */}

        </Box>
    </>
    )
}

export default Settings