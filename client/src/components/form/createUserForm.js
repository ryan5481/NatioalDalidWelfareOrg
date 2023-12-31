import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useDisclosure,
  Select,
  FormErrorMessage, // Add this import for error message display
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import districts from "../datasets/districts.json"
const baseUrl = process.env.REACT_APP_BASE_URL;

const CreateUserForm = ({ setIsCreateNewUserActive, fetchData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  
  const nepalDistrcitsList = districts.map(item => item.name).sort();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email('Invalid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, two lowercase letters, two uppercase letters, two numbers, and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match') // Check if it matches the 'password' field
      .required('Password confirmation is required'),
    district: Yup.string().required('District is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      district: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      // Remove confirmPassword from the formData before submitting
      const { confirmPassword, ...formData } = values;
      submitForm(formData);
    },
  });

  const submitForm = async (formData) => {
    try {
      const res = await axios.post(`${baseUrl}/dist-admin-signup`, formData);
      // Handle success and error messages
      if (res.status == 200) {

        toast({
          title: 'Success.',
          description: 'District admin user account created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
        fetchData()
        setIsCreateNewUserActive(false)
      } else {
        toast({
          title: 'Error.',
          description: 'Failed to create user.',
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

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Center >
      <Box
        w={"md"}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
          >
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl' }}
            >
              Create District Admin
            </Heading>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full name</FormLabel>
              <Input
                placeholder="Full Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                id="fullName"
                {...formik.getFieldProps('fullName')}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <Box color="red.500" mt={1}>
                  {formik.errors.fullName}
                </Box>
              )}
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Phone number"
                _placeholder={{ color: 'gray.500' }}
                type="number"
                id="phoneNumber"
                {...formik.getFieldProps('phoneNumber')}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <Box color="red.500" mt={1}>
                  {formik.errors.phoneNumber}
                </Box>
              )}
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                id="email"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <Box color="red.500" mt={1}>
                  {formik.errors.email}
                </Box>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...formik.getFieldProps('password')}
                />
                <InputRightElement width="4.5rem">
                  {showPassword ? (
                    <ViewOffIcon onClick={handleTogglePassword} />
                  ) : (
                    <ViewIcon onClick={handleTogglePassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <Box color="red.500" mt={1}>
                  {formik.errors.password}
                </Box>
              )}
            </FormControl>
            <FormControl id="confirmPassword" isRequired isInvalid={formik.errors.confirmPassword}>
              <FormLabel>Confirm password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                />
                <InputRightElement width="4.5rem">
                  {showPassword ? (
                    <ViewOffIcon onClick={handleTogglePassword} />
                  ) : (
                    <ViewIcon onClick={handleTogglePassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <FormControl id="district" isRequired>
              <FormLabel>District</FormLabel>
              <Select
                placeholder="Select District"
                _placeholder={{ color: 'gray.500' }}
                id="district"
                {...formik.getFieldProps('district')}
              >
                {nepalDistrcitsList.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
              {formik.errors.district && formik.touched.district && (
                <Box color="red.500" mt={1}>
                  {formik.errors.district}
                </Box>
              )}
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
                onClick={() => setIsCreateNewUserActive(false)}
              >
                Cancel
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                type="submit"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default CreateUserForm;
