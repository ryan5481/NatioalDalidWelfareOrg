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
import AlumuniStudentForm from './alumuniStudentForm';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
const baseUrl = process.env.REACT_APP_BASE_URL;

const BoardMemberProfileForm = ({ setIsCreateNewUserActive, fetchData, scholarshipProject }) => {
  const [isNewStudentForm, setIsnewStudentForm] = useState(true)
  const imageInputRef = useRef()
  const toast = useToast();
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState()
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [citizenshipNumber, setCitizenshipNumber] = useState('')
  const [position1, setPosition1] = useState('')
  const [joinedDate1, setJoinedDate1] = useState('')
  const [tenure1, setTenure1] = useState('')
  const [remark1, setRemark1] = useState('')
  const [position2, setPosition2] = useState('')
  const [joinedDate2, setJoinedDate2] = useState('')
  const [tenure2, setTenure2] = useState('')
  const [remark2, setRemark2] = useState('')
  const [position3, setPosition3] = useState('')
  const [joinedDate3, setJoinedDate3] = useState('')
  const [tenure3, setTenure3] = useState('')
  const [remark3, setRemark3] = useState('')
  const [position4, setPosition4] = useState('')
  const [joinedDate4, setJoinedDate4] = useState('')
  const [tenure4, setTenure4] = useState('')
  const [remark4, setRemark4] = useState('')
  const [position5, setPosition5] = useState('')
  const [joinedDate5, setJoinedDate5] = useState('')
  const [tenure5, setTenure5] = useState('')
  const [remark5, setRemark5] = useState('')
  const [permanentMunicipality, setPermanentMunicipality] = useState('')
  const [permanentWardNo, setPermanentWardNo] = useState('')
  const [permanentDistrict, setPermanentDistrict] = useState('')
  const [permanentProvince, setPermanentProvince] = useState('')
  const [temporaryMunicipality, setTemporaryMunicipality] = useState('')
  const [temporaryWardNo, setTemporaryWardNo] = useState('')
  const [temporaryDistrict, setTemporaryDistrict] = useState('')
  const [temporaryProvince, setTemporaryProvince] = useState('')
  const [profession1, setProfession1] = useState('')
  const [organization1, setOrganization1] = useState('')
  const [address1, setAddress1] = useState('')
  const [startingDate1, setStartingDate1] = useState('')
  const [currentStatus1, setCurrentStatus1] = useState('')
  const [pRemark1, setPRemark1] = useState('')
  const [profession2, setProfession2] = useState('')
  const [organization2, setOrganization2] = useState('')
  const [address2, setAddress2] = useState('')
  const [startingDate2, setStartingDate2] = useState('')
  const [currentStatus2, setCurrentStatus2] = useState('')
  const [pRemark2, setPRemark2] = useState('')
  const [profession3, setProfession3] = useState('')
  const [organization3, setOrganization3] = useState('')
  const [address3, setAddress3] = useState('')
  const [startingDate3, setStartingDate3] = useState('')
  const [currentStatus3, setCurrentStatus3] = useState('')
  const [pRemark3, setPRemark3] = useState('')
  const [profession4, setProfession4] = useState('')
  const [organization4, setOrganization4] = useState('')
  const [address4, setAddress4] = useState('')
  const [startingDate4, setStartingDate4] = useState('')
  const [currentStatus4, setCurrentStatus4] = useState('')
  const [pRemark4, setPRemark4] = useState('')

  
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
      formData.append('dateOfBirth', dateOfBirth)
      formData.append('contactNumber', contactNumber)
      formData.append('email', email)
      formData.append('citizenshipNumber', citizenshipNumber)

      formData.append('position1', position1)
      formData.append('joinedDate1', joinedDate1)
      formData.append('tenure1', tenure1)
      formData.append('remark1', remark1)

      formData.append('position2', position2)
      formData.append('joinedDate2', joinedDate2)
      formData.append('tenure2', tenure2)
      formData.append('remark2', remark2)

      formData.append('position3', position3)
      formData.append('joinedDate3', joinedDate3)
      formData.append('tenure3', tenure3)
      formData.append('remark3', remark3)

      formData.append('position4', position4)
      formData.append('joinedDate4', joinedDate4)
      formData.append('tenure4', tenure4)
      formData.append('remark4', remark4)

      formData.append('position5', position5)
      formData.append('joinedDate5', joinedDate5)
      formData.append('tenure5', tenure5)
      formData.append('remark5', remark5)
      
      formData.append('permanentMunicipality', permanentMunicipality)
      formData.append('permanentWardNo', permanentWardNo)
      formData.append('permanentDistrict', permanentDistrict)
      formData.append('permanentProvince', permanentProvince)
      formData.append('temporaryMunicipality', temporaryMunicipality)
      formData.append('temporaryWardNo', temporaryWardNo)
      formData.append('temporaryDistrict', temporaryDistrict)
      formData.append('temporaryProvince', temporaryProvince)
      
      formData.append('profession1', profession1)
      formData.append('organization1', organization1)
      formData.append('address1', address1)
      formData.append('startingDate1', startingDate1)
      formData.append('currentStatus1', currentStatus1)
      formData.append('pRemark1', pRemark1)
      formData.append('profession2', profession2)
      formData.append('organization2', organization2)
      formData.append('address2', address2)
      formData.append('startingDate2', startingDate2)
      formData.append('currentStatus2', currentStatus2)
      formData.append('pRemark2', pRemark2)
      formData.append('profession3', profession3)
      formData.append('organization3', organization3)
      formData.append('address3', address3)
      formData.append('startingDate3', startingDate3)
      formData.append('currentStatus3', currentStatus3)
      formData.append('pRemark3', pRemark3)
      formData.append('profession4', profession4)
      formData.append('organization4', organization4)
      formData.append('address4', address4)
      formData.append('startingDate4', startingDate4)
      formData.append('currentStatus4', currentStatus4)
      formData.append('pRemark4', pRemark4)

      const res = await axios.post(`${baseUrl}/create-board-member-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success and error messages
      if (res.status === 200) {
        toast({
          title: 'Success.',
          description: 'Board member profile created.',
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

  
  return (
    <>
  
    <Center >
      <Box
        justify={'center'}
        m={5}
        bg="white"
        rounded={10}
        border={'solid 1px lightgray'}
      >
        <Heading mt={5} textAlign="center" fontSize="26px" >Board Member Profile Form</Heading>
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
                      placeholder='citizenshipNumber'
                      type='number'
                      name="citizenshipNumber"
                      // value={formData.birthCertificateNo}
                      onChange={(e) => setCitizenshipNumber(e.target.value)}
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
            <FormLabel fontSize="22px" fontWeight="bold" >Designation</FormLabel>
            <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} >
              <FormLabel >SN</FormLabel>
              <FormLabel >Position</FormLabel>
              <FormLabel>Joined date</FormLabel>
              <FormLabel>Tenure</FormLabel>
              <FormLabel>Remarks</FormLabel>
            </Grid>
            <FormControl>
              {/* Tenure ONE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder='Position'
                  onChange={(e) => setPosition1(e.target.value)}
                />
                <Input
                  type='date'
                  onChange={(e) => setJoinedDate1(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='Tenure'
                  name="tenure1"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setTenure1(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="remark1"
                  onChange={(e) => setRemark1(e.target.value)}
                />
              </Grid>
              {/* Tenure TWO */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>2. </FormLabel>
                <Input
                  placeholder='Position'
                  onChange={(e) => setPosition2(e.target.value)}
                />
                <Input
                  type='date'
                  onChange={(e) => setJoinedDate2(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='Tenure'
                  onChange={(e) => setTenure2(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="remark1"
                  onChange={(e) => setRemark2(e.target.value)}
                />
              </Grid>
              {/* Tenure THREE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>3. </FormLabel>
                <Input
                  placeholder='Position'
                  onChange={(e) => setPosition3(e.target.value)}
                />
                <Input
                  type='date'
                  onChange={(e) => setJoinedDate3(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='Tenure'
                  onChange={(e) => setTenure3(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  onChange={(e) => setRemark3(e.target.value)}
                />
              </Grid>
              {/* Tenure FOUR */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>4. </FormLabel>
                <Input
                  placeholder='Position'
                  onChange={(e) => setPosition4(e.target.value)}
                />
                <Input
                  type='date'
                  onChange={(e) => setJoinedDate4(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='Tenure'
                  onChange={(e) => setTenure4(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="remark1"
                  onChange={(e) => setRemark4(e.target.value)}
                />
              </Grid>
              {/* Tenure FIVE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>5. </FormLabel>
                <Input
                  placeholder='Position'
                  onChange={(e) => setPosition5(e.target.value)}
                />
                <Input
                  type='date'
                  onChange={(e) => setJoinedDate5(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder='Tenure'
                  onChange={(e) => setTenure5(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="remark1"
                  onChange={(e) => setRemark5(e.target.value)}
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
                  onChange={(e) => setPermanentWardNo(e.target.value)}
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
            <FormControl mb={5} >
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
                  onChange={(e) => setTemporaryMunicipality(e.target.value)}
                />
                <Input
                  placeholder='Ward no.'
                  type='number'
                  name="permanentAddress.wardNumber"
                  // value={formData.permanentAddress.wardNumber}
                  onChange={(e) => setTemporaryWardNo(e.target.value)}
                />
                
                <Input
                  placeholder='Province'
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setTemporaryDistrict(e.target.value)}
                />
                <Input
                  placeholder='Province'
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setTemporaryProvince(e.target.value)}
                />
              </HStack>
            </FormControl>
            <FormControl>
               {/* Tenure FIVE */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} >
              <FormLabel >SN</FormLabel>
              <FormLabel >Profession</FormLabel>
              <FormLabel>Organization</FormLabel>
              <FormLabel>Address</FormLabel>
              <FormLabel>Starting date</FormLabel>
              <FormLabel isTruncated >Status</FormLabel>
              <FormLabel>Remarks</FormLabel>
            </Grid>
            {/* PERSONAL ONE */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder='Profession'
                  name="profession1"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setProfession1(e.target.value)}
                />
                <Input
                  placeholder='Organization'
                  name="organization1"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setOrganization1(e.target.value)}
                />
                <Input
                  placeholder='address'
                  name="address1"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <Input
                  placeholder='startingDate1'
                  name="remark1"
                  type='date'
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setStartingDate1(e.target.value)}
                />
                <Input
                  placeholder='Current status'
                  name="remark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setCurrentStatus1(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="pRemark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setPRemark1(e.target.value)}
                />
              </Grid>
            {/* PERSONAL TWO */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>2. </FormLabel>
                <Input
                  placeholder='Profession'
                  name="profession1"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setProfession2(e.target.value)}
                />
                <Input
                  placeholder='Organization'
                  name="organization1"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setOrganization2(e.target.value)}
                />
                <Input
                  placeholder='address'
                  name="address1"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setAddress2(e.target.value)}
                />
                <Input
                  placeholder='startingDate1'
                  name="remark1"
                  type='date'
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setStartingDate2(e.target.value)}
                />
                <Input
                  placeholder='Current status'
                  name="remark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setCurrentStatus2(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="pRemark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setPRemark2(e.target.value)}
                />
              </Grid>
            {/* PERSONAL ONE */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>3. </FormLabel>
                <Input
                  placeholder='Profession'
                  name="profession1"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setProfession3(e.target.value)}
                />
                <Input
                  placeholder='Organization'
                  name="organization1"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setOrganization3(e.target.value)}
                />
                <Input
                  placeholder='address'
                  name="address1"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setAddress3(e.target.value)}
                />
                <Input
                  placeholder='startingDate1'
                  name="remark1"
                  type='date'
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setStartingDate3(e.target.value)}
                />
                <Input
                  placeholder='Current status'
                  name="remark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setCurrentStatus3(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="pRemark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setPRemark3(e.target.value)}
                />
              </Grid>
            {/* PERSONAL ONE */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>4. </FormLabel>
                <Input
                  placeholder='Profession'
                  name="profession1"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setProfession4(e.target.value)}
                />
                <Input
                  placeholder='Organization'
                  name="organization1"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setOrganization4(e.target.value)}
                />
                <Input
                  placeholder='address'
                  name="address1"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setAddress4(e.target.value)}
                />
                <Input
                  placeholder='startingDate1'
                  name="remark1"
                  type='date'
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setStartingDate4(e.target.value)}
                />
                <Input
                  placeholder='Current status'
                  name="remark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setCurrentStatus4(e.target.value)}
                />
                <Input
                  placeholder='Remarks'
                  name="pRemark1"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setPRemark4(e.target.value)}
                />
              </Grid>
            </FormControl>

          </Box>
          {/* BUTTONS */}
          <Box justifySelf="center" m={5}  >
            <Center>

            <Button colorScheme='red' mx={1} w={'200px'} onClick={() => setIsCreateNewUserActive(false)} >Cancel</Button>
            <Button onClick={() => submitForm()} colorScheme='green' mx={1} w={'200px'} >Save</Button>
            </Center>
          </Box>
        </form>
      </Box>
    </Center>
    </>
  );
};

export default BoardMemberProfileForm;