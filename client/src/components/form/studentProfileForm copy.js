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
  FormErrorMessage,
  VStack, // Add this import for error message display
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const baseUrl = process.env.REACT_APP_BASE_URL;

const StudentProfileForm = ({ setIsCreateNewUserActive, fetchData }) => {
  const toast = useToast();
  const initialFormData = {
    profileImageName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    birthCertificateNo: '',
    scholarship1: {
      scholarshipCartage: '',
      grade: '',
      from: '',
      to: '',
      gpa: '',
      remarks: '',
    },
    scholarship2: {
      scholarshipCartage: '',
      grade: '',
      from: '',
      to: '',
      gpa: '',
      remarks: '',
    },
    scholarship3: {
      scholarshipCartage: '',
      grade: '',
      from: '',
      to: '',
      gpa: '',
      remarks: '',
    },
    scholarship4: {
      scholarshipCartage: '',
      grade: '',
      from: '',
      to: '',
      gpa: '',
      remarks: '',
    },
    scholarship5: {
      scholarshipCartage: '',
      grade: '',
      from: '',
      to: '',
      gpa: '',
      remarks: '',
    },
    permanentAddress: {
      municipality: '',
      wardNumber: '',
      district: '',
      province: '',
    },
    currentAddress: {
      municipality: '',
      wardNumber: '',
      district: '',
      province: '',
    },
    school: {
      schoolName: '',
      principalName: '',
      contactNumber: '',
      contactPersonName: '',
      contactPersonPosition: '',
      contactPersonNumber: '',
    },
    schoolAddress: {
      municipality: '',
      wardNumber: '',
      district: '',
      province: '',
    },
    father: {
      name: '',
      address: '',
      citizenshipNumber: '',
      occupation: '',
      contactNumber: '',
    },
    mother: {
      name: '',
      address: '',
      citizenshipNumber: '',
      occupation: '',
      contactNumber: '',
    },
    guardian: {
      name: '',
      address: '',
      citizenshipNumber: '',
      occupation: '',
      contactNumber: '',
    },
    exStudents: {
      name: '',
      currentStatus: '',
      occupation: '',
      position: '',
      organization: '',
      municipality: '',
      wardNumber: '',
      district: '',
      province: '',
      email: '',
      contactNumber: '',
      citizenshipNumber: '',
      summit: '',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const [formData, setFormData] = useState(initialFormData);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required('Gender is required'),
    contactNumber: Yup.string().required('Contact number is required'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
      gender: formData.gender || '',
      contactNumber: formData.contactNumber || '',
    },
    validationSchema,
    onSubmit: async(values) => {
      if (formik.isValid) {
        submitForm(values);
      }
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name into nested levels
    const nameArray = name.split('.');

    // Handle nested state updates
    if (nameArray.length === 2) {
      setFormData({
        ...formData,
        [nameArray[0]]: {
          ...formData[nameArray[0]],
          [nameArray[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitForm = async (formData) => {
    try {
      const res = await axios.post(`${baseUrl}/create-student-profile`, formData);
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


  return (
    <Center >
      <Box
        justify={'center'}
        mx={5}
        rounded={10}
        border={'solid 1px lightgray'}
      >
        <Heading mt={5} textAlign="center" fontSize="26px" >Create Student Profile</Heading>
        <form
         onSubmit={submitForm}
        >
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
                    <FormLabel >First name</FormLabel>
                    <Input
                      placeholder='First name'
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      isRequired
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Middle name</FormLabel>
                    <Input
                      placeholder='Middle name'
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      placeholder='Last name'
                      isRequired
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </HStack>
                <HStack justify="flex-start" mb={5}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Input placeholder='Gender'
                      isRequired
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input 
                  type='date'
                  placeholder='Date of birth'
                      isRequired
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birth certificate number</FormLabel>
                    <Input
                      placeholder='Birth certificate no.'
                      type='number'
                      name="birthCertificateNo"
                      value={formData.birthCertificateNo}
                      onChange={handleChange}
                    />
                  </FormControl>
                </HStack>
                <HStack justify="flex-start" mb={5}>
                  <FormControl>
                    <FormLabel>Contact number</FormLabel>
                    <Input placeholder='Contact no.'
                      type='number'
                      isRequired
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email ID</FormLabel>
                    <Input
                      placeholder='Email id'
                      type='email'
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                </HStack>
              </Box>
            </Grid>
            {/* SCHOLARSHIP */}
            <FormLabel fontSize="22px" fontWeight="bold" >Scholarship</FormLabel>
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} >
              <FormLabel >SN</FormLabel>
              <FormLabel >Cartage</FormLabel>
              <FormLabel>Class</FormLabel>
              <FormLabel>From</FormLabel>
              <FormLabel>To</FormLabel>
              <FormLabel>GPA</FormLabel>
              <FormLabel>Remarks</FormLabel>
            </Grid>
            <FormControl>
            {/* SCHOLARSHIP ONE */}
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
              <FormLabel>1. </FormLabel>
                <Input
                  placeholder='Cartage'
                  name="scholarship1.scholarshipCartage"
                  value={formData.scholarship1.scholarshipCartage}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Class'
                  name="scholarship1.grade"
                  value={formData.scholarship1.grade}
                  onChange={handleChange}
                />
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  value={formData.scholarship1.from}
                  onChange={handleChange}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  value={formData.scholarship1.to}
                  onChange={handleChange}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  value={formData.scholarship1.gpa}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  value={formData.scholarship1.remarks}
                  onChange={handleChange}
                />
              </Grid>
            {/* SCHOLARSHIP TWO */}
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1}>
              <FormLabel>2. </FormLabel>
                <Input
                  placeholder='Cartage'
                  name="scholarship2.scholarshipCartage"
                  value={formData.scholarship2.scholarshipCartage}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Class'
                  name="scholarship2.grade"
                  value={formData.scholarship2.grade}
                  onChange={handleChange}
                />
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship2.from"
                  value={formData.scholarship2.from}
                  onChange={handleChange}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship2.to"
                  value={formData.scholarship2.to}
                  onChange={handleChange}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship2.gpa"
                  value={formData.scholarship2.gpa}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship2.remarks"
                  value={formData.scholarship2.remarks}
                  onChange={handleChange}
                />
              </Grid>
            {/* SCHOLARSHIP THREE */}
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1}>
              <FormLabel>3. </FormLabel>
                <Input
                  placeholder='Cartage'
                  name="scholarship3.scholarshipCartage"
                  value={formData.scholarship3.scholarshipCartage}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Class'
                  name="scholarship3.grade"
                  value={formData.scholarship3.grade}
                  onChange={handleChange}
                />
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship3.from"
                  value={formData.scholarship3.from}
                  onChange={handleChange}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship3.to"
                  value={formData.scholarship3.to}
                  onChange={handleChange}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship3.gpa"
                  value={formData.scholarship3.gpa}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship2.remarks"
                  value={formData.scholarship2.remarks}
                  onChange={handleChange}
                />
              </Grid>
            {/* SCHOLARSHIP FOUR */}
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1}>
              <FormLabel>4. </FormLabel>
                <Input
                  placeholder='Cartage'
                  name="scholarship4.scholarshipCartage"
                  value={formData.scholarship4.scholarshipCartage}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Class'
                  name="scholarship4.grade"
                  value={formData.scholarship4.grade}
                  onChange={handleChange}
                />
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship4.from"
                  value={formData.scholarship4.from}
                  onChange={handleChange}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship4.to"
                  value={formData.scholarship4.to}
                  onChange={handleChange}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship4.gpa"
                  value={formData.scholarship4.gpa}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship4.remarks"
                  value={formData.scholarship4.remarks}
                  onChange={handleChange}
                />
              </Grid>
            {/* SCHOLARSHIP FIVE */}
            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1}>
              <FormLabel>5. </FormLabel>
                <Input
                  placeholder='Cartage'
                  name="scholarship5.scholarshipCartage"
                  value={formData.scholarship5.scholarshipCartage}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Class'
                  name="scholarship5.grade"
                  value={formData.scholarship5.grade}
                  onChange={handleChange}
                />
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship5.from"
                  value={formData.scholarship5.from}
                  onChange={handleChange}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship5.to"
                  value={formData.scholarship5.to}
                  onChange={handleChange}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship5.gpa"
                  value={formData.scholarship5.gpa}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship5.remarks"
                  value={formData.scholarship5.remarks}
                  onChange={handleChange}
                />
              </Grid>
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
                <Input
                  placeholder='Municipality'
                  name="permanentAddress.municipality"
                  value={formData.permanentAddress.municipality}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="permanentAddress.wardNumber"
                  value={formData.permanentAddress.wardNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='District'
                  name="permanentAddress.district"
                  value={formData.permanentAddress.district}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Province'
                  name="permanentAddress.province"
                  value={formData.permanentAddress.province}
                  onChange={handleChange}
                />
              </HStack>
            </FormControl>

            {/* CURRENT ADDRESS */}
            <FormControl>
              <FormLabel mt={5} fontSize="22px" fontWeight="bold" >Current address</FormLabel>
              <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel >Municipality</FormLabel>
                <FormLabel>Ward No.</FormLabel>
                <FormLabel>District</FormLabel>
                <FormLabel>Province</FormLabel>
              </Grid>
              <HStack>
                <Input
                  placeholder='Municipality'
                  name="currentAddress.municipality"
                  value={formData.currentAddress.municipality}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="currentAddress.wardNumber"
                  value={formData.currentAddress.wardNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='District'
                  name="currentAddress.district"
                  value={formData.currentAddress.district}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Province'
                  name="currentAddress.province"
                  value={formData.currentAddress.province}
                  onChange={handleChange}
                />
              </HStack>
            </FormControl>

            {/* SCHOOL */}
            <FormControl>
              <FormLabel mt={5} fontSize="22px" fontWeight="bold" >School</FormLabel>
              <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} >
                <FormLabel >Name</FormLabel>
                <FormLabel>Principal</FormLabel>
                <FormLabel>Contact number</FormLabel>
              </Grid>
              <VStack>
                <HStack justify="flex-start" w="100%" >
                  <Input
                    placeholder='Name'
                    name="school.schoolName"
                    value={formData.school.schoolName}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Principal name'
                    name="school.principalName"
                    value={formData.school.principalName}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Contact no.'
                    name="school.contactNumber"
                    value={formData.school.contactNumber}
                    onChange={handleChange}
                  />
                </HStack>
              </VStack>
              <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} >
                <FormLabel>Contact person name</FormLabel>
                <FormLabel>Contact person position</FormLabel>
                <FormLabel>Contact person number</FormLabel>
              </Grid>
              <HStack justify="flex-start" w="100%">
                <Input
                  placeholder='Contact per. name'
                  name="school.contactPersonName"
                  value={formData.school.contactPersonName}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Position'
                  name="school.contactPersonPosition"
                  value={formData.school.contactPersonPosition}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Contact number'
                  name="school.contactPersonNumber"
                  value={formData.school.contactPersonNumber}
                  onChange={handleChange}
                />
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
                <Input
                  placeholder='Municipality'
                  name="schoolAddress.municipality"
                  value={formData.schoolAddress.municipality}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="schoolAddress.wardNumber"
                  value={formData.schoolAddress.wardNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='District'
                  name="schoolAddress.district"
                  value={formData.schoolAddress.district}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Province'
                  name="schoolAddress.province"
                  value={formData.schoolAddress.province}
                  onChange={handleChange}
                />
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
                <Input
                  placeholder='Name'
                  name="father.name"
                  value={formData.father.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Address'
                  name="father.address"
                  value={formData.father.address}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Citizenship number'
                  name="father.citizenshipNumber"
                  value={formData.father.citizenshipNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Occupation'
                  name="father.occupation"
                  value={formData.father.occupation}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Contact number'
                  type='number'
                  name="father.contactNumber"
                  value={formData.father.contactNumber}
                  onChange={handleChange}
                />
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
                <Input
                  placeholder='Name'
                  name="mother.name"
                  value={formData.mother.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Address'
                  name="mother.address"
                  value={formData.mother.address}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Citizenship number'
                  name="mother.citizenshipNumber"
                  value={formData.mother.citizenshipNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Occupation'
                  name="mother.occupation"
                  value={formData.mother.occupation}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Contact number'
                  name="mother.contactNumber"
                  value={formData.mother.contactNumber}
                  onChange={handleChange}
                />
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
                <Input
                  placeholder='Name'
                  name="guardian.name"
                  value={formData.guardian.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Address'
                  name="guardian.address"
                  value={formData.guardian.address}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Citizenship number'
                  name="guardian.citizenshipNumber"
                  value={formData.guardian.citizenshipNumber}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Occupation'
                  name="guardian.occupation"
                  value={formData.guardian.occupation}
                  onChange={handleChange}
                />
                <Input
                  placeholder='Contact number'
                  type='number'
                  name="guardian.contactNumber"
                  value={formData.guardian.contactNumber}
                  onChange={handleChange}
                />
              </HStack>
            </FormControl>
          </Box>
          {/* BUTTONS */}
          <Box justifyContent="center" m={5} mb={10} >
            <Button colorScheme='red' mx={1} w={'200px'} onClick={() => setIsCreateNewUserActive(false)} >Cancel</Button>
            <Button type='submit' colorScheme='green' mx={1} w={'200px'} >Save</Button>
          </Box>
        </form>
      </Box>
    </Center>
  );
};

export default StudentProfileForm;
