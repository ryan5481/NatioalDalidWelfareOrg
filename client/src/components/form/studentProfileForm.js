import { useState, useRef, useEffect } from 'react';
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
  RadioGroup,
  Radio,
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
import provinces from "../datasets/provinces.json"
import districts from "../datasets/districts.json"
import municipalities from "../datasets/municipalities.json"
const baseUrl = process.env.REACT_APP_BASE_URL;
const nepalProvincesList = provinces.map(item => item.name).sort();
const nepalDistrcitsList = districts.map(item => item.name).sort();

const StudentProfileForm = ({ setIsCreateNewUserActive, fetchData, scholarshipProject }) => {
  const [isNewStudentForm, setIsnewStudentForm] = useState(true)
  const imageInputRef = useRef()
  const { district } = useSelector(state => state.user)
  const toast = useToast();
  const [profileImageName, setProfileImageName] = useState('')
  const [isPrlEthProject, setIsPrlEthProject] = useState(null)
  const [project, setProject] = useState("")
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState()
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [studentType, setStudentType] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthCertificateNo, setBirthCertificateNo] = useState('')
  const [scholarship1FundType, setScholarship1FundType] = useState('')
  const [scholarship1Category, setScholarship1Category] = useState('')
  const [scholarship1Grade, setScholarship1Grade] = useState('')
  const [scholarship1Field, setScholarship1Field] = useState('')
  const [scholarship1From, setScholarship1From] = useState('')
  const [scholarship1To, setScholarship1To] = useState('')
  const [scholarship1Gpa, setScholarship1Gpa] = useState('')
  const [scholarship1Remarks, setScholarship1Remarks] = useState('')
  const [scholarship2FundType, setScholarship2FundType] = useState('')
  const [scholarship2Category, setScholarship2Category] = useState('')
  const [scholarship2Grade, setScholarship2Grade] = useState('')
  const [scholarship2Field, setScholarship2Field] = useState('')
  const [scholarship2From, setScholarship2From] = useState('')
  const [scholarship2To, setScholarship2To] = useState('')
  const [scholarship2Gpa, setScholarship2Gpa] = useState('')
  const [scholarship2Remarks, setScholarship2Remarks] = useState('')
  const [scholarship3FundType, setScholarship3FundType] = useState('')
  const [scholarship3Category, setScholarship3Category] = useState('')
  const [scholarship3Grade, setScholarship3Grade] = useState('')
  const [scholarship3Field, setScholarship3Field] = useState('')
  const [scholarship3From, setScholarship3From] = useState('')
  const [scholarship3To, setScholarship3To] = useState('')
  const [scholarship3Gpa, setScholarship3Gpa] = useState('')
  const [scholarship3Remarks, setScholarship3Remarks] = useState('')
  const [scholarship4FundType, setScholarship4FundType] = useState('')
  const [scholarship4Category, setScholarship4Category] = useState('')
  const [scholarship4Grade, setScholarship4Grade] = useState('')
  const [scholarship4Field, setScholarship4Field] = useState('')
  const [scholarship4From, setScholarship4From] = useState('')
  const [scholarship4To, setScholarship4To] = useState('')
  const [scholarship4Gpa, setScholarship4Gpa] = useState('')
  const [scholarship4Remarks, setScholarship4Remarks] = useState('')
  const [scholarship5FundType, setScholarship5FundType] = useState('')
  const [scholarship5Category, setScholarship5Category] = useState('')
  const [scholarship5Grade, setScholarship5Grade] = useState('')
  const [scholarship5Field, setScholarship5Field] = useState('')
  const [scholarship5From, setScholarship5From] = useState('')
  const [scholarship5To, setScholarship5To] = useState('')
  const [scholarship5Gpa, setScholarship5Gpa] = useState('')
  const [scholarship5Remarks, setScholarship5Remarks] = useState('')
  const [scholarship6FundType, setScholarship6FundType] = useState('')
  const [scholarship6Category, setScholarship6Category] = useState('')
  const [scholarship6Grade, setScholarship6Grade] = useState('')
  const [scholarship6Field, setScholarship6Field] = useState('')
  const [scholarship6From, setScholarship6From] = useState('')
  const [scholarship6To, setScholarship6To] = useState('')
  const [scholarship6Gpa, setScholarship6Gpa] = useState('')
  const [scholarship6Remarks, setScholarship6Remarks] = useState('')
  const [scholarship7FundType, setScholarship7FundType] = useState('')
  const [scholarship7Category, setScholarship7Category] = useState('')
  const [scholarship7Grade, setScholarship7Grade] = useState('')
  const [scholarship7Field, setScholarship7Field] = useState('')
  const [scholarship7From, setScholarship7From] = useState('')
  const [scholarship7To, setScholarship7To] = useState('')
  const [scholarship7Gpa, setScholarship7Gpa] = useState('')
  const [scholarship7Remarks, setScholarship7Remarks] = useState('')
  const [scholarship8FundType, setScholarship8FundType] = useState('')
  const [scholarship8Category, setScholarship8Category] = useState('')
  const [scholarship8Grade, setScholarship8Grade] = useState('')
  const [scholarship8Field, setScholarship8Field] = useState('')
  const [scholarship8From, setScholarship8From] = useState('')
  const [scholarship8To, setScholarship8To] = useState('')
  const [scholarship8Gpa, setScholarship8Gpa] = useState('')
  const [scholarship8Remarks, setScholarship8Remarks] = useState('')
  const [scholarship9FundType, setScholarship9FundType] = useState('')
  const [scholarship9Category, setScholarship9Category] = useState('')
  const [scholarship9Grade, setScholarship9Grade] = useState('')
  const [scholarship9Field, setScholarship9Field] = useState('')
  const [scholarship9From, setScholarship9From] = useState('')
  const [scholarship9To, setScholarship9To] = useState('')
  const [scholarship9Gpa, setScholarship9Gpa] = useState('')
  const [scholarship9Remarks, setScholarship9Remarks] = useState('')
  const [scholarship10FundType, setScholarship10FundType] = useState('')
  const [scholarship10Category, setScholarship10Category] = useState('')
  const [scholarship10Grade, setScholarship10Grade] = useState('')
  const [scholarship10Field, setScholarship10Field] = useState('')
  const [scholarship10From, setScholarship10From] = useState('')
  const [scholarship10To, setScholarship10To] = useState('')
  const [scholarship10Gpa, setScholarship10Gpa] = useState('')
  const [scholarship10Remarks, setScholarship10Remarks] = useState('')
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

  const [selectedRadio, setSelectedRadio] = useState(null);

  //filter municipalities from selected district from selected province
  //PERMANENT ADDRESS
  let selectedPermanentProvince = {}
  if (permanentProvince) {
    selectedPermanentProvince = provinces.find(province => province.name == permanentProvince)
  }
  const selectedPermanentProvinceDistricts = selectedPermanentProvince !== null ? districts.filter(district => district.province_id === selectedPermanentProvince?.id) : nepalDistrcitsList

  let selectedPermanentDistrict = {}
  if (permanentDistrict) {
    selectedPermanentDistrict = districts.find(district => district.name == permanentDistrict)
  }
  const selectedPermanentDistrictMunicipalities = selectedPermanentDistrict ? municipalities.filter(municipality => municipality.district_id === selectedPermanentDistrict?.id) : []
  //CURRENT ADDRESS
  let selectedCurrentProvince = {}
  if (currentProvince) {
    selectedCurrentProvince = provinces.find(province => province.name == currentProvince)
  }
  const selectedCurrentProvinceDistricts = selectedCurrentProvince !== null ? districts.filter(district => district.province_id === selectedCurrentProvince?.id) : nepalDistrcitsList

  let selectedCurrentDistrict = {}
  if (currentDistrict) {
    selectedCurrentDistrict = districts.find(district => district.name == currentDistrict)
  }
  const selectedCurrentDistrictMunicipalities = selectedCurrentDistrict ? municipalities.filter(municipality => municipality.district_id === selectedCurrentDistrict?.id) : []

  //GET MUNICIPALITIES OF THE LOGGED DISTRICT ADMIN'S DISTRICT to AUTO UPDATE
  let loggedInDistrictObject = {}
  loggedInDistrictObject = districts.find(item => item.name == district)
  console.log(loggedInDistrictObject)
  const loggedInDistrictMunicipalities = municipalities.filter(municipality => municipality.district_id === loggedInDistrictObject?.id)

  //GET PROVINCE OF THE LOGGED DISTRICT ADMIN'S DISTRICT to AUTO UPDATE
  let loggedInProvinceId = loggedInDistrictObject?.province_id
  let loggedInProvinceObject = provinces.find(item => item.id == loggedInProvinceId)
  let loggedInDistAdminProvince = loggedInProvinceObject?.name

  //SCHOOL ADDRESS
  let selectedSchoolProvince = {}
  if (schoolProvince) {
    selectedSchoolProvince = provinces.find(province => province.name == schoolProvince)
  }
  const selectedSchoolProvinceDistricts = selectedSchoolProvince !== null ? districts.filter(district => district.province_id === selectedSchoolProvince?.id) : nepalDistrcitsList

  let selectedSchoolDistrict = {}
  if (schoolDistrict) {
    selectedSchoolDistrict = districts.find(district => district.name == schoolDistrict)
  }
  const selectedSchoolDistrictMunicipalities = selectedSchoolDistrict ? municipalities.filter(municipality => municipality.district_id === selectedSchoolDistrict?.id) : []

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
      formData.append('isPrlEthProject', scholarshipProject == "prlEth" ? true : false)
      if (scholarshipProject == "prlEth") {
        formData.append('project', project)
      } else {
        formData.append('project', "NCSEP")
      }
      formData.append('firstName', firstName)
      formData.append('middleName', middleName)
      formData.append('lastName', lastName)
      formData.append('gender', gender)
      formData.append('dateOfBirth', dateOfBirth)
      formData.append('ethnicity', ethnicity)
      formData.append('studentType', studentType)
      formData.append('contactNumber', contactNumber)
      formData.append('email', email)
      formData.append('birthCertificateNo', birthCertificateNo)
      formData.append('scholarship1FundType', scholarship1FundType)
      formData.append('scholarship1Category', scholarship1Category)
      formData.append('scholarship1Grade', scholarship1Grade)
      formData.append('scholarship1Field', scholarship1Field)
      formData.append('scholarship1From', scholarship1From)
      formData.append('scholarship1To', scholarship1To)
      formData.append('scholarship1Gpa', scholarship1Gpa)
      formData.append('scholarship1Remarks', scholarship1Remarks)
      formData.append('scholarship2FundType', scholarship2FundType)
      formData.append('scholarship2Category', scholarship2Category)
      formData.append('scholarship2Grade', scholarship2Grade)
      formData.append('scholarship2Field', scholarship2Field)
      formData.append('scholarship2From', scholarship2From)
      formData.append('scholarship2To', scholarship2To)
      formData.append('scholarship2Gpa', scholarship2Gpa)
      formData.append('scholarship2Remarks', scholarship2Remarks)
      formData.append('scholarship3FundType', scholarship3FundType)
      formData.append('scholarship3Category', scholarship3Category)
      formData.append('scholarship3Grade', scholarship3Grade)
      formData.append('scholarship3Field', scholarship3Field)
      formData.append('scholarship3From', scholarship3From)
      formData.append('scholarship3To', scholarship3To)
      formData.append('scholarship3Gpa', scholarship3Gpa)
      formData.append('scholarship3Remarks', scholarship3Remarks)
      formData.append('scholarship4FundType', scholarship4FundType)
      formData.append('scholarship4Category', scholarship4Category)
      formData.append('scholarship4Grade', scholarship4Grade)
      formData.append('scholarship4Field', scholarship4Field)
      formData.append('scholarship4From', scholarship4From)
      formData.append('scholarship4To', scholarship4To)
      formData.append('scholarship4Gpa', scholarship4Gpa)
      formData.append('scholarship4Remarks', scholarship4Remarks)
      formData.append('scholarship5FundType', scholarship5FundType)
      formData.append('scholarship5Category', scholarship5Category)
      formData.append('scholarship5Grade', scholarship5Grade)
      formData.append('scholarship5Field', scholarship5Field)
      formData.append('scholarship5From', scholarship5From)
      formData.append('scholarship5To', scholarship5To)
      formData.append('scholarship5Gpa', scholarship5Gpa)
      formData.append('scholarship5Remarks', scholarship5Remarks)
      formData.append('scholarship6FundType', scholarship6FundType)
      formData.append('scholarship6Category', scholarship6Category)
      formData.append('scholarship6Grade', scholarship6Grade)
      formData.append('scholarship6Field', scholarship6Field)
      formData.append('scholarship6From', scholarship6From)
      formData.append('scholarship6To', scholarship6To)
      formData.append('scholarship6Gpa', scholarship6Gpa)
      formData.append('scholarship6Remarks', scholarship6Remarks)
      formData.append('scholarship7FundType', scholarship7FundType)
      formData.append('scholarship7Category', scholarship7Category)
      formData.append('scholarship7Grade', scholarship7Grade)
      formData.append('scholarship7Field', scholarship7Field)
      formData.append('scholarship7From', scholarship7From)
      formData.append('scholarship7To', scholarship7To)
      formData.append('scholarship7Gpa', scholarship7Gpa)
      formData.append('scholarship7Remarks', scholarship7Remarks)
      formData.append('scholarship8FundType', scholarship8FundType)
      formData.append('scholarship8Category', scholarship8Category)
      formData.append('scholarship8Grade', scholarship8Grade)
      formData.append('scholarship8Field', scholarship8Field)
      formData.append('scholarship8From', scholarship8From)
      formData.append('scholarship8To', scholarship8To)
      formData.append('scholarship8Gpa', scholarship8Gpa)
      formData.append('scholarship8Remarks', scholarship8Remarks)
      formData.append('scholarship9FundType', scholarship9FundType)
      formData.append('scholarship9Category', scholarship9Category)
      formData.append('scholarship9Grade', scholarship9Grade)
      formData.append('scholarship9Field', scholarship9Field)
      formData.append('scholarship9From', scholarship9From)
      formData.append('scholarship9To', scholarship9To)
      formData.append('scholarship9Gpa', scholarship9Gpa)
      formData.append('scholarship9Remarks', scholarship9Remarks)
      formData.append('scholarship10FundType', scholarship10FundType)
      formData.append('scholarship10Category', scholarship10Category)
      formData.append('scholarship10Grade', scholarship10Grade)
      formData.append('scholarship10Field', scholarship10Field)
      formData.append('scholarship10From', scholarship10From)
      formData.append('scholarship10To', scholarship10To)
      formData.append('scholarship10Gpa', scholarship10Gpa)
      formData.append('scholarship10Remarks', scholarship10Remarks)
      formData.append('permanentMunicipality', permanentMunicipality)
      formData.append('permanentWardNumber', permanentWardNumber)
      formData.append('permanentDistrict', permanentDistrict)
      formData.append('permanentProvince', permanentProvince)
      formData.append('currentMunicipality', currentMunicipality)
      formData.append('currentWardNumber', currentWardNumber)
      formData.append('currentDistrict', district == "all" ? currentDistrict : district)
      formData.append('currentProvince', district == "all" ? currentProvince : loggedInDistAdminProvince)
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

      console.log(baseUrl)
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

  const scholarshipCategories =
    scholarshipProject == "prlEth"
      ? (["", "Pratap Ram Lohar", "ETHS Project"]) : (["", "Special Focus Children", "Highly Vunerable Children", "Role Model (RM)"])

  const dalitEthnicitiesList = ['Badi', 'Gandarva', 'Madeshi Origin', 'Pariyar', 'Sarki', 'Viswakarma']

  const conditionalDistrictInputProps = {
    placeholder: 'District',
    name: "permanentAddress.district",
    ...(district !== "all" && { value: district }),
    isReadOnly: district === "all" ? "true" : "false",
  }

  const handleRadioButton = (value) => {
    if (selectedRadio === value) {
      // Reset Guardian fields if the same radio button is clicked again
      // resetGuardianFields();
      setSelectedRadio(null);
    } else {
      setSelectedRadio(value);
      // Auto-populate Guardian fields based on the selected radio button
      populateGuardianFields(value);
    }
  };

  const populateGuardianFields = (radioValue) => {
    // Add logic to populate Guardian fields based on the radio button value
    if (radioValue === "father") {
      setGuardianName(fatherName);
      setGuardianAddress(fatherAddress);
      setGuardianCitizenshipNumber(fatherCitizenshipNumber);
      setGuardianOccupation(fatherOccupation);
      setGuardianContactNumber(fatherContactNumber);
    } else if (radioValue === "mother") {
      setGuardianName(motherName);
      setGuardianAddress(motherAddress);
      setGuardianCitizenshipNumber(motherCitizenshipNumber);
      setGuardianOccupation(motherOccupation);
      setGuardianContactNumber(motherContactNumber);
    }
  };

  useEffect(() => {
    // Enable input fields when no radio button is selected
    if (selectedRadio === null) {
      setGuardianName("");
      setGuardianAddress("");
      setGuardianCitizenshipNumber("");
      setGuardianOccupation("");
      setGuardianContactNumber("");
    }
  }, [selectedRadio]);

  //ADD SCHOLARSHIPFIELDS
  const [numFields, setNumFields] = useState(1);

  const handleAddField = () => {
    // Limit the number of fields to 5
    if (numFields < 10) {
      setNumFields(numFields + 1);
    }
  };

  const handleRemoveField = () => {
    // Limit the number of fields to 5
    if (numFields > 1) {
      setNumFields(numFields - 1);
    }
  };

  return (
    <>
      <Center >
        <Box
          justify={'center'}
          m={2}
          bg="white"
          rounded={10}
          border={'solid 1px lightgray'}
        >
          <Heading mt={5} textAlign="center" fontSize="26px" >New Student Form</Heading>
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
                  isRequired
                    type='file'
                    accept='image/*'
                    ref={imageInputRef}
                    style={{ display: "none" }}
                    onChange={(event) => { handleImageSelect(event) }}
                  />
                </Center>
                <Box m={5} >
                  {scholarshipProject == "prlEth" && <FormControl mb={5} maxW={"500px"} >
                    <FormLabel>Project</FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setProject(event.target.value)}
                    >
                      <option key="PRL" value="PRL">
                        Pratap Ram Lohar Memorial Scholarship Program
                      </option>
                      <option key="ETHS" value="ETHS">
                        Etela Tapiola High School
                      </option>
                    </Select>
                  </FormControl>}
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
                      <FormLabel>Ethnicity</FormLabel>
                      <Select
                        placeholder='Select'
                        // value={formData.scholarship1.grade}
                        onChange={(event) => setEthnicity(event.target.value)}
                      >
                        {dalitEthnicitiesList.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Student type</FormLabel>
                      <Select
                        placeholder='Select'
                        // value={formData.scholarship1.grade}
                        onChange={(event) => setStudentType(event.target.value)}
                      >
                        <option key="Normal" value="Normal">
                          None
                        </option>
                        <option key="Orphan" value="Orphan">
                          Orphan
                        </option>
                        <option key="Disabled" value="Disabled">
                          Disabled
                        </option>
                      </Select>
                    </FormControl>
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
              {/* <text>{numFields}</text> */}
              <FormLabel fontSize="22px" fontWeight="bold" >Scholarship</FormLabel>
              <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} >
                <FormLabel >SN</FormLabel>
                <FormLabel >Fund type</FormLabel>
                <FormLabel >Category</FormLabel>
                <FormLabel>Grade</FormLabel>
                <FormLabel>Field</FormLabel>
                <FormLabel>From</FormLabel>
                <FormLabel>To</FormLabel>
                <FormLabel>GPA</FormLabel>
                <FormLabel>Remarks</FormLabel>
              </Grid>
              <FormControl>
                {/* SCHOLARSHIP ONE */}
                {numFields >= 1 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>1. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship1FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
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
                      onChange={(event) => setScholarship1Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship1Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship1From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship1To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship1Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship1Remarks(e.target.value)}
                    />
                  </Grid>}
                {/* SCHOLARSHIP TWO */}
                {numFields >= 2 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>2. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship2FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
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
                      onChange={(event) => setScholarship2Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship2Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship2From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship2To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship2Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship2Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP THREE */}
                {numFields >= 3 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>3. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship3FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
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
                      placeholder='Field'
                      onChange={(e) => setScholarship3Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship3From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship3To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship3Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship3Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP FOUR */}
                {numFields >= 4 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>4. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship4FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
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
                      onChange={(event) => setScholarship4Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship4Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship4From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship4To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship4Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship4Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP FIVE */}
                {numFields >= 5 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>5. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship5FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
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
                      placeholder='Field'
                      onChange={(e) => setScholarship5Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship5From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship5To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship5Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship5Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP SIX */}
                {numFields >= 6 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>6. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship6FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
                      onChange={(event) => setScholarship6Category(event.target.value)}
                    >
                      {scholarshipCategories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship6Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship6Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      name="scholarship6.from"
                      // value={formData.scholarship1.from}
                      onChange={(e) => setScholarship6From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship6To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship6Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship6Remarks(e.target.value)}
                    />
                  </Grid>}
                {/* SCHOLARSHIP SEVEN */}
                {numFields >= 7 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>7. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship7FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
                      onChange={(event) => setScholarship7Category(event.target.value)}
                    >
                      {scholarshipCategories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship7Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship7Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship7From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship7To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship7Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship7Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP EIGHT */}
                {numFields >= 8 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>8. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship8FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
                      onChange={(event) => setScholarship8Category(event.target.value)}
                    >
                      {scholarshipCategories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship8Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship8Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship8From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship8To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship8Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship8Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP NINE */}
                {numFields >= 9 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>9. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship9FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
                      onChange={(event) => setScholarship9Category(event.target.value)}
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
                      onChange={(event) => setScholarship9Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship9Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship9From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship9To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship9Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship9Remarks(e.target.value)}
                    />
                  </Grid>
                }
                {/* SCHOLARSHIP TEN */}
                {numFields >= 10 &&
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                    <FormLabel>10. </FormLabel>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship10FundType(event.target.value)}
                    >
                      <option key="Nepal Endowment Fund" value="Nepal Endowment Fund">
                        Nepal Endowment Fund
                      </option>
                      <option key="Ansley Rose MacCormack Fund" value="Ansley Rose MacCormack Fund">
                        Ansley Rose MacCormack Fund
                      </option>
                    </Select>
                    <Select
                      placeholder='Category'
                      onChange={(event) => setScholarship10Category(event.target.value)}
                    >
                      {scholarshipCategories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder='Select'
                      onChange={(event) => setScholarship10Grade(event.target.value)}
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder='Field'
                      onChange={(e) => setScholarship10Field(e.target.value)}
                    />
                    <Input
                      placeholder='From'
                      type='date'
                      onChange={(e) => setScholarship10From(e.target.value)}
                    />
                    <Input
                      placeholder='To'
                      type='date'
                      onChange={(e) => setScholarship10To(e.target.value)}
                    />
                    <Input
                      type='number'
                      placeholder='GPA'
                      onChange={(e) => setScholarship10Gpa(e.target.value)}
                    />
                    <Input
                      placeholder='Remarks'
                      onChange={(e) => setScholarship10Remarks(e.target.value)}
                    />
                  </Grid>
                }
              </FormControl>
              { numFields < 10 && <Button mx={1} w="150px" h="30px" onClick={handleAddField} colorScheme="blue">Add field</Button>}
              { numFields > 1 && <Button mx={1} w="150px" h="30px" onClick={handleRemoveField} colorScheme="red">Remove field</Button>}

              {/* PERMANENT ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Permanent address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                  <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                  <Select
                    placeholder="Province"
                    onChange={(e) => setPermanentProvince(e.target.value)}
                  >
                    {nepalProvincesList.map((province, index) => (
                      <option key={index} value={province} >{province}</option>
                    ))}
                  </Select>
                  <Select
                    placeholder="District"
                    onChange={(e) => setPermanentDistrict(e.target.value)}
                  >
                    {selectedPermanentProvinceDistricts.map((district, index) => (
                      <option key={index} value={district.name} >{district.name}</option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Municipality"
                    onChange={(e) => setPermanentMunicipality(e.target.value)}
                  >
                    {selectedPermanentDistrictMunicipalities.map((municipality, index) => (
                      <option key={index} value={municipality.name} >{municipality.name}</option>
                    ))}
                  </Select>
                  <Input
                    placeholder='Ward no.'
                    type='number'
                    name="permanentAddress.wardNumber"
                    // value={formData.permanentAddress.wardNumber}
                    onChange={(e) => setPermanentWardNumber(e.target.value)}
                  />

                </HStack>
              </FormControl>

              {/* CURRENT ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Current address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                  <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                  {/* currentProvince is set to the district admin's district, is only selectable by super admin */}
                  {district == "all" ?
                    <Select
                      placeholder="Province"
                      onChange={(e) => setCurrentProvince(e.target.value)}
                    >
                      {nepalProvincesList.map((province, index) => (
                        <option key={index} value={province} >{province}</option>
                      ))}
                    </Select>
                    :
                    <Input
                      placeholder={loggedInDistAdminProvince}
                      s isDisabled
                    />
                  }
                  {/* currentDistrict is set to the district admin's district, is only selectable by super admin */}
                  {
                    district == "all" ?
                      <Select
                        placeholder="District"
                        onChange={(e) => setCurrentDistrict(e.target.value)}
                      >
                        {selectedCurrentProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                        ))}
                      </Select>
                      :
                      <Input
                        placeholder={district}
                        // value={formData.permanentAddress.wardNumber}
                        isDisabled
                      />
                  }
                  <Select
                    placeholder="Municipality"
                    onChange={(e) => setCurrentMunicipality(e.target.value)}
                  >
                    {
                      district == "all" ?
                        selectedCurrentDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                        ))
                        :
                        loggedInDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>))
                    }
                  </Select>
                  <Input
                    placeholder='Ward no.'
                    type='number'
                    onChange={(e) => setCurrentWardNumber(e.target.value)}
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
                <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Current address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                  <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                  <Select
                    placeholder="Province"
                    onChange={(e) => setSchoolProvince(e.target.value)}
                  >
                    {nepalProvincesList.map((province, index) => (
                      <option key={index} value={province} >{province}</option>
                    ))}
                  </Select>
                  <Select
                    placeholder="District"
                    onChange={(e) => setSchoolDistrict(e.target.value)}
                  >
                    {selectedSchoolProvinceDistricts.map((district, index) => (
                      <option key={index} value={district.name} >{district.name}</option>
                    ))}
                  </Select>
                  <Select
                    placeholder="Municipality"
                    onChange={(e) => setCurrentMunicipality(e.target.value)}
                  >
                    {selectedSchoolDistrictMunicipalities.map((municipality, index) => (
                      <option key={index} value={municipality.name} >{municipality.name}</option>
                    ))}
                  </Select>
                  <Input
                    placeholder='Ward no.'
                    type='number'
                    onChange={(e) => setSschoolWardNumber(e.target.value)}
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
                    type='number'
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
                    name="mother.name"
                    // value={formData.father.name}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                  <Input
                    placeholder='Address'
                    name="mother.address"
                    // value={formData.father.address}
                    onChange={(e) => setMotherAddress(e.target.value)}
                  />
                  <Input
                    placeholder='Citizenship number'
                    name="mother.citizenshipNumber"
                    type='number'
                    onChange={(e) => setMotherCitizenshipNumber(e.target.value)}
                  />
                  <Input
                    placeholder='Occupation'
                    name="mother.occupation"
                    // value={formData.father.occupation}
                    onChange={(e) => setMotherOccupation(e.target.value)}
                  />
                  <Input
                    placeholder='Contact number'
                    type='number'
                    name="motherContactNumber"
                    // value={formData.father.contactNumber}
                    onChange={(e) => setMotherContactNumber(e.target.value)}
                  />
                </HStack>
              </FormControl>
              {/* GUARDIAN */}

              <FormControl  >
                <FormLabel mt={5} fontSize="22px" fontWeight="bold">Guardian</FormLabel>

                <HStack>
                  <RadioGroup onChange={(value) => handleRadioButton(value)} value={selectedRadio}>
                    <HStack spacing={4}>
                      <Radio value="father">Same as Father</Radio>
                      <Radio value="mother">Same as Mother</Radio>
                    </HStack>
                  </RadioGroup>
                </HStack>
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
                    value={guardianName}
                    isDisabled={selectedRadio !== null}
                    onChange={(e) => setGuardianName(e.target.value)}
                  />
                  <Input
                    placeholder='Address'
                    value={guardianAddress}
                    isDisabled={selectedRadio !== null}
                    onChange={(e) => setGuardianAddress(e.target.value)}
                  />
                  <Input
                    placeholder='Citizenship number'
                    value={guardianCitizenshipNumber}
                    isDisabled={selectedRadio !== null}
                    onChange={(e) => setGuardianCitizenshipNumber(e.target.value)}
                  />
                  <Input
                    placeholder='Occupation'
                    value={guardianOccupation}
                    isDisabled={selectedRadio !== null}
                    onChange={(e) => setGuardianOccupation(e.target.value)}
                  />
                  <Input
                    placeholder='Contact number'
                    type='number'
                    value={guardianContactNumber}
                    isDisabled={selectedRadio !== null}
                    onChange={(e) => setGuardianContactNumber(e.target.value)}
                  />
                </HStack>
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

export default StudentProfileForm;