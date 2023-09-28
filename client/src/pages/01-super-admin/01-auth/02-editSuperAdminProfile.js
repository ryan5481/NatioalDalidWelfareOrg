import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoginDetails } from '../../../redux/reducers/userSlice'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
const baseUrl = process.env.REACT_APP_BASE_URL 

const EditSuperAdminProfile = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { fullName, email, id } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        // console.log(event); // Log the event to see if it's capturing changes
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handelCancelButtonClick = () => {
        navigate('/');
    }
    // const navigateToChangePassword = () => {
    //     navigate("/password");
    // }
    const handelSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`${baseUrl}/change-super-admin-profile`, {
                _id: id,
                fullName: formData.fullName,
                email: formData.email,
            });
            if (response) {
                dispatch(
                    setLoginDetails({
                        id: id,
                        fullName: formData.fullName,
                        email: formData.email,
                    })
                );
        toast({
            title: 'Success.',
            description: 'Data updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });
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

    useEffect(() => {
        setFormData({
            fullName: fullName,
            email: email,
        });
    }, [fullName, email]);

    return (
        <Box
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} >
                    Edit Profile
                </Heading>
                <form onSubmit={handelSubmit}>
                    {/* <FormControl id="profilePicture">
                        <FormLabel>Profile Picture</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full">Change Image</Button>
                            </Center>
                        </Stack>
                    </FormControl> */}
                    <FormControl id="fullName">
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            type="text"
                            name="fullName"
                            onChange={handleInputChange}
                            placeholder={fullName}
                            _placeholder={{ color: useColorModeValue('gray.600', 'gray.300') }}
                        />

                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            placeholder={email}
                            _placeholder={{ color: useColorModeValue('gray.600', 'gray.300') }} />
                    </FormControl>

                    <Stack spacing={6} direction={['column', 'row']} pt={5}>
                        <Button

                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}
                            onClick={handelCancelButtonClick}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}
                            type='submit'>
                            Submit
                        </Button>
                    </Stack>
                </form>
                {/* <Divider />
                <Button
                    bg={'gray.500'}
                    color={'white'}
                    w="full"
                    _hover={{
                        bg: 'blue.500',
                    }}
                    onClick={navigateToChangePassword}>
                    Change Password
                </Button> */}
            </Stack>
        </Box>
    )
}

export default EditSuperAdminProfile