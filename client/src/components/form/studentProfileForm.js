import { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
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
  const imageInputRef = useRef()
  const { district } = useSelector(state => state.user)
  const toast = useToast();
  const [profileImageName, setProfileImageName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState()
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthCertificateNo, setBirthCertificateNo] = useState('')
  const [scholarship1Category, setScholarship1Category] = useState('')
  const [scholarship1Grade, setScholarship1Grade] = useState('')
  const [scholarship1From, setScholarship1From] = useState('')
  const [scholarship1To, setScholarship1To] = useState('')
  const [scholarship1Gpa, setScholarship1Gpa] = useState('')
  const [scholarship1Remarks, setScholarship1Remarks] = useState('')
  const [scholarship2Category, setScholarship2Category] = useState('')
  const [scholarship2Grade, setScholarship2Grade] = useState('')
  const [scholarship2From, setScholarship2From] = useState('')
  const [scholarship2To, setScholarship2To] = useState('')
  const [scholarship2Gpa, setScholarship2Gpa] = useState('')
  const [scholarship2Remarks, setScholarship2Remarks] = useState('')
  const [scholarship3Category, setScholarship3Category] = useState('')
  const [scholarship3Grade, setScholarship3Grade] = useState('')
  const [scholarship3From, setScholarship3From] = useState('')
  const [scholarship3To, setScholarship3To] = useState('')
  const [scholarship3Gpa, setScholarship3Gpa] = useState('')
  const [scholarship3Remarks, setScholarship3Remarks] = useState('')
  const [scholarship4Category, setScholarship4Category] = useState('')
  const [scholarship4Grade, setScholarship4Grade] = useState('')
  const [scholarship4From, setScholarship4From] = useState('')
  const [scholarship4To, setScholarship4To] = useState('')
  const [scholarship4Gpa, setScholarship4Gpa] = useState('')
  const [scholarship4Remarks, setScholarship4Remarks] = useState('')
  const [scholarship5Category, setScholarship5Category] = useState('')
  const [scholarship5Grade, setScholarship5Grade] = useState('')
  const [scholarship5From, setScholarship5From] = useState('')
  const [scholarship5To, setScholarship5To] = useState('')
  const [scholarship5Gpa, setScholarship5Gpa] = useState('')
  const [scholarship5Remarks, setScholarship5Remarks] = useState('')
  const [permanentMunicipality, setPermanentMunicipality] = useState('')
  const [permanentWardNumber, setPermanentWardNumber] = useState('')
  const [permanentDistrict, setPermanentDistrict] = useState('')
  const [permanentProvince, setPermanentProvince] = useState('')
  const [currentMunicipality, setCurrentMunicipality] = useState('')
  const [currentWardNumber, setCurrentWardNumber] = useState('')
  const [currentDistrict, setCurrentDistrict] = useState('')
  const [currentProvince, setCurrentProvince] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [principalName, setPrincipalName] = useState('')
  const [schoolNumber, setSchoolNumber] = useState('')
  const [contactPersonName, setContactPersonName] = useState('')
  const [contactPersonPosition, setContactPersonPosition] = useState('')
  const [contactPersonNumber, setContactPersonNumber] = useState('')
  const [schoolMunicipality, setSchoolMunicipality] = useState('')
  const [schoolWardNumber, setSschoolWardNumber] = useState('')
  const [schoolDistrict, setSchoolDistrict] = useState('')
  const [schoolProvince, setSchoolProvince] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [fatherAddress, setFatherAddress] = useState('')
  const [fatherCitizenshipNumber, setFatherCitizenshipNumber] = useState('')
  const [fatherOccupation, setFatherOccupation] = useState('')
  const [fatherContactNumber, setFatherContactNumber] = useState('')
  const [motherName, setMotherName] = useState('')
  const [motherAddress, setMotherAddress] = useState('')
  const [motherCitizenshipNumber, setMotherCitizenshipNumber] = useState('')
  const [motherOccupation, setMotherOccupation] = useState('')
  const [motherContactNumber, setMotherContactNumber] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianAddress, setGuardianAddress] = useState('')
  const [guardianCitizenshipNumber, setGuardianCitizenshipNumber] = useState('')
  const [guardianOccupation, setGuardianOccupation] = useState('')
  const [guardianContactNumber, setGuardianContactNumber] = useState('')

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)


  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   dateOfBirth: Yup.string().required("Date of birth is required"),
  //   gender: Yup.string().required('Gender is required'),
  //   contactNumber: Yup.string().required('Contact number is required'),
  // })

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: formData.firstName || '',
  //     lastName: formData.lastName || '',
  //     dateOfBirth: formData.dateOfBirth || '',
  //     gender: formData.gender || '',
  //     contactNumber: formData.contactNumber || '',
  //   },
  //   validationSchema,
  //   onSubmit: async(values) => {
  //     if (formik.isValid) {
  //       submitForm(values);
  //     }
  //   }
  // })

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const submitForm = async () => {
    try {
      if (selectedImage === null) {
        toast({
          title: 'Error',
          description: 'Please select a student image.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      }
      const formData = new FormData();
      if (selectedImage) {
        formData.append('profileImageName', selectedImage, selectedImage.filename);
      }
      formData.append('firstName', firstName)
      formData.append('middleName', middleName)
      formData.append('lastName', lastName)
      formData.append('gender', gender)
      formData.append('dateOfBirth', dateOfBirth)
      formData.append('contactNumber', contactNumber)
      formData.append('email', email)
      formData.append('birthCertificateNo', birthCertificateNo)
      formData.append('scholarship1Category', scholarship1Category)
      formData.append('scholarship1Grade', scholarship1Grade)
      formData.append('scholarship1From', scholarship1From)
      formData.append('scholarship1To', scholarship1To)
      formData.append('scholarship1Gpa', scholarship1Gpa)
      formData.append('scholarship1Remarks', scholarship1Remarks)
      formData.append('scholarship2Category', scholarship2Category)
      formData.append('scholarship2Grade', scholarship2Grade)
      formData.append('scholarship2From', scholarship2From)
      formData.append('scholarship2To', scholarship2To)
      formData.append('scholarship2Gpa', scholarship2Gpa)
      formData.append('scholarship2Remarks', scholarship2Remarks)
      formData.append('scholarship3Category', scholarship3Category)
      formData.append('scholarship3Grade', scholarship3Grade)
      formData.append('scholarship3From', scholarship3From)
      formData.append('scholarship3To', scholarship3To)
      formData.append('scholarship3Gpa', scholarship3Gpa)
      formData.append('scholarship3Remarks', scholarship3Remarks)
      formData.append('scholarship4Category', scholarship4Category)
      formData.append('scholarship4Grade', scholarship4Grade)
      formData.append('scholarship4From', scholarship4From)
      formData.append('scholarship4To', scholarship4To)
      formData.append('scholarship4Gpa', scholarship4Gpa)
      formData.append('scholarship4Remarks', scholarship4Remarks)
      formData.append('scholarship5Category', scholarship5Category)
      formData.append('scholarship5Grade', scholarship5Grade)
      formData.append('scholarship5From', scholarship5From)
      formData.append('scholarship5To', scholarship5To)
      formData.append('scholarship5Gpa', scholarship5Gpa)
      formData.append('scholarship5Remarks', scholarship5Remarks)
      formData.append('permanentMunicipality', permanentMunicipality)
      formData.append('permanentWardNumber', permanentWardNumber)
      formData.append('permanentDistrict', permanentDistrict)
      formData.append('permanentProvince', permanentProvince)
      formData.append('currentMunicipality', currentMunicipality)
      formData.append('currentWardNumber', currentWardNumber)
      formData.append('currentDistrict', district)
      formData.append('currentProvince', currentProvince)
      formData.append('schoolName', schoolName)
      formData.append('principalName', principalName)
      formData.append('schoolNumber', schoolNumber)
      formData.append('contactPersonName', contactPersonName)
      formData.append('contactPersonPosition', contactPersonPosition)
      formData.append('contactPersonNumber', contactPersonNumber)
      formData.append('schoolMunicipality', schoolMunicipality)
      formData.append('schoolWardNumber', schoolWardNumber)
      formData.append('schoolDistrict', schoolDistrict)
      formData.append('schoolProvince', schoolProvince)
      formData.append('fatherName', fatherName)
      formData.append('fatherAddress', fatherAddress)
      formData.append('fatherCitizenshipNumber', fatherCitizenshipNumber)
      formData.append('fatherOccupation', fatherOccupation)
      formData.append('fatherContactNumber', fatherContactNumber)
      formData.append('motherName', motherName)
      formData.append('motherAddress', motherAddress)
      formData.append('motherCitizenshipNumber', motherCitizenshipNumber)
      formData.append('motherOccupation', motherOccupation)
      formData.append('motherContactNumber', motherContactNumber)
      formData.append('guardianName', guardianName)
      formData.append('guardianAddress', guardianAddress)
      formData.append('guardianCitizenshipNumber', guardianCitizenshipNumber)
      formData.append('guardianOccupation', guardianOccupation)
      formData.append('guardianContactNumber', guardianContactNumber)

      const res = await axios.post(`${baseUrl}/create-student-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success and error messages
      if (res.status === 200) {
        toast({
          title: 'Success.',
          description: 'Student profile created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
        window.location.reload()

      } else {
        toast({
          title: 'Error.',
          description: 'Failed to create student profile.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }
    } catch (error) {
      console.error('Error updating image: ', error);
      toast({
        title: 'Error.',
        description: 'Failed to connect to server.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };
  const provincesOfNepal = [
    "Province 1",
    "Province 2",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province"
  ];
  const classOptions = ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10', 'Grade11', 'Grade12', 'Bachelors', 'Masters', "Diploma"];
  const scholarshipCategories = ["", "Special Focus Children", "Highly Vunerable Children", "Role Model (RM)"]
  const conditionalDistrictInputProps = {
  placeholder: 'District',
  name: "permanentAddress.district",
  ...(district !== "all" && { value: district }),
  isReadOnly: district === "all" ? "true" : "false",
  }

  return (
    <Center >
      <Box
        justify={'center'}
        m={5}
        bg="white"
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
                  border={'solid 1px lightgray'}
                  src={previewImage || require(`../../uploads/00-dummy-user-01.jpeg`)}
                  onClick={() => imageInputRef.current.click()}

                />
                <input
                  id='jobImage'
                  type='file'
                  accept='image/*'
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => { handleImageSelect(event) }}
                />
              </Center>
              <Box m={5} >
                <HStack justify="flex-start" mb={5} >
                  <FormControl>
                    <FormLabel >First name</FormLabel>
                    <Input
                      placeholder='First name'
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      isRequired
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Middle name</FormLabel>
                    <Input
                      placeholder='Middle name'
                      name="middleName"
                      // value={formData.middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      placeholder='Last name'
                      isRequired
                      name="lastName"
                      // value={formData.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </HStack>
                <HStack justify="flex-start" mb={5}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      placeholder='Select'
                      name="scholarship2.grade"
                      // value={formData.scholarship1.grade}
                      onChange={(event) => setGender(event.target.value)}
                    >
                      <option key="Male" value="Male">
                        Male
                      </option>
                      <option key="Female" value="Female">
                        Female
                      </option>
                      <option key="Other" value="Other">
                        Other
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input
                      type='date'
                      placeholder='Date of birth'
                      isRequired
                      name="dateOfBirth"
                      // value={formData.dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birth certificate number</FormLabel>
                    <Input
                      placeholder='Birth certificate no.'
                      type='number'
                      name="birthCertificateNo"
                      // value={formData.birthCertificateNo}
                      onChange={(e) => setBirthCertificateNo(e.target.value)}
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
                      // value={formData.contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email ID</FormLabel>
                    <Input
                      placeholder='Email id'
                      type='email'
                      name="email"
                      // value={formData.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </HStack>
              </Box>
            </Grid>
            {/* SCHOLARSHIP */}
            <FormLabel fontSize="22px" fontWeight="bold" >Scholarship</FormLabel>
            <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} >
              <FormLabel >SN</FormLabel>
              <FormLabel >Category</FormLabel>
              <FormLabel>Grade</FormLabel>
              <FormLabel>From</FormLabel>
              <FormLabel>To</FormLabel>
              <FormLabel>GPA</FormLabel>
              <FormLabel>Remarks</FormLabel>
            </Grid>
            <FormControl>
              {/* SCHOLARSHIP ONE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                 <Select
                  placeholder='Category'
                  name="scholarship1Category"
                  onChange={(event) => setScholarship1Category(event.target.value)}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select'
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(event) => setScholarship1Grade(event.target.value)}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
               
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship1From(e.target.value)}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship1To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship1Gpa(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship1Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP TWO */}
              <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                <FormLabel>2. </FormLabel>
                <Select
                  placeholder='Category'
                  name="scholarship2Category"
                  onChange={(event) => setScholarship2Category(event.target.value)}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select'
                  name="scholarship2.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(event) => setScholarship2Grade(event.target.value)}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship2From(e.target.value)}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship2To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship2Gpa(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship2Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP THREE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                <FormLabel>3. </FormLabel>
                <Select
                  placeholder='Category'
                  name="scholarship3Category"
                  onChange={(event) => setScholarship3Category(event.target.value)}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select'
                  name="scholarship3.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(event) => setScholarship3Grade(event.target.value)}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship3From(e.target.value)}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship3To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship3Gpa(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship3Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP FOUR */}
              <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                <FormLabel>4. </FormLabel>
                <Select
                  placeholder='Category'
                  name="scholarship4Category"
                  onChange={(event) => setScholarship4Category(event.target.value)}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select'
                  name="scholarship4.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(event) => setScholarship4Grade(event.target.value)}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship4From(e.target.value)}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship4To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship4Gpa(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship4Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP FIVE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                <FormLabel>5. </FormLabel>
                <Select
                  placeholder='Category'
                  name="scholarship5Category"
                  onChange={(event) => setScholarship5Category(event.target.value)}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder='Select'
                  name="scholarship5.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(event) => setScholarship5Grade(event.target.value)}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder='From'
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship5From(e.target.value)}
                />
                <Input
                  placeholder='To'
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship5To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='GPA'
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship5Gpa(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship5Remarks(e.target.value)}
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
                  // value={formData.permanentAddress.municipality}
                  onChange={(e) => setPermanentMunicipality(e.target.value)}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="permanentAddress.wardNumber"
                  // value={formData.permanentAddress.wardNumber}
                  onChange={(e) => setPermanentWardNumber(e.target.value)}
                />
                <Input
                  placeholder='District'
                  name="permanentAddress.district"
                  // value={formData.permanentAddress.district}
                  onChange={(e) => setPermanentDistrict(e.target.value)}
                />
                <Input
                  placeholder='Province'
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setPermanentProvince(e.target.value)}
                />
              </HStack>
            </FormControl>

            {/* CURRENT ADDRESS */}
            <FormControl>
              <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Current address</FormLabel>
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
                  // value={formData.permanentAddress.municipality}
                  onChange={(e) => setCurrentMunicipality(e.target.value)}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="permanentAddress.wardNumber"
                  // value={formData.permanentAddress.wardNumber}
                  onChange={(e) => setCurrentWardNumber(e.target.value)}
                />
                <Input
                  {...conditionalDistrictInputProps}
                />
                <Input
                  placeholder='Province'
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setCurrentProvince(e.target.value)}
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
                    // value={formData.school.schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                  <Input
                    placeholder='Principal name'
                    name="school.principalName"
                    // value={formData.school.principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                  />
                  <Input
                    placeholder='Contact no.'
                    name="school.contactNumber"
                    // value={formData.school.contactNumber}
                    onChange={(e) => setSchoolNumber(e.target.value)}
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
                  // value={formData.school.contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                />
                <Input
                  placeholder='Position'
                  name="school.contactPersonPosition"
                  // value={formData.school.contactPersonPosition}
                  onChange={(e) => setContactPersonPosition(e.target.value)}
                />
                <Input
                  placeholder='Contact number'
                  name="school.contactPersonNumber"
                  // value={formData.school.contactPersonNumber}
                  onChange={(e) => setContactPersonNumber(e.target.value)}
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
                  // value={formData.schoolAddress.municipality}
                  onChange={(e) => setSchoolMunicipality(e.target.value)}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="schoolAddress.wardNumber"
                  // value={formData.schoolAddress.wardNumber}
                  onChange={(e) => setSschoolWardNumber(e.target.value)}
                />
                <Input
                  placeholder='District'
                  name="schoolAddress.district"
                  // value={formData.schoolAddress.district}
                  onChange={(e) => setSchoolDistrict(e.target.value)}
                />
                <Input
                  placeholder='Province'
                  name="schoolAddress.province"
                  // value={formData.schoolAddress.province}
                  onChange={(e) => setSchoolProvince(e.target.value)}
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
                  // value={formData.father.name}
                  onChange={(e) => setFatherName(e.target.value)}
                />
                <Input
                  placeholder='Address'
                  name="father.address"
                  // value={formData.father.address}
                  onChange={(e) => setFatherAddress(e.target.value)}
                />
                <Input
                  placeholder='Citizenship number'
                  name="father.citizenshipNumber"
                  // value={formData.father.citizenshipNumber}
                  onChange={(e) => setFatherCitizenshipNumber(e.target.value)}
                />
                <Input
                  placeholder='Occupation'
                  name="father.occupation"
                  // value={formData.father.occupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                />
                <Input
                  placeholder='Contact number'
                  type='number'
                  name="father.contactNumber"
                  // value={formData.father.contactNumber}
                  onChange={(e) => setFatherContactNumber(e.target.value)}
                />
              </HStack>
            </FormControl>
            {/* FATHER */}
            <FormControl  >
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
                  name="father.name"
                  // value={formData.father.name}
                  onChange={(e) => setMotherName(e.target.value)}
                />
                <Input
                  placeholder='Address'
                  name="father.address"
                  // value={formData.father.address}
                  onChange={(e) => setMotherAddress(e.target.value)}
                />
                <Input
                  placeholder='Citizenship number'
                  name="father.citizenshipNumber"
                  // value={formData.father.citizenshipNumber}
                  onChange={(e) => setMotherCitizenshipNumber(e.target.value)}
                />
                <Input
                  placeholder='Occupation'
                  name="father.occupation"
                  // value={formData.father.occupation}
                  onChange={(e) => setMotherOccupation(e.target.value)}
                />
                <Input
                  placeholder='Contact number'
                  type='number'
                  name="father.contactNumber"
                  // value={formData.father.contactNumber}
                  onChange={(e) => setMotherContactNumber(e.target.value)}
                />
              </HStack>
            </FormControl>
            {/* FATHER */}
            <FormControl  >
              <FormLabel mt={5} fontSize="22px" fontWeight="bold">Guardian</FormLabel>
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
                  // value={formData.father.name}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
                <Input
                  placeholder='Address'
                  name="father.address"
                  // value={formData.father.address}
                  onChange={(e) => setGuardianAddress(e.target.value)}
                />
                <Input
                  placeholder='Citizenship number'
                  name="father.citizenshipNumber"
                  // value={formData.father.citizenshipNumber}
                  onChange={(e) => setGuardianCitizenshipNumber(e.target.value)}
                />
                <Input
                  placeholder='Occupation'
                  name="father.occupation"
                  // value={formData.father.occupation}
                  onChange={(e) => setGuardianOccupation(e.target.value)}
                />
                <Input
                  placeholder='Contact number'
                  type='number'
                  name="father.contactNumber"
                  // value={formData.father.contactNumber}
                  onChange={(e) => setGuardianContactNumber(e.target.value)}
                />
              </HStack>
            </FormControl>

          </Box>
          {/* BUTTONS */}
          <Box justifySelf="center" m={5}  >
            <Center>

            <Button colorScheme='red' mx={1} w={'200px'} >Cancel</Button>
            <Button onClick={() => submitForm()} colorScheme='green' mx={1} w={'200px'} >Save</Button>
            </Center>
          </Box>
        </form>
      </Box>
    </Center>
  );
};

export default StudentProfileForm;