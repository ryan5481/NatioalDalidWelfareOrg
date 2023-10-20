import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import {
  useToast, Grid, Image, Box, FormLabel, Select, useDisclosure, EditableInput, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'
import Confirm2FAPopUp from '../popUps/confirm2FaPopUp'
import provinces from "../datasets/provinces.json"
import districts from "../datasets/districts.json"
import municipalities from "../datasets/municipalities.json"
const baseUrl = process.env.REACT_APP_BASE_URL
const nepalProvincesList = provinces.map(item => item.name).sort();
const nepalDistrcitsList = districts.map(item => item.name).sort();

const EditStudentProfileModal = ({ isOpen, onClose, data, scholarshipProject }) => {
  const { district, userRole } = useSelector(state => state.user)
  const imageInputRef = useRef()
  const toast = useToast()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    // CHECK 2FA TO SUBMIT EDIT
    const { onOpen } = useDisclosure();
    const [isCheck2FaDialogOpen, setIsCheck2FaDialogOpen] = useState(false);
  const initialFormData = {
    // profileImageName: '',
    project: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    studentType: '',
    contactNumber: '',
    email: '',
    birthCertificateNo: '',

    scholarship1FundType: '',
    scholarship1Category: '',
    scholarship1Grade: '',
    scholarship1From: '',
    scholarship1To: '',
    scholarship1Gpa: '',
    scholarship1Remarks: '',

    scholarship2FundType: '',
    scholarship2Category: '',
    scholarship2Grade: '',
    scholarship2From: '',
    scholarship2To: '',
    scholarship2Gpa: '',
    scholarship2Remarks: '',

    scholarship3FundType: '',
    scholarship3Category: '',
    scholarship3Grade: '',
    scholarship3From: '',
    scholarship3To: '',
    scholarship3Gpa: '',
    scholarship3Remarks: '',

    scholarship4FundType: '',
    scholarship4Category: '',
    scholarship4Grade: '',
    scholarship4From: '',
    scholarship4To: '',
    scholarship4Gpa: '',
    scholarship4Remarks: '',

    scholarship5FundType: '',
    scholarship5Category: '',
    scholarship5Grade: '',
    scholarship5From: '',
    scholarship5To: '',
    scholarship5Gpa: '',
    scholarship5Remarks: '',

    permanentMunicipality: '',
    permanentWardNumber: '',
    permanentDistrict: '',
    permanentProvince: '',

    currentMunicipality: '',
    currentWardNumber: '',
    currentDistrict: '',
    currentProvince: '',

    schoolName: '',
    principalName: '',
    schoolNumber: '',
    contactPersonName: '',
    contactPersonPosition: '',
    contactPersonNumber: '',
    schoolMunicipality: '',
    schoolWardNumber: '',
    schoolDistrict: '',
    schoolProvince: '',

    fatherName: '',
    fatherAddress: '',
    fatherCitizenshipNumber: '',
    fatherOccupation: '',
    fatherContactNumber: '',

    motherName: '',
    motherAddress: '',
    motherCitizenshipNumber: '',
    motherOccupation: '',
    motherContactNumber: '',

    guardianName: '',
    guardianAddress: '',
    guardianCitizenshipNumber: '',
    guardianOccupation: '',
    guardianContactNumber: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (scholarshipProject !== "prlEth"){
      setFormData((prevData) => ({...prevData, project: "NCSEP", [name]: value}))
    }else {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  useEffect(() => {
    setFormData({
      project: data?.project,
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      gender: data?.gender,
      dateOfBirth: data?.dateOfBirth,
      studentType: data?.studentType,
      birthCertificateNo: data?.birthCertificateNo,
      contactNumber: data?.contactNumber,
      email: data?.email,

      scholarship1FundType: data?.scholarship1FundType,
      scholarship1Category: data?.scholarship1Category,
      scholarship1Grade: data?.scholarship1Grade,
      scholarship1From: data?.scholarship1From,
      scholarship1To: data?.scholarship1To,
      scholarship1Gpa: data?.scholarship1Gpa,
      scholarship1Remarks: data?.scholarship1Remarks,

      scholarship2FundType: data?.scholarship2FundType,
      scholarship2Category: data?.scholarship2Category,
      scholarship2Grade: data?.scholarship2Grade,
      scholarship2From: data?.scholarship2From,
      scholarship2To: data?.scholarship2To,
      scholarship2Gpa: data?.scholarship2Gpa,
      scholarship2Remarks: data?.scholarship2Remarks,

      scholarship3FundType: data?.scholarship3FundType,
      scholarship3Category: data?.scholarship3Category,
      scholarship3Grade: data?.scholarship3Grade,
      scholarship3From: data?.scholarship3From,
      scholarship3To: data?.scholarship3To,
      scholarship3Gpa: data?.scholarship3Gpa,
      scholarship3Remarks: data?.scholarship3Remarks,

      scholarship4FundType: data?.scholarship4FundType,
      scholarship4Category: data?.scholarship4Category,
      scholarship4Grade: data?.scholarship4Grade,
      scholarship4From: data?.scholarship4From,
      scholarship4To: data?.scholarship4To,
      scholarship4Gpa: data?.scholarship4Gpa,
      scholarship4Remarks: data?.scholarship4Remarks,

      scholarship4FundType: data?.scholarship4FundType,
      scholarship5Category: data?.scholarship5Category,
      scholarship5Grade: data?.scholarship5Grade,
      scholarship5From: data?.scholarship5From,
      scholarship5To: data?.scholarship5To,
      scholarship5Gpa: data?.scholarship5Gpa,
      scholarship5Remarks: data?.scholarship5Remarks,

      permanentMunicipality: data?.permanentMunicipality,
      permanentWardNumber: data?.permanentWardNumber,
      permanentDistrict: data?.permanentDistrict,
      permanentProvince: data?.permanentProvince,

      currentMunicipality: data?.currentMunicipality,
      currentWardNumber: data?.currentWardNumber,
      currentDistrict: data?.currentDistrict,
      currentProvince: data?.currentProvince,

      schoolName: data?.schoolName,
      principalName: data?.principalName,
      schoolNumber: data?.schoolNumber,
      contactPersonName: data?.contactPersonName,
      contactPersonPosition: data?.contactPersonPosition,
      contactPersonNumber: data?.contactPersonNumber,
      schoolMunicipality: data?.schoolMunicipality,
      schoolWardNumber: data?.schoolWardNumber,
      schoolDistrict: data?.schoolDistrict,
      schoolProvince: data?.schoolProvince,

      fatherName: data?.fatherName,
      fatherAddress: data?.fatherAddress,
      fatherCitizenshipNumber: data?.fatherCitizenshipNumber,
      fatherOccupation: data?.fatherOccupation,
      fatherContactNumber: data?.fatherContactNumber,

      motherName: data?.motherName,
      motherAddress: data?.motherAddress,
      motherCitizenshipNumber: data?.motherCitizenshipNumber,
      motherOccupation: data?.motherOccupation,
      motherContactNumber: data?.motherContactNumber,

      guardianName: data?.guardianName,
      guardianAddress: data?.guardianAddress,
      guardianCitizenshipNumber: data?.guardianCitizenshipNumber,
      guardianOccupation: data?.guardianOccupation,
      guardianContactNumber: data?.guardianContactNumber,
    })
  }, [])

    //CONFIRM 2FA CODE TO EDIT 
    const openCheck2FaModal = (student) => {
      // setStudentProfileTodelete(student)
      setIsCheck2FaDialogOpen(true);
      onOpen()
  };

  const closeCheck2FaModal = () => {
      // setStudentProfileTodelete(null)
      setIsCheck2FaDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    try {
      const res = await axios.patch(`${baseUrl}/edit-student-profile/${data._id}`, formData,
        // {headers: {
        //     'Content-Type': 'multipart/form-data',
        //   }}
      )
      if (res.status === 200) {
        window.location.reload()
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
      console.error('Error:', error.response);
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

  const submitToArchiveAsAlumuni = async () => {
    const formData = new FormData()
    formData.append('registeredBy', district)
    if(district !== "all"){
        formData.append('project', "ncsep")
    }else{
        // formData.append('project', project)
    }
    formData.append('name', data.firstName + ' ' + data?.middleName + ' ' + + data.lastName)
    formData.append('contactNumber', data.contactNumber)
    formData.append('email', data.email)
    // formData.append('citizenshipNumber', data.citizenshipNumber)
    // formData.append('currentStatus', alumuniCurrentStatus)
    // formData.append('occupation', alumuniOccupation)
    // formData.append('organization', alumuniOrganization)
    // formData.append('position', alumuniPosition)
    formData.append('municipality', data.currentMunicipality)
    formData.append('wardNo', data.currentWardNumber)
    formData.append('alumuniDistrict', data.currentDistrict)
    formData.append('province', data.currentDistrict)

    try {
        const res = await axios.post(`${baseUrl}/create-alumuni-student-profile`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (res.status === 200) {
            toast({
                title: 'Success.',
                description: 'Alumuni student profile created.',
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
}

  //filter municipalities from selected district from selected province
  //PERMANENT DISTRICT
  let selectedPermanentProvince = {}
  if(formData?.permanentProvince){
    selectedPermanentProvince = provinces.find(item => item?.name === formData?.permanentProvince)
  }
  const selectedPermanentProvinceDistricts = selectedPermanentProvince !== null ? districts.filter(item => item?.province_id === selectedPermanentProvince?.id) : []
    //PERMANENT MUNICIPALITY
  let selectedPermanentDistrict = {}
  if(formData?.permanentDistrict){
    selectedPermanentDistrict = districts.find(district => district?.name === formData?.permanentDistrict)
  }
  const selectedPermanentDistrictMunicipalities = selectedPermanentDistrict !== null ? municipalities.filter(item => item?.district_id === selectedPermanentDistrict?.id) : []
  
  //CURRENT DISTRICT
  let selectedCurrentProvince = {}
  if(formData?.currentProvince){
    selectedCurrentProvince = provinces.find(item => item?.name === formData?.currentProvince)
  }
  const selectedCurrentProvinceDistricts = selectedCurrentProvince !== null ? districts.filter(item => item?.province_id === selectedCurrentProvince?.id) : []
    //CURRENT MUNICIPALITY
  let selectedCurrentDistrict = {}
  if(formData?.currentDistrict){
    selectedCurrentDistrict = districts.find(district => district?.name === formData?.currentDistrict)
  }
  const selectedCurrentDistrictMunicipalities = selectedCurrentDistrict !== null ? municipalities.filter(item => item?.district_id === selectedCurrentDistrict?.id) : []
  
  //SCHOOL DISTRICT
  let selectedSchoolProvince = {}
  if(formData?.schoolProvince){
    selectedSchoolProvince = provinces.find(item => item?.name === formData?.schoolProvince)
  }
  const selectedSchoolProvinceDistricts = selectedSchoolProvince !== null ? districts.filter(item => item?.province_id === selectedSchoolProvince?.id) : []
  
    //SCHOOL MUNICIPALITY
  let selectedSchoolDistrict = {}
  if(formData?.schoolDistrict){
    selectedSchoolDistrict = districts.find(district => district?.name === formData?.schoolDistrict)
  }
  const selectedSchoolDistrictMunicipalities = selectedSchoolDistrict !== null ? municipalities.filter(item => item?.district_id === selectedSchoolDistrict?.id) : []

  const classOptions = ['', 'Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10', 'Grade11', 'Grade12', 'Bachelors', 'Masters', 'Diploma',];
  const scholarshipCategories =  
  scholarshipProject == "prlEth"
   ? (["", "Pratap Ram Lohar", "ETHS Project"]) : (["", "Special Focus Children", "Highly Vunerable Children", "Role Model (RM)"])

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
          <ModalContent >
            <ModalHeader textAlign="center" fontSize="24px" >Edit Student Profile</ModalHeader>
            {/* <Button  py={5} colorScheme='red' mx={1} w={'300px'} onClick={onClose}>Archive student as alumuni</Button> */}
            <ModalCloseButton />
            <ModalBody m={5} >
              <form
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
                  {scholarshipProject == "prlEth" && <FormControl  mb={5} w={"270px"} >
                      <FormLabel>Project</FormLabel>
                      <Select
                        placeholder={data.project}
                        name='project'
                        onChange={handleInputChange}
                      >
                        <option key="PRL" value="PRL">
                          PRL
                        </option>
                        <option key="ETHS" value="ETHS">
                          ETHS
                        </option>
                      </Select>
                    </FormControl>}
                    <HStack justify="flex-start" mb={5} >
                      <FormControl>
                        <FormLabel >First name</FormLabel>
                        <Input
                          placeholder={data.firstName}
                          name='firstName'
                          onChange={handleInputChange}
                          isRequired
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Middle name</FormLabel>
                        <Input
                          placeholder={data.middleName}
                          name="middleName"
                          // value={formData.middleName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Last name</FormLabel>
                        <Input
                          placeholder={data.lastName}
                          isRequired
                          name="lastName"
                          // value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                    <HStack justify="flex-start" mb={5}>
                      <FormControl>
                        <FormLabel>Gender</FormLabel>
                       
                       <Select
                      placeholder={data.gender}
                      name="gender"
                      // value={formData.scholarship1.grade}
                      onChange={handleInputChange}
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
                          placeholder={data.dateOfBirth}
                          isRequired
                          name="dateOfBirth"
                          // value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Birth certificate number</FormLabel>
                        <Input
                          placeholder={data.birthCertificateNo}
                          type='number'
                          name="birthCertificateNo"
                          // value={formData.birthCertificateNo}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                    <HStack justify="flex-start" mb={5}>
                      <FormControl>
                    <FormLabel>Student type</FormLabel>
                    <Select
                      placeholder={data.studentType}
                      name="studentType"
                      onChange={handleInputChange}
                    >
                      <option key="None" value="None">
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
                        <Input placeholder={data.contactNumber}
                          type='number'
                          isRequired
                          name="contactNumber"
                          // value={formData.contactNumber}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email ID</FormLabel>
                        <Input
                          placeholder={data.email}
                          type='email'
                          name="email"
                          // value={formData.email}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                  </Box>
                </Grid>
                {/* SCHOLARSHIP */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Scholarship</FormLabel>
                  <Grid gridTemplateColumns={"0.1fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} >
                    <FormLabel >SN</FormLabel>
                    <FormLabel >Fund type</FormLabel>
                    <FormLabel >Category</FormLabel>
                    <FormLabel>Class</FormLabel>
                    <FormLabel>From</FormLabel>
                    <FormLabel>To</FormLabel>
                    <FormLabel>GPA</FormLabel>
                    <FormLabel>Remarks</FormLabel>
                  </Grid>
                  {/* SCHOLARSHIP ONE */}
                </FormControl>
                <Grid gridTemplateColumns={"0.1fr 0.5fr  1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>1. </FormLabel>
                  <Select
                    placeholder={data.scholarship1FundType}
                    name="scholarship1FundType"
                    onChange={handleInputChange}
                  >
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship1Category}
                  name="scholarship1Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                   <Select
                  placeholder={data.scholarship1Grade}
                  name="scholarship1Grade"
                  // value={formData.scholarship1.grade}
                  onChange={handleInputChange}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Input
                    placeholder={data.scholarship1From}
                 
                    name="scholarship1From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship1To}
                    name="scholarship1To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship1Gpa}
                    name="scholarship1Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship1Remarks}
                    name="scholarship1Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP TWO */}
                <Grid gridTemplateColumns={"0.1fr 0.5fr  1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>2. </FormLabel>
                  <Select
                    placeholder={data.scholarship2FundType}
                    name="scholarship2FundType"
                    onChange={handleInputChange}
                  >
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship2Category}
                  name="scholarship2Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship2Grade}
                  name="scholarship2Grade"
                  // value={formData.scholarship1.grade}
                  onChange={handleInputChange}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Input
                    placeholder={data.scholarship2From}
                    name="scholarship2From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship2To}
                    name="scholarship2To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship2Gpa}
                    name="scholarship2Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship2Remarks}
                    name="scholarship2Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP THREE */}
                <Grid gridTemplateColumns={"0.1fr 0.5fr  1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>3. </FormLabel>
                  <Select
                    placeholder={data.scholarship3FundType}
                    name="scholarship3FundType"
                    onChange={handleInputChange}
                  >
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship3Category}
                  name="scholarship3Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship3Grade}
                  name="scholarship3Grade"
                  // value={formData.scholarship1.grade}
                  onChange={handleInputChange}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Input
                    placeholder={data.scholarship3From}
                    name="scholarship3From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship3To}
                    name="scholarship3To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship3Gpa}
                    name="scholarship3Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship3Remarks}
                    name="scholarship3Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP FOUR */}
                <Grid gridTemplateColumns={"0.1fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>4. </FormLabel>
                  <Select
                    placeholder={data.scholarship4FundType}
                    name="scholarship4FundType"
                    onChange={handleInputChange}
                  >
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship4Category}
                  name="scholarship4Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship4Grade}
                  name="scholarship4Grade"
                  // value={formData.scholarship1.grade}
                  onChange={handleInputChange}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Input
                    placeholder={data.scholarship4From}
                    name="scholarship4From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship4To}
                    name="scholarship4To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship4Gpa}
                    name="scholarship4Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship4Remarks}
                    name="scholarship4Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid gridTemplateColumns={"0.1fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>5. </FormLabel>
                  <Select
                    placeholder={data.scholarship5FundType}
                    name="scholarship5FundType"
                    onChange={handleInputChange}
                  >
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship5Category}
                  name="scholarship5Category"
                  onChange={ handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                   <Select
                  placeholder={data.scholarship5Grade}
                  name="scholarship5Grade"
                  // value={formData.scholarship1.grade}
                  onChange={handleInputChange}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Input
                    placeholder={data.scholarship5From}
                    name="scholarship5From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship5To}
                    name="scholarship5To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship5Gpa}
                    name="scholarship5Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship5Remarks}
                    name="scholarship5Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>


                {/* PERMANENT ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                <Select
                      placeholder={data.permanentProvince}
                      name="permanentProvince"
                      onChange={handleInputChange}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                <Select
                      placeholder={data.permanentDistrict}
                      name="permanentDistrict"
                      onChange={handleInputChange}
                  >
                      {selectedPermanentProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                  </Select>
                <Select
                      placeholder={data.permanentMunicipality}
                      name="permanentMunicipality"
                      onChange={handleInputChange}
                  >
                      {selectedPermanentDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                      ))}
                  </Select>
                  
                  <Input
                    placeholder={data.permanentWardNumber}
                    type='number'
                    name="permanentWardNumber"
                    // value={formData.permanentAddress.wardNumber}
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
              {/* CURRENT ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Current address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                {district == "all" ?
                  <Select
                      placeholder={data.currentProvince}
                      name="currentProvince"
                      onChange={handleInputChange}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                  :
                  <Input placeholder={data.currentProvince} isDisabled />
                  }
                {district == "all" ?
                <Select
                      placeholder={data.currentDistrict}
                      name="currentDistrict"
                      onChange={handleInputChange}
                  >
                      {selectedCurrentProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                  </Select>
                    :
                    <Input placeholder={data.currentProvince} isDisabled />
                      }
                <Select
                      placeholder={data.currentMunicipality}
                      name="currentMunicipality"
                      onChange={handleInputChange}
                  >
                      {selectedCurrentDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                      ))}
                  </Select>
                  
                  <Input
                    placeholder={data.currentWardNumber}
                    type='number'
                    name="currentWardNumber"
                    // value={formData.permanentAddress.wardNumber}
                    onChange={handleInputChange}
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
                </Grid>
                <HStack>
                  <Input
                    placeholder={data.schoolName}
                    name="schoolName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.principalName}
                    name="principalName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.schoolNumber}
                    name="schoolNumber"
                    onChange={handleInputChange}
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
                    name="contactPersonName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.contactPersonPosition}
                    name="contactPersonPosition"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.contactPersonNumber}
                    name="contactPersonNumber"
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
              {/* SCHOOL ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Current address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                <Select
                      placeholder={data.schoolProvince}
                      name="schoolProvince"
                      onChange={handleInputChange}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                <Select
                      placeholder={data.schoolDistrict}
                      name="schoolDistrict"
                      onChange={handleInputChange}
                  >
                      {selectedSchoolProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                  </Select>
                <Select
                      placeholder={data.schoolMunicipality}
                      name="schoolMunicipality"
                      onChange={handleInputChange}
                  >
                      {selectedSchoolDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                      ))}
                  </Select>
                  
                  <Input
                    placeholder={data.schoolWardNumber}
                    type='number'
                    name="schoolWardNumber"
                    // value={formData.permanentAddress.wardNumber}
                    onChange={handleInputChange}
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
                    name="fatherName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.fatherAddress}
                    name="fatherAddress"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.fatherCitizenshipNumber}
                    name="fatherCitizenshipNumber"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.fatherOccupation}
                    name="fatherOccupation"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.fatherContactNumber}
                    name="fatherContactNumber"
                    onChange={handleInputChange}
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
                    name="motherName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.motherAddress}
                    name="motherAddress"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.motherCitizenshipNumber}
                    name="motherCitizenshipNumber"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.motherOccupation}
                    name="motherOccupation"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.motherContactNumber}
                    name="motherContactNumber"
                    onChange={handleInputChange}
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
                    name="guardianName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.guardianAddress}
                    name="guardianAddress"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.guardianCitizenshipNumber}
                    name="guardianCitizenshipNumber"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.guardianOccupation}
                    name="guardianOccupation"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.guardianContactNumber}
                    name="guardianContactNumber"
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter justifyContent="center" >
            <Button colorScheme='red' mx={1} w={'200px'} onClick={onClose}>Cancel</Button>
            <Button colorScheme='green' mx={1} w={'200px'} onClick={() =>  handleSubmit()} >Save Changes</Button>
          </ModalFooter>
        </ModalContent>
        </Modal >
        }

    </>
  )
}

export default EditStudentProfileModal