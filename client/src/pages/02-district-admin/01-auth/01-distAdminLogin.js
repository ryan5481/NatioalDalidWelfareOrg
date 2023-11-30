import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  HStack,
  PinInputField,
  PinInput
} from '@chakra-ui/react'
import { assignUserRole, setLoginDetails } from '../../../redux/reducers/userSlice'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const baseUrl = process.env.REACT_APP_BASE_URL

const DistAdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  //VERIFY OTP
  const [isUserOtpVerified, setIsOtpVerified] = useState(false);
  const [isUserCredentialsVerified, setIsUserCredentialsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (event) => {
    // console.log(event); // Log the event to see if it's capturing changes
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //VERIFY EMAIL AND PASSWORD
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log('Form Data:', formData);
      const response = await axios.post(`${baseUrl}/dist-admin-login`, {
        email: formData.email,
        password: formData.password,
      })

      if (response.status === 200) {
        setIsUserCredentialsVerified(true)
        const data = response.data
        setEmail(data.email)
        // console.log(data)
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
        description: 'Wrong email or password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  //VERIFY OTP
  const sendOtp = async() => {
console.log(email)
  try {
    const response = await axios.post(`${baseUrl}/send-dist-admin-otp`, {
      email: email,
    })
    if(response){
      toast({
        title: 'Success.',
        description: 'OTP code sent to your email.',
        status: 'success',
        duration: 10000,
        isClosable: true,
        position: 'top'
      });
    } else {
      // Wrong credentials or other error
      toast({
        title: 'Failure.',
        description: 'Failed to send OTP.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  } catch (error) {
    console.error('Error:', error.response);
    toast({
      title: 'Error.',
      description: 'Wrong email or password.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  }
}

useEffect(() => {
  if(email){
    sendOtp()
  }
}, [email])

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log('Form Data:', formData);
      const response = await axios.post(`${baseUrl}/verify-dist-admin-otp`, {
        email: email,
        otp: otp,
      })

      if (response.status === 200) {
        setIsUserCredentialsVerified(true)
        setEmail(response.email)
        // Successful login
        dispatch(assignUserRole("distAdmin"));
        dispatch(
          setLoginDetails({
            email: response.data.email,
            id: response.data.id,
            fullName: response.data.fullName,
            isLoggedIn: true,
            district: response.data.district
          })
        );
        navigate("/dist-admin-dashboard");
        toast({
          title: 'Success.',
          description: 'Logged into district admin dashboard.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      } else if (response.data && response.data.error) {
        setOtp('')
        const errorCode = response.data.error.code;
        // const errorMsg = response.data.error.msg;
        if (errorCode === 'expired_otp') {
          toast({
            title: 'Failure.',
            description: 'The OTP has expired.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          })
        } else if (errorCode === 'invalid_otp') {
          setOtp('')
          toast({
            title: 'Failure.',
            description: 'The OTP is invalid.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          })
        }
      }

      // console.log('POST response', response.data);
    } catch (error) {
      console.error('Error:', error.response);
      const errorMsgFromServer = error.response?.data?.msg || 'An unexpected error occurred.';
      setErrorMessage(errorMsgFromServer);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setOtp("")
    }
  }


  return (<>
    {!isUserCredentialsVerified ?
      (<Box>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} color='blue.500'>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>

              <Center><Image w={600}
                src={require('../../../uploads/assets/nndswo-logo.jpeg')}></Image></Center>
              <Heading fontSize={'4xl'} textAlign="center" >District Admin Login</Heading>
              <FormControl>
                <form
                  onSubmit={handleSubmit}
                >
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name="email" placeholder='Email ID' onChange={handleInputChange} />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'} // Toggle between 'password' and 'text'
                        name="password"
                        placeholder="password"
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
                        color='blue.500'
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
                      Submit
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
      </Box>)
      :
      (<Box>
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} color='blue.500'>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>

              <Center><Image w={600}
                src={require('../../../uploads/assets/nndswo-logo.jpeg')}></Image></Center>
              <Heading fontSize={'2xl'} textAlign="center" >District Admin Email Verification</Heading>
              <Text fontSize={'md'} textAlign="center" >Type your OTP code sent to {email ?
                email.replace(/^(.)([^@]*)/, (match, firstLetter, rest) => firstLetter + rest.replace(/[a-zA-Z]/g, '*')) :
                'Invalid Email Address'
              }</Text>
              <FormControl>
                <form
                  onSubmit={handleOtpSubmit}
                >
                  <HStack justify="center" >
                    <PinInput
                      type='alphanumeric'
                      mask
                      value={otp}
                      onChange={(value)=> setOtp(value)}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      {/* <Checkbox>Remember me</Checkbox> */}
                      <Box
                        color='blue.500'
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
      </Box>)
    }
  </>
  )
}

export default DistAdminLogin