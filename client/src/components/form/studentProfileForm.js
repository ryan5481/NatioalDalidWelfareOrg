import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Heading,
  useToast,
  Grid,
  FormControl,
  FormLabel,
  Image,
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
const baseUrl = process.env.REACT_APP_BASE_URL;

const StudentProfileForm = ({ setIsCreateNewUserActive, fetchData }) => {
  const toast = useToast();


  // const validationSchema = Yup.object().shape({
  //   fullName: Yup.string().required('Full name is required'),
  //   email: Yup.string().required('Email is required').email('Invalid email address'),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     fullName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     district: '',
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     // Remove confirmPassword from the formData before submitting
  //     const { confirmPassword, ...formData } = values;
  //     submitForm(formData);
  //   },
  // });

  // const submitForm = async (formData) => {
  //   try {
  //     const res = await axios.post(`${baseUrl}/dist-admin-signup`, formData);
  //     // Handle success and error messages
  //     if (res.status == 200) {

  //       toast({
  //         title: 'Success.',
  //         description: 'District admin user account created.',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //         position: 'top'
  //       });
  //       fetchData()
  //       setIsCreateNewUserActive(false)
  //     } else {
  //       toast({
  //         title: 'Error.',
  //         description: 'Failed to create user.',
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //         position: 'top'
  //       });
  //     }

  //   } catch (error) {
  //     console.error("Error updating image: ", error)
  //     toast({
  //       title: 'Error.',
  //       description: "Could not connect to server.",
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'top'
  //     });
  //   }
  // };


  return (
    <Center >
      <Box
        justify={'center'}
        mx={5}
        rounded={10}
        border={'solid 1px lightgray'}
      >
            <Heading mt={5} textAlign="center" fontSize="26px" >Create Student Profile</Heading>
        <form >
        <Box m={5} >
              <Grid gridTemplateColumns={"1fr 3fr"}>
                <Center>
               <Image
                  rounded={10}
                  maxW={'200px'}
                  maxH={'300px'}
                  src={require(`../../uploads/00-dummy-user-01.jpeg`)}
                />
                </Center>
                <Box m={5} >
                  <HStack justify="flex-start" mb={5} > 
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input placeholder='First name' />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Middle name</FormLabel>
                      <Input placeholder='Middle name' />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last name</FormLabel>
                      <Input placeholder='Last name' />
                    </FormControl>
                  </HStack>
                  <HStack justify="flex-start" mb={5}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Input placeholder='Gender' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input  placeholder='Date of birth' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birth certificate no.</FormLabel>
                    <Input  placeholder='Birth certificate no.' />
                  </FormControl>
                  </HStack>
                  <HStack justify="flex-start" mb={5}>
                  <FormControl>
                    <FormLabel>Contact no.</FormLabel>
                    <Input placeholder='Contact no.' />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email ID</FormLabel>
                    <Input  placeholder='Email id' />
                  </FormControl>
                  </HStack>
                </Box>
              </Grid>
              {/* SCHOLARSHIP */}
              <FormLabel fontSize="22px" fontWeight="bold" >Scholarship</FormLabel>
              <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel >Cartage</FormLabel>
                <FormLabel>Class</FormLabel>
                <FormLabel>From</FormLabel>
                <FormLabel>To</FormLabel>
                <FormLabel>Remarks</FormLabel>
              </Grid>
                <FormControl>
                  <HStack>
                    <Input placeholder='Cartage' />
                    <Input placeholder='Class' />
                    <Input placeholder='From' />
                    <Input placeholder='To' />
                    <Input placeholder='Remarks' />
                  </HStack>
                </FormControl>
              
              {/* PERMANANT ADDRESS */}
              
                <FormControl>
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Permanent address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder='Municipality' />
                    <Input placeholder='Ward no.' />
                    <Input placeholder='District' />
                    <Input placeholder='Province' />
                  </HStack>
                </FormControl>
              {/* TEMPORARY ADDRESS */}
        
                <FormControl>
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold" >Current address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                  <Input placeholder='Municipality' />
                    <Input placeholder='Ward no.' />
                    <Input placeholder='District' />
                    <Input placeholder='Province' />
                  </HStack>
                </FormControl>
              {/* SCHOOL */}
              
                <FormControl>
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold" >School</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Principal</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                    <FormLabel>Contact person pos.</FormLabel>
                    <FormLabel>Contact person No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder='School name' />
                    <Input placeholder='Principal name' />
                    <Input placeholder='Contact name' />
                    <Input placeholder='Contact person pos.' />
                    <Input placeholder='Contact person no.' />
                  </HStack>
                </FormControl>
              {/* SCHOOL ADDRESS */}
         
                <FormControl>
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold" >School address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                  <Input placeholder='Municipality' />
                    <Input placeholder='Ward no.' />
                    <Input placeholder='District' />
                    <Input placeholder='Province' />
                  </HStack>
                </FormControl>
              {/* FATHER */}
            
                <FormControl  >
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold">Father</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder='Name' />
                    <Input placeholder='Address' />
                    <Input placeholder='Citizenship number' />
                    <Input placeholder='Occupation' />
                    <Input placeholder='Contact no.' />
                  </HStack>
                </FormControl>
              {/* MOTHER */}
             
                <FormControl mt={5}  >
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold">Mother</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                  <Input placeholder='Name' />
                    <Input placeholder='Address' />
                    <Input placeholder='Citizenship number' />
                    <Input placeholder='Occupation' />
                    <Input placeholder='Contact no.' />
                  </HStack>
                </FormControl>
              {/* GUARDIAN */}
              
                <FormControl>
                  <FormLabel mt={5} fontSize="22px" fontWeight="bold" >Guardian</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                  <Input placeholder='Name' />
                    <Input placeholder='Address' />
                    <Input placeholder='Citizenship number' />
                    <Input placeholder='Occupation' />
                    <Input placeholder='Contact no.' />
                  </HStack>
                </FormControl>
            </Box>
            <Box justifyContent="center" m={5} mb={10} >
              <Button colorScheme='red' mx={1} w={'200px'} >Cancel</Button>
              <Button colorScheme='green' mx={1} w={'200px'} >Save</Button>
            </Box>
        </form>
      </Box>
    </Center>
  );
};

export default StudentProfileForm;
