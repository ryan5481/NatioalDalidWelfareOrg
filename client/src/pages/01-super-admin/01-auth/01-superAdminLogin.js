import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'
import {
  Box,
  Button,
  useToast,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Image,
  Center,
  useColorModeValue,

} from '@chakra-ui/react'
import { assignUserRole, setLoginDetails } from '../../../redux/reducers/userSlice'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const baseUrl = process.env.REACT_APP_BASE_URL

const SuperAdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (event) => {
    // console.log(event); // Log the event to see if it's capturing changes
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log('Form Data:', formData);
      const response = await axios.post(`${baseUrl}/super-admin-login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 200) {
        // Successful login
        dispatch(assignUserRole("superAdmin"));
        dispatch(
          setLoginDetails({
            // userRole: "superAdmin",
            email: response.data.email,
            id: response.data.id,
            fullName: response.data.fullName,
          })
        );
        navigate("/super-admin-dashboard");
        toast({
          title: 'Success.',
          description: 'Logged into admin dashboard.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      } else {
        // Wrong credentials or other error
        toast({
          title: 'Failure.',
          description: 'Wrong credentials.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }

      // console.log('POST response', response.data);
    } catch (error) {
      console.error('Error:', error.response);
      toast({
        title: 'Error.',
        description: 'Server error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <Box>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} color={useColorModeValue('blue.500', 'gray.100')}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>

            <Center><Image w={300} src='https://skywaynepal.com/static/media/logo2.ac770f9fccbae96efac0.jpg'></Image></Center>
            <Heading fontSize={'2xl'} textAlign="center" >Super Admin Login</Heading>
            <FormControl>
              <form
                onSubmit={handleSubmit}
              >
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onChange={handleInputChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'} // Toggle between 'password' and 'text'
                      name="password"
                      onChange={handleInputChange}
                    />
                    <InputRightElement width="4.5rem">
                      {showPassword ? <ViewOffIcon onClick={handleTogglePassword} /> : <ViewIcon onClick={handleTogglePassword} />}
                      
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    {/* <Checkbox>Remember me</Checkbox> */}
                    <Box
                      color={useColorModeValue('blue.500', 'gray.100')}
                      transition="color 0.2s"
                      _hover={{
                        color: 'blue.800',
                        cursor: 'pointer'
                      }}
                    >
                      {/* <Text>Forgot password?</Text> */}
                    </Box>
                  </Stack>

                  <Button
                    colorScheme={'blue'}
                    variant={'solid'}
                    type='submit'
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </FormControl>

          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    </Box>
  )
}

export default SuperAdminLogin