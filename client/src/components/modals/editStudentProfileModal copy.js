import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import {
  useToast, Grid, Image, Box, FormLabel, Editable, EditablePreview, EditableInput, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'
import { Form } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BASE_URL

const EditStudentProfileModal = ({ isOpen, onClose, data }) => {
  const imageInputRef = useRef()
  const toast = useToast()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')

  // const initialFormData = {
  //   profileImageName: '',
  //   firstName: '',
  //   middleName: '',
  //   lastName: '',
  //   gender: '',
  //   dateOfBirth: '',
  //   contactNumber: '',
  //   email: '',
  //   birthCertificateNo: '',
  
  //   scholarship1Cartage: '',
  //   scholarship1Grade: '',
  //   scholarship1From: '',
  //   scholarship1To: '',
  //   scholarship1Gpa: '',
  //   scholarship1Remarks: '',
  
  //   scholarship2Cartage: '',
  //   scholarship2Grade: '',
  //   scholarship2From: '',
  //   scholarship2To: '',
  //   scholarship2Gpa: '',
  //   scholarship2Remarks: '',
  
  //   scholarship3Cartage: '',
  //   scholarship3Grade: '',
  //   scholarship3From: '',
  //   scholarship3To: '',
  //   scholarship3Gpa: '',
  //   scholarship3Remarks: '',
  
  //   scholarship4Cartage: '',
  //   scholarship4Grade: '',
  //   scholarship4From: '',
  //   scholarship4To: '',
  //   scholarship4Gpa: '',
  //   scholarship4Remarks: '',
  
  //   scholarship5Cartage: '',
  //   scholarship5Grade: '',
  //   scholarship5From: '',
  //   scholarship5To: '',
  //   scholarship5Gpa: '',
  //   scholarship5Remarks: '',
  
  //   permanentMunicipality: '',
  //   permanentWardNumber: '',
  //   permanentDistrict: '',
  //   permanentProvince: '',
  
  //   currentMunicipality: '',
  //   currentWardNumber: '',
  //   currentDistrict: '',
  //   currentProvince: '',
  
  //   schoolName: '',
  //   principalName: '',
  //   schoolNumber: '',
  //   contactPersonName: '',
  //   contactPersonPosition: '',
  //   contactPersonNumber: '',
  //   schoolMunicipality: '',
  //   schoolWardNumber: '',
  //   schoolDistrict: '',
  //   schoolProvince: '',
  
  //   fatherName: '',
  //   fatherAddress: '',
  //   fatherCitizenshipNumber: '',
  //   fatherOccupation: '',
  //   fatherContactNumber: '',
  
  //   motherName: '',
  //   motherAddress: '',
  //   motherCitizenshipNumber: '',
  //   motherOccupation: '',
  //   motherContactNumber: '',
  
  //   guardianName: '',
  //   guardianAddress: '',
  //   guardianCitizenshipNumber: '',
  //   guardianOccupation: '',
  //   guardianContactNumber: '',
  // };
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null);

  const [profileImageName, setProfileImageName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState()
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [birthCertificateNo, setBirthCertificateNo] = useState('')
  const [scholarship1Cartage, setScholarship1Cartage] = useState('')
  const [scholarship1Grade, setScholarship1Grade] = useState('')
  const [scholarship1From, setScholarship1From] = useState('')
  const [scholarship1To, setScholarship1To] = useState('')
  const [scholarship1Gpa, setScholarship1Gpa] = useState('')
  const [scholarship1Remarks, setScholarship1Remarks] = useState('')
  const [scholarship2Cartage, setScholarship2Cartage] = useState('')
  const [scholarship2Grade, setScholarship2Grade] = useState('')
  const [scholarship2From, setScholarship2From] = useState('')
  const [scholarship2To, setScholarship2To] = useState('')
  const [scholarship2Gpa, setScholarship2Gpa] = useState('')
  const [scholarship2Remarks, setScholarship2Remarks] = useState('')
  const [scholarship3Cartage, setScholarship3Cartage] = useState('')
  const [scholarship3Grade, setScholarship3Grade] = useState('')
  const [scholarship3From, setScholarship3From] = useState('')
  const [scholarship3To, setScholarship3To] = useState('')
  const [scholarship3Gpa, setScholarship3Gpa] = useState('')
  const [scholarship3Remarks, setScholarship3Remarks] = useState('')
  const [scholarship4Cartage, setScholarship4Cartage] = useState('')
  const [scholarship4Grade, setScholarship4Grade] = useState('')
  const [scholarship4From, setScholarship4From] = useState('')
  const [scholarship4To, setScholarship4To] = useState('')
  const [scholarship4Gpa, setScholarship4Gpa] = useState('')
  const [scholarship4Remarks, setScholarship4Remarks] = useState('')
  const [scholarship5Cartage, setScholarship5Cartage] = useState('')
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
      formData.append('_id', data._id)
      formData.append('firstName', firstName)
      formData.append('middleName', middleName)
      formData.append('lastName', lastName)
      formData.append('gender', gender)
      formData.append('dateOfBirth', dateOfBirth)
      formData.append('contactNumber', contactNumber)
      formData.append('email', email)
      formData.append('birthCertificateNo', birthCertificateNo)
      formData.append('scholarship1Cartage', scholarship1Cartage)
      formData.append('scholarship1Grade', scholarship1Grade)
      formData.append('scholarship1From', scholarship1From)
      formData.append('scholarship1To', scholarship1To)
      formData.append('scholarship1Gpa', scholarship1Gpa)
      formData.append('scholarship1Remarks', scholarship1Remarks)
      formData.append('scholarship2Cartage', scholarship2Cartage)
      formData.append('scholarship2Grade', scholarship2Grade)
      formData.append('scholarship2From', scholarship2From)
      formData.append('scholarship2To', scholarship2To)
      formData.append('scholarship2Gpa', scholarship2Gpa)
      formData.append('scholarship2Remarks', scholarship2Remarks)
      formData.append('scholarship3Cartage', scholarship3Cartage)
      formData.append('scholarship3Grade', scholarship3Grade)
      formData.append('scholarship3From', scholarship3From)
      formData.append('scholarship3To', scholarship3To)
      formData.append('scholarship3Gpa', scholarship3Gpa)
      formData.append('scholarship3Remarks', scholarship3Remarks)
      formData.append('scholarship4Cartage', scholarship4Cartage)
      formData.append('scholarship4Grade', scholarship4Grade)
      formData.append('scholarship4From', scholarship4From)
      formData.append('scholarship4To', scholarship4To)
      formData.append('scholarship4Gpa', scholarship4Gpa)
      formData.append('scholarship4Remarks', scholarship4Remarks)
      formData.append('scholarship5Cartage', scholarship5Cartage)
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
      formData.append('currentDistrict', currentDistrict)
      formData.append('currentProvince', currentProvince)
      formData.append('schoolName', schoolName)
      formData.append('principalName', principalName)
      formData.append('schoolNumber', schoolNumber)
      formData.append('contactPersonName',contactPersonName)
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

      const res = await axios.put(`${baseUrl}/edit-student-profile`, formData, {
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

  console.log(data)

  
  return (
    <>
      {data &&
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
          size="6xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" fontSize="24px" >Edit Student Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody m={5} >
            <form
          onSubmit={submitForm}
        >
              <Grid gridTemplateColumns={"1fr 3fr"}>
                {data?.profileImageName && <Image
                  rounded={10}
                  src={require(`../../uploads/studentImage/${data?.profileImageName}`)} w="200px"
                  onClick={() => imageInputRef.current.click()}
                />}
                <input
                  id='jobImage'
                  type='file'
                  accept='image/*'
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageSelect}
              />
              <Box m={5} >
                <HStack justify="flex-start" mb={5} >
                  <FormControl>
                    <FormLabel >First name</FormLabel>
                    <Input
                      placeholder={data.firstName}
                      // value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      isRequired
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Middle name</FormLabel>
                    <Input
                      placeholder={data.middleName}
                      name="middleName"
                      // value={formData.middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      placeholder={data.lastName}
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
                    <Input placeholder={data.gender}
                      isRequired
                      name="gender"
                      // value={formData.gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input
                      type='date'
                      placeholder={data.dateOfBirth}
                      isRequired
                      name="dateOfBirth"
                      // value={formData.dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birth certificate number</FormLabel>
                    <Input
                      placeholder={data.birthCertificateNo}
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
                    <Input placeholder={data.contactNumber}
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
                      placeholder={data.email}
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
              <FormControl>
              <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Scholarship</FormLabel>
              <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr"} gap={5} >
              <FormLabel >SN</FormLabel>
                <FormLabel >Cartage</FormLabel>
                <FormLabel>Class</FormLabel>
                <FormLabel>From</FormLabel>
                <FormLabel>To</FormLabel>
                <FormLabel>Remarks</FormLabel>
              </Grid>
              {/* SCHOLARSHIP ONE */}

              <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data.scholarship1Cartage}
                  name="scholarship1.scholarshipCartage"
                  // value={formData.scholarship1.scholarshipCartage}
                  onChange={(e) => setScholarship1Cartage(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship1Grade}
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(e) => setScholarship1Grade(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship1From}
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship1From(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship1To}
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship1To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder={data.scholarship1Gpa}
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship1Gpa(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship1Remarks}
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship1Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP TWO */}
                            <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data.scholarship2Cartage}
                  name="scholarship1.scholarshipCartage"
                  // value={formData.scholarship1.scholarshipCartage}
                  onChange={(e) => setScholarship2Cartage(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship2Grade}
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(e) => setScholarship2Grade(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship2From}
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship2From(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship2To}
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship2To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder={data.scholarship2Gpa}
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship2Gpa(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship2Remarks}
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship2Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP THREE */}
              <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data.scholarship3Cartage}
                  name="scholarship1.scholarshipCartage"
                  // value={formData.scholarship1.scholarshipCartage}
                  onChange={(e) => setScholarship3Cartage(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship3Grade}
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(e) => setScholarship3Grade(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship3From}
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship3From(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship3To}
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship3To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder={data.scholarship3Gpa}
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship3Gpa(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship3Remarks}
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship3Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP FOUR */}
              <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data.scholarship4Cartage}
                  name="scholarship1.scholarshipCartage"
                  // value={formData.scholarship1.scholarshipCartage}
                  onChange={(e) => setScholarship4Cartage(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship4Grade}
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(e) => setScholarship4Grade(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship4From}
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship4From(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship4To}
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship4To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder={data.scholarship4Gpa}
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship4Gpa(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship4Remarks}
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship4Remarks(e.target.value)}
                />
              </Grid>
              {/* SCHOLARSHIP FIVE */}
              <Grid gridTemplateColumns={"0.1fr 0.7fr 0.5fr 0.7fr 0.7fr 0.4fr 1.5fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data.scholarship5Cartage}
                  name="scholarship1.scholarshipCartage"
                  // value={formData.scholarship1.scholarshipCartage}
                  onChange={(e) => setScholarship5Cartage(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship5Grade}
                  name="scholarship1.grade"
                  // value={formData.scholarship1.grade}
                  onChange={(e) => setScholarship5Grade(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship5From}
                  type='date'
                  name="scholarship1.from"
                  // value={formData.scholarship1.from}
                  onChange={(e) => setScholarship5From(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship5To}
                  type='date'
                  name="scholarship1.to"
                  // value={formData.scholarship1.to}
                  onChange={(e) => setScholarship5To(e.target.value)}
                />
                <Input
                  type='number'
                  placeholder={data.scholarship5Gpa}
                  name="scholarship1.gpa"
                  // value={formData.scholarship1.gpa}
                  onChange={(e) => setScholarship5Gpa(e.target.value)}
                />
                <Input
                  placeholder={data.scholarship5Remarks}
                  name="scholarship1.remarks"
                  // value={formData.scholarship1.remarks}
                  onChange={(e) => setScholarship5Remarks(e.target.value)}
                />
              </Grid>
              {/* PERMANANT ADDRESS */}
              </FormControl>
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                <Input
                  placeholder={data.permanentMunicipality}
                  name="permanentAddress.municipality"
                  // value={formData.permanentAddress.municipality}
                  onChange={(e) => setPermanentMunicipality(e.target.value)}
                />
                <Input
                  placeholder={data.permanentWardNumber}
                  type='number'
                  name="permanentAddress.wardNumber"
                  // value={formData.permanentAddress.wardNumber}
                  onChange={(e) => setPermanentWardNumber(e.target.value)}
                />
                <Input
                  placeholder={data.permanentDistrict}
                  name="permanentAddress.district"
                  // value={formData.permanentAddress.district}
                  onChange={(e) => setPermanentDistrict(e.target.value)}
                />
                <Input
                  placeholder={data.permanentProvince}
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setPermanentProvince(e.target.value)}
                />
              </HStack>
                </FormControl>
              {/* CURRENT ADDRESS */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Current address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                  placeholder={data.currentMunicipality}
                  name="permanentAddress.municipality"
                  // value={formData.permanentAddress.municipality}
                  onChange={(e) => setCurrentMunicipality(e.target.value)}
                />
                <Input
                  placeholder={data.currentWardNumber}
                  type='number'
                  name="permanentAddress.wardNumber"
                  // value={formData.permanentAddress.wardNumber}
                  onChange={(e) => setCurrentWardNumber(e.target.value)}
                />
                <Input
                  placeholder={data.currentDistrict}
                  name="permanentAddress.district"
                  // value={formData.permanentAddress.district}
                  onChange={(e) => setCurrentDistrict(e.target.value)}
                />
                <Input
                  placeholder={data.currentProvince}
                  name="permanentAddress.province"
                  // value={formData.permanentAddress.province}
                  onChange={(e) => setCurrentProvince(e.target.value)}
                />
                  </HStack>
                </FormControl>
              {/* SCHOOL */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >School</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Principal</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                    <FormLabel>Contact person name</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                    placeholder={data.schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                  <Input
                    placeholder={data.principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                  />
                  <Input
                    placeholder={data.schoolNumber}
                    onChange={(e) => setSchoolNumber(e.target.value)}
                  />
                  </HStack>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} >
                    <FormLabel>Contact person name</FormLabel>
                    <FormLabel>Contact person pos.</FormLabel>
                    <FormLabel>Contact person No.</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                  placeholder={data.contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                />
                <Input
                  placeholder={data.contactPersonPosition}
                  onChange={(e) => setContactPersonPosition(e.target.value)}
                />
                <Input
                  placeholder={data.contactPersonNumber}
                  onChange={(e) => setContactPersonNumber(e.target.value)}
                />
                  </HStack>
                </FormControl>
              {/* SCHOOL ADDRESS */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >School address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                  placeholder={data.schoolMunicipality}
                  onChange={(e) => setSchoolMunicipality(e.target.value)}
                />
                <Input
                  placeholder={data.schoolWardNumber}
                  onChange={(e) => setSschoolWardNumber(e.target.value)}
                />
                <Input
                  placeholder={data.schoolDistrict}
                  onChange={(e) => setSchoolDistrict(e.target.value)}
                />
                <Input
                  placeholder={data.schoolProvince}
                  onChange={(e) => setSchoolProvince(e.target.value)}
                />
                  </HStack>
                </FormControl>
              {/* FATHER */}
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Father</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                  placeholder={data.fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
                <Input
                  placeholder={data.fatherAddress}
                  onChange={(e) => setFatherAddress(e.target.value)}
                />
                <Input
                  placeholder={data.fatherCitizenshipNumber}
                  onChange={(e) => setFatherCitizenshipNumber(e.target.value)}
                />
                <Input
                  placeholder={data.fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                />
                <Input
                  placeholder={data.fatherContactNumber}
                  onChange={(e) => setFatherContactNumber(e.target.value)}
                />
                  </HStack>
                </FormControl>
              {/* MOTHER */}
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Mother</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input
                     placeholder={data.motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                     />
                    <Input 
                    placeholder={data.motherAddress}
                    onChange={(e) => setMotherAddress(e.target.value)} 
                    />
                    <Input 
                    placeholder={data.motherCitizenshipNumber}
                    onChange={(e) => setMotherCitizenshipNumber(e.target.value)} 
                    />
                    <Input 
                    placeholder={data.motherOccupation}
                    onChange={(e) => setMotherOccupation(e.target.value)} 
                    />
                    <Input 
                    placeholder={data.motherContactNumber}
                    onChange={(e) => setMotherContactNumber(e.target.value)} 
                    />
                  </HStack>
                </FormControl>
              {/* GUARDIAN */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Guardian</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                  <Input
                  placeholder={data.guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
                <Input
                  placeholder={data.guardianAddress}
                  onChange={(e) => setGuardianAddress(e.target.value)}
                />
                <Input
                  placeholder={data.guardianCitizenshipNumber}
                  onChange={(e) => setGuardianCitizenshipNumber(e.target.value)}
                />
                <Input
                  placeholder={data.guardianOccupation}
                  onChange={(e) => setGuardianOccupation(e.target.value)}
                />
                <Input
                  placeholder={data.guardianContactNumber}
                  onChange={(e) => setGuardianContactNumber(e.target.value)}
                />
                  </HStack>
                </FormControl>
                </form>
            </ModalBody>
            <ModalFooter justifyContent="center" >
              <Button colorScheme='red' mx={1} w={'200px'} onClick={onClose}>Cancel</Button>
              <Button colorScheme='green' mx={1} w={'200px'} onClick={()=> submitForm()} >Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>}
    </>
  )
}

export default EditStudentProfileModal