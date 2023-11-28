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
  const dalitEthnicitiesList = ['Badi', 'Gandarva', 'Madeshi Origin', 'Pariyar', 'Sarki', 'Viswakarma']
  const initialFormData = {
    profileImageName: null,
    project: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    ethnicity: '',
    studentType: '',
    contactNumber: '',
    email: '',
    birthCertificateNo: '',

    scholarship1FundType: '',
    scholarship1Category: '',
    scholarship1Grade: '',
    scholarship1Field: '',
    scholarship1From: '',
    scholarship1To: '',
    scholarship1Gpa: '',
    scholarship1Remarks: '',

    scholarship2FundType: '',
    scholarship2Category: '',
    scholarship2Grade: '',
    scholarship2Field: '',
    scholarship2From: '',
    scholarship2To: '',
    scholarship2Gpa: '',
    scholarship2Remarks: '',

    scholarship3FundType: '',
    scholarship3Category: '',
    scholarship3Grade: '',
    scholarship3Field: '',
    scholarship3From: '',
    scholarship3To: '',
    scholarship3Gpa: '',
    scholarship3Remarks: '',

    scholarship4FundType: '',
    scholarship4Category: '',
    scholarship4Grade: '',
    scholarship4Field: '',
    scholarship4From: '',
    scholarship4To: '',
    scholarship4Gpa: '',
    scholarship4Remarks: '',

    scholarship5FundType: '',
    scholarship5Category: '',
    scholarship5Grade: '',
    scholarship5Field: '',
    scholarship5From: '',
    scholarship5To: '',
    scholarship5Gpa: '',
    scholarship5Remarks: '',

    scholarship6FundType: '',
    scholarship6Category: '',
    scholarship6Grade: '',
    scholarship6Field: '',
    scholarship6From: '',
    scholarship6To: '',
    scholarship6Gpa: '',
    scholarship6Remarks: '',

    scholarship7FundType: '',
    scholarship7Category: '',
    scholarship7Grade: '',
    scholarship7Field: '',
    scholarship7From: '',
    scholarship7To: '',
    scholarship7Gpa: '',
    scholarship7Remarks: '',

    scholarship8FundType: '',
    scholarship8Category: '',
    scholarship8Grade: '',
    scholarship8Field: '',
    scholarship8From: '',
    scholarship8To: '',
    scholarship8Gpa: '',
    scholarship8Remarks: '',

    scholarship9FundType: '',
    scholarship9Category: '',
    scholarship9Grade: '',
    scholarship9Field: '',
    scholarship9From: '',
    scholarship9To: '',
    scholarship9Gpa: '',
    scholarship9Remarks: '',

    scholarship9FundType: '',
    scholarship9Category: '',
    scholarship9Grade: '',
    scholarship10Field: '',
    scholarship9From: '',
    scholarship9To: '',
    scholarship9Gpa: '',
    scholarship9Remarks: '',

    scholarshipcFundType: '',
    scholarship10Category: '',
    scholarship10Grade: '',
    scholarship10From: '',
    scholarship10To: '',
    scholarship10Gpa: '',
    scholarship10Remarks: '',

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
    const selectedFile = event.target.files[0]
    setSelectedImage(selectedFile)
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
    console.log(selectedImage)
  }
  useEffect(() => {
    setFormData({
      project: data?.project,
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      gender: data?.gender,
      dateOfBirth: data?.dateOfBirth,
      ethnicity: data?.ethnicity,
      studentType: data?.studentType,
      birthCertificateNo: data?.birthCertificateNo,
      contactNumber: data?.contactNumber,
      email: data?.email,

      scholarship1FundType: data?.scholarship1FundType,
      scholarship1Category: data?.scholarship1Category,
      scholarship1Grade: data?.scholarship1Grade,
      scholarship1Field: data?.scholarship1Field,
      scholarship1From: data?.scholarship1From,
      scholarship1To: data?.scholarship1To,
      scholarship1Gpa: data?.scholarship1Gpa,
      scholarship1Remarks: data?.scholarship1Remarks,

      scholarship2FundType: data?.scholarship2FundType,
      scholarship2Category: data?.scholarship2Category,
      scholarship2Grade: data?.scholarship2Grade,
      scholarship2Field: data?.scholarship2Field,
      scholarship2From: data?.scholarship2From,
      scholarship2To: data?.scholarship2To,
      scholarship2Gpa: data?.scholarship2Gpa,
      scholarship2Remarks: data?.scholarship2Remarks,

      scholarship3FundType: data?.scholarship3FundType,
      scholarship3Category: data?.scholarship3Category,
      scholarship3Grade: data?.scholarship3Grade,
      scholarship3Field: data?.scholarship3Field,
      scholarship3From: data?.scholarship3From,
      scholarship3To: data?.scholarship3To,
      scholarship3Gpa: data?.scholarship3Gpa,
      scholarship3Remarks: data?.scholarship3Remarks,

      scholarship4FundType: data?.scholarship4FundType,
      scholarship4Category: data?.scholarship4Category,
      scholarship4Grade: data?.scholarship4Grade,
      scholarship4Field: data?.scholarship4Field,
      scholarship4From: data?.scholarship4From,
      scholarship4To: data?.scholarship4To,
      scholarship4Gpa: data?.scholarship4Gpa,
      scholarship4Remarks: data?.scholarship4Remarks,

      scholarship5FundType: data?.scholarship5FundType,
      scholarship5Category: data?.scholarship5Category,
      scholarship5Grade: data?.scholarship5Grade,
      scholarship5Field: data?.scholarship5Field,
      scholarship5From: data?.scholarship5From,
      scholarship5To: data?.scholarship5To,
      scholarship5Gpa: data?.scholarship5Gpa,
      scholarship5Remarks: data?.scholarship5Remarks,

      scholarship6FundType: data?.scholarship6FundType,
      scholarship6Category: data?.scholarship6Category,
      scholarship6Grade: data?.scholarship6Grade,
      scholarship6Field: data?.scholarship6Field,
      scholarship6From: data?.scholarship6From,
      scholarship6To: data?.scholarship6To,
      scholarship6Gpa: data?.scholarship6Gpa,
      scholarship6Remarks: data?.scholarship6Remarks,

      scholarship7FundType: data?.scholarship7FundType,
      scholarship7Category: data?.scholarship7Category,
      scholarship7Grade: data?.scholarship7Grade,
      scholarship7Field: data?.scholarship7Field,
      scholarship7From: data?.scholarship7From,
      scholarship7To: data?.scholarship7To,
      scholarship7Gpa: data?.scholarship7Gpa,
      scholarship7Remarks: data?.scholarship7Remarks,

      scholarship8FundType: data?.scholarship8FundType,
      scholarship8Category: data?.scholarship8Category,
      scholarship8Grade: data?.scholarship8Grade,
      scholarship8Field: data?.scholarship8Field,
      scholarship8From: data?.scholarship8From,
      scholarship8To: data?.scholarship8To,
      scholarship8Gpa: data?.scholarship8Gpa,
      scholarship8Remarks: data?.scholarship8Remarks,

      scholarship9FundType: data?.scholarship9FundType,
      scholarship9Category: data?.scholarship9Category,
      scholarship9Grade: data?.scholarship9Grade,
      scholarship9Field: data?.scholarship9Field,
      scholarship9From: data?.scholarship9From,
      scholarship9To: data?.scholarship9To,
      scholarship9Gpa: data?.scholarship9Gpa,
      scholarship9Remarks: data?.scholarship9Remarks,

      scholarship10FundType: data?.scholarship10FundType,
      scholarship10Category: data?.scholarship10Category,
      scholarship10Grade: data?.scholarship10Grade,
      scholarship10Field: data?.scholarship10Field,
      scholarship10From: data?.scholarship10From,
      scholarship10To: data?.scholarship10To,
      scholarship10Gpa: data?.scholarship10Gpa,
      scholarship10Remarks: data?.scholarship10Remarks,

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
    // event.preventDefault();

    const formDataToUpdate = new FormData();
  
    //Append only the fields that need to be updated
    formData.project && formDataToUpdate.append('project', formData.project);
    formData.firstName &&formDataToUpdate.append('firstName', formData.firstName);
    formData.middleName &&formDataToUpdate.append('middleName', formData.middleName);
    formData.lastName && formDataToUpdate.append('lastName', formData.lastName);
    formData.gender && formDataToUpdate.append('gender', formData.gender);
    formData.dateOfBirth && formDataToUpdate.append('dateOfBirth', formData.dateOfBirth);
    formData.ethnicity && formDataToUpdate.append('ethnicity', formData.ethnicity);
    formData.studentType && formDataToUpdate.append('studentType', formData.studentType);
    formData.contactNumber && formDataToUpdate.append('contactNumber', formData.contactNumber);
    formData.email && formDataToUpdate.append('email', formData.email);
    formData.birthCertificateNo && formDataToUpdate.append('birthCertificateNo', formData.birthCertificateNo);
    
    formData.scholarship1FundType && formDataToUpdate.append('scholarship1FundType', formData.scholarship1FundType);
    formData.scholarship1Category && formDataToUpdate.append('scholarship1Category', formData.scholarship1Category);
    formData.scholarship1Grade && formDataToUpdate.append('scholarship1Grade', formData.scholarship1Grade);
    formData.scholarship1Field && formDataToUpdate.append('scholarship1Field', formData.scholarship1Field);
    formData.scholarship1From && formDataToUpdate.append('scholarship1From', formData.scholarship1From);
    formData.scholarship1To && formDataToUpdate.append('scholarship1To', formData.scholarship1To);
    formData.scholarship1Gpa && formDataToUpdate.append('scholarship1Gpa', formData.scholarship1Gpa);
    formData.scholarship1Remarks && formDataToUpdate.append('scholarship1Remarks', formData.scholarship1Remarks);
  
    formData.scholarship2FundType && formDataToUpdate.append('scholarship2FundType', formData.scholarship2FundType);
    formData.scholarship2Category && formDataToUpdate.append('scholarship2Category', formData.scholarship2Category);
    formData.scholarship2Grade && formDataToUpdate.append('scholarship2Grade', formData.scholarship2Grade);
    formData.scholarship2Field && formDataToUpdate.append('scholarship2Field', formData.scholarship2Field);
    formData.scholarship2From && formDataToUpdate.append('scholarship2From', formData.scholarship2From);
    formData.scholarship2To && formDataToUpdate.append('scholarship2To', formData.scholarship2To);
    formData.scholarship2Gpa && formDataToUpdate.append('scholarship2Gpa', formData.scholarship2Gpa);
    formData.scholarship2Remarks && formDataToUpdate.append('scholarship2Remarks', formData.scholarship2Remarks);

    formData.scholarship3FundType && formDataToUpdate.append('scholarship3FundType', formData.scholarship3FundType);
    formData.scholarship3Category && formDataToUpdate.append('scholarship3Category', formData.scholarship3Category);
    formData.scholarship3Grade && formDataToUpdate.append('scholarship3Grade', formData.scholarship3Grade);
    formData.scholarship3Field && formDataToUpdate.append('scholarship3Field', formData.scholarship3Field);
    formData.scholarship3From && formDataToUpdate.append('scholarship3From', formData.scholarship3From);
    formData.scholarship3To && formDataToUpdate.append('scholarship3To', formData.scholarship3To);
    formData.scholarship3Gpa && formDataToUpdate.append('scholarship3Gpa', formData.scholarship3Gpa);
    formData.scholarship3Remarks && formDataToUpdate.append('scholarship3Remarks', formData.scholarship3Remarks);

    formData.scholarship4FundType && formDataToUpdate.append('scholarship4FundType', formData.scholarship4FundType);
    formData.scholarship4Category && formDataToUpdate.append('scholarship4Category', formData.scholarship4Category);
    formData.scholarship4Grade && formDataToUpdate.append('scholarship4Grade', formData.scholarship4Grade);
    formData.scholarship4Field && formDataToUpdate.append('scholarship4Field', formData.scholarship4Field);
    formData.scholarship4From && formDataToUpdate.append('scholarship4From', formData.scholarship4From);
    formData.scholarship4To && formDataToUpdate.append('scholarship4To', formData.scholarship4To);
    formData.scholarship4Gpa && formDataToUpdate.append('scholarship4Gpa', formData.scholarship4Gpa);
    formData.scholarship4Remarks && formDataToUpdate.append('scholarship4Remarks', formData.scholarship4Remarks);

    formData.scholarship5FundType && formDataToUpdate.append('scholarship5FundType', formData.scholarship5FundType);
    formData.scholarship5Category && formDataToUpdate.append('scholarship5Category', formData.scholarship5Category);
    formData.scholarship5Grade && formDataToUpdate.append('scholarship5Grade', formData.scholarship5Grade);
    formData.scholarship5Field && formDataToUpdate.append('scholarship5Field', formData.scholarship5Field);
    formData.scholarship5From && formDataToUpdate.append('scholarship5From', formData.scholarship5From);
    formData.scholarship5To && formDataToUpdate.append('scholarship5To', formData.scholarship5To);
    formData.scholarship5Gpa && formDataToUpdate.append('scholarship5Gpa', formData.scholarship5Gpa);
    formData.scholarship5Remarks && formDataToUpdate.append('scholarship5Remarks', formData.scholarship5Remarks);

    formData.scholarship6FundType && formDataToUpdate.append('scholarship6FundType', formData.scholarship6FundType);
    formData.scholarship6Category && formDataToUpdate.append('scholarship6Category', formData.scholarship6Category);
    formData.scholarship6Grade && formDataToUpdate.append('scholarship6Grade', formData.scholarship6Grade);
    formData.scholarship6Field && formDataToUpdate.append('scholarship6Field', formData.scholarship6Field);
    formData.scholarship6From && formDataToUpdate.append('scholarship6From', formData.scholarship6From);
    formData.scholarship6To && formDataToUpdate.append('scholarship6To', formData.scholarship6To);
    formData.scholarship6Gpa && formDataToUpdate.append('scholarship6Gpa', formData.scholarship6Gpa);
    formData.scholarship6Remarks && formDataToUpdate.append('scholarship6Remarks', formData.scholarship6Remarks);

    formData.scholarship7FundType && formDataToUpdate.append('scholarship7FundType', formData.scholarship7FundType);
    formData.scholarship7Category && formDataToUpdate.append('scholarship7Category', formData.scholarship7Category);
    formData.scholarship7Grade && formDataToUpdate.append('scholarship7Grade', formData.scholarship7Grade);
    formData.scholarship7Field && formDataToUpdate.append('scholarship7Field', formData.scholarship7Field);
    formData.scholarship7From && formDataToUpdate.append('scholarship7From', formData.scholarship7From);
    formData.scholarship7To && formDataToUpdate.append('scholarship7To', formData.scholarship7To);
    formData.scholarship7Gpa && formDataToUpdate.append('scholarship7Gpa', formData.scholarship7Gpa);
    formData.scholarship7Remarks && formDataToUpdate.append('scholarship7Remarks', formData.scholarship7Remarks);

    formData.scholarship8FundType && formDataToUpdate.append('scholarship8FundType', formData.scholarship8FundType);
    formData.scholarship8Category && formDataToUpdate.append('scholarship8Category', formData.scholarship8Category);
    formData.scholarship8Grade && formDataToUpdate.append('scholarship8Grade', formData.scholarship8Grade);
    formData.scholarship8Field && formDataToUpdate.append('scholarship8Field', formData.scholarship8Field);
    formData.scholarship8From && formDataToUpdate.append('scholarship8From', formData.scholarship8From);
    formData.scholarship8To && formDataToUpdate.append('scholarship8To', formData.scholarship8To);
    formData.scholarship8Gpa && formDataToUpdate.append('scholarship8Gpa', formData.scholarship8Gpa);
    formData.scholarship8Remarks && formDataToUpdate.append('scholarship8Remarks', formData.scholarship8Remarks);

    formData.scholarship9FundType && formDataToUpdate.append('scholarship9FundType', formData.scholarship9FundType);
    formData.scholarship9Category && formDataToUpdate.append('scholarship9Category', formData.scholarship9Category);
    formData.scholarship9Grade && formDataToUpdate.append('scholarship9Grade', formData.scholarship9Grade);
    formData.scholarship9Field && formDataToUpdate.append('scholarship9Field', formData.scholarship9Field);
    formData.scholarship9From && formDataToUpdate.append('scholarship9From', formData.scholarship9From);
    formData.scholarship9To && formDataToUpdate.append('scholarship9To', formData.scholarship9To);
    formData.scholarship9Gpa && formDataToUpdate.append('scholarship9Gpa', formData.scholarship9Gpa);
    formData.scholarship9Remarks && formDataToUpdate.append('scholarship9Remarks', formData.scholarship9Remarks);

    formData.scholarship10FundType && formDataToUpdate.append('scholarship10FundType', formData.scholarship10FundType);
    formData.scholarship10Category && formDataToUpdate.append('scholarship10Category', formData.scholarship10Category);
    formData.scholarship10Grade && formDataToUpdate.append('scholarship10Grade', formData.scholarship10Grade);
    formData.scholarship10Field && formDataToUpdate.append('scholarship10Field', formData.scholarship10Field);
    formData.scholarship10From && formDataToUpdate.append('scholarship10From', formData.scholarship10From);
    formData.scholarship10To && formDataToUpdate.append('scholarship10To', formData.scholarship10To);
    formData.scholarship10Gpa && formDataToUpdate.append('scholarship10Gpa', formData.scholarship10Gpa);
    formData.scholarship10Remarks && formDataToUpdate.append('scholarship10Remarks', formData.scholarship10Remarks);
    
    formData.permanentMunicipality && formDataToUpdate.append('permanentMunicipality', formData.permanentMunicipality);
    formData.permanentWardNumber && formDataToUpdate.append('permanentWardNumber', formData.permanentWardNumber);
    formData.permanentDistrict && formDataToUpdate.append('permanentDistrict', formData.permanentDistrict);
    formData.permanentProvince && formDataToUpdate.append('permanentProvince', formData.permanentProvince);
  
    formData.currentMunicipality && formDataToUpdate.append('currentMunicipality', formData.currentMunicipality);
    formData.currentWardNumber && formDataToUpdate.append('currentWardNumber', formData.currentWardNumber);
    formData.currentDistrict && formDataToUpdate.append('currentDistrict', formData.currentDistrict);
    formData.currentProvince && formDataToUpdate.append('currentProvince', formData.currentProvince);
    
    formData.schoolName && formDataToUpdate.append('schoolName', formData.schoolName);
    formData.principalName && formDataToUpdate.append('principalName', formData.principalName);
    formData.schoolNumber && formDataToUpdate.append('schoolNumber', formData.schoolNumber);
    formData.contactPersonName && formDataToUpdate.append('contactPersonName', formData.contactPersonName);
    formData.contactPersonPosition && formDataToUpdate.append('contactPersonPosition', formData.contactPersonPosition);
    formData.contactPersonNumber && formDataToUpdate.append('contactPersonNumber', formData.contactPersonNumber);
    formData.schoolMunicipality && formDataToUpdate.append('schoolMunicipality', formData.schoolMunicipality);
    formData.schoolWardNumber && formDataToUpdate.append('schoolWardNumber', formData.schoolWardNumber);
    formData.schoolDistrict && formDataToUpdate.append('schoolDistrict', formData.schoolDistrict);
    formData.schoolProvince && formDataToUpdate.append('schoolProvince', formData.schoolProvince);
    
    formData.fatherName && formDataToUpdate.append('fatherName', formData.fatherName);
    formData.fatherAddress && formDataToUpdate.append('fatherAddress', formData.fatherAddress);
    formData.fatherCitizenshipNumber && formDataToUpdate.append('fatherCitizenshipNumber', formData.fatherCitizenshipNumber);
    formData.fatherOccupation && formDataToUpdate.append('fatherOccupation', formData.fatherOccupation);
    formData.fatherContactNumber && formDataToUpdate.append('fatherContactNumber', formData.fatherContactNumber);
    
    formData.motherName && formDataToUpdate.append('motherName', formData.motherName);
    formData.motherAddress && formDataToUpdate.append('motherAddress', formData.motherAddress);
    formData.motherCitizenshipNumber && formDataToUpdate.append('motherCitizenshipNumber', formData.motherCitizenshipNumber);
    formData.motherOccupation && formDataToUpdate.append('motherOccupation', formData.motherOccupation);
    formData.motherContactNumber && formDataToUpdate.append('motherContactNumber', formData.motherContactNumber);

    formData.guardianName && formDataToUpdate.append('guardianName', formData.guardianName);
    formData.guardianAddress && formDataToUpdate.append('guardianAddress', formData.guardianAddress);
    formData.guardianCitizenshipNumber && formDataToUpdate.append('guardianCitizenshipNumber', formData.guardianCitizenshipNumber);
    formData.guardianOccupation && formDataToUpdate.append('guardianOccupation', formData.guardianOccupation);
    formData.guardianContactNumber && formDataToUpdate.append('guardianContactNumber', formData.guardianContactNumber);

    // Append the new image if it's selected
    if (selectedImage) {
      formDataToUpdate.append('profileImageName', selectedImage);
    }
    try {
      const res = await axios.patch(`${baseUrl}/edit-student-profile/${data._id}`, formDataToUpdate,
     
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
                    src={ previewImage || require(`../../uploads/studentImage/${data?.profileImageName}`)} w="200px"
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
                        <option key="" value="">
                      None
                    </option>
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
                      <FormLabel>Ethnicity</FormLabel>
                      <Select
                        placeholder={data.ethnicity}
                        name="ethnicity"
                        onChange={handleInputChange}
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
                      placeholder={data.studentType}
                      name="studentType"
                      onChange={handleInputChange}
                    >
                      <option key="Normal" value="Normal">
                        Normal
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
                  <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} >
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
                  {/* SCHOLARSHIP ONE */}
                </FormControl>
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>1. </FormLabel>
                  <Select
                    placeholder={data.scholarship1FundType}
                    name="scholarship1FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
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
                    placeholder={data.scholarship1Field}
                 
                    name="scholarship1Field"
                    onChange={handleInputChange}
                  />
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
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>2. </FormLabel>
                  <Select
                    placeholder={data.scholarship2FundType}
                    name="scholarship2FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
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
                    placeholder={data.scholarship2Field}
                    name="scholarship2Field"
                    onChange={handleInputChange}
                  />
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
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>3. </FormLabel>
                  <Select
                    placeholder={data.scholarship3FundType}
                    name="scholarship3FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
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
                    placeholder={data.scholarship3Field}
                 
                    name="scholarship3Field"
                    onChange={handleInputChange}
                  />
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
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>4. </FormLabel>
                  <Select
                    placeholder={data.scholarship4FundType}
                    name="scholarship4FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
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
                    placeholder={data.scholarship4Field}
                 
                    name="scholarship4Field"
                    onChange={handleInputChange}
                  />
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
                {/* SCHOLARSHIP FIVE */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>5. </FormLabel>
                  <Select
                    placeholder={data.scholarship5FundType}
                    name="scholarship5FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
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
                    placeholder={data.scholarship5Field}
                 
                    name="scholarship5Field"
                    onChange={handleInputChange}
                  />
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
                {/* SCHOLARSHIP SIX */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>6. </FormLabel>
                  <Select
                    placeholder={data.scholarship6FundType}
                    name="scholarship6FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship6Category}
                  name="scholarship6Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                   <Select
                  placeholder={data.scholarship6Grade}
                  name="scholarship6Grade"
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
                    placeholder={data.scholarship6Field}
                 
                    name="scholarship6Field"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship6From}
                 
                    name="scholarship6From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship6To}
                    name="scholarship6To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship6Gpa}
                    name="scholarship6Gpa"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship6Remarks}
                    name="scholarship6Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP SEVEN */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>7. </FormLabel>
                  <Select
                    placeholder={data.scholarship7FundType}
                    name="scholarship7FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship7Category}
                  name="scholarship7Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship7Grade}
                  name="scholarship7Grade"
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
                    placeholder={data.scholarship7Field}
                 
                    name="scholarship7Field"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship7From}
                    name="scholarship7From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship7To}
                    name="scholarship7To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship7Gpa}
                    name="scholarship7Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship7Remarks}
                    name="scholarship7Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP EIGHT */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>8. </FormLabel>
                  <Select
                    placeholder={data.scholarship8FundType}
                    name="scholarship8FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship8Category}
                  name="scholarship8Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship8Grade}
                  name="scholarship8Grade"
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
                    placeholder={data.scholarship8Field}
                 
                    name="scholarship8Field"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship8From}
                    name="scholarship8From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship8To}
                    name="scholarship8To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship8Gpa}
                    name="scholarship8Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship8Remarks}
                    name="scholarship8Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP NINE */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>9. </FormLabel>
                  <Select
                    placeholder={data.scholarship9FundType}
                    name="scholarship9FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship9Category}
                  name="scholarship9Category"
                  onChange={handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                  <Select
                  placeholder={data.scholarship9Grade}
                  name="scholarship9Grade"
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
                    placeholder={data.scholarship9Field}
                 
                    name="scholarship9Field"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship9From}
                    name="scholarship9From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship9To}
                    name="scholarship9To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship9Gpa}
                    name="scholarship9Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship9Remarks}
                    name="scholarship9Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* SCHOLARSHIP TEN */}
                <Grid gridTemplateColumns={"0.2fr 0.5fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 1fr"} gap={1} mb={1} >
                  <FormLabel>10. </FormLabel>
                  <Select
                    placeholder={data.scholarship10FundType}
                    name="scholarship10FundType"
                    onChange={handleInputChange}
                  >
                    <option key="" value="">
                      None
                    </option>
                    <option key="NEF" value="NEF">
                      NEF
                    </option>
                    <option key="ARMF" value="ARMF">
                      ARMF
                    </option>
                  </Select>
                  <Select
                  placeholder={data.scholarship10Category}
                  name="scholarship10Category"
                  onChange={ handleInputChange}
                >
                  {scholarshipCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                   <Select
                  placeholder={data.scholarship10Grade}
                  name="scholarship10Grade"
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
                    placeholder={data.scholarship10Field}
                 
                    name="scholarship10Field"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship10From}
                    name="scholarship10From"
                    // value={formData.scholarship1.from}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship10To}
                    name="scholarship10To"
                    // value={formData.scholarship1.to}
                    onChange={handleInputChange}
                  />
                  <Input
                    type='number'
                    placeholder={data.scholarship10Gpa}
                    name="scholarship10Gpa"
                    // value={formData.scholarship1.gpa}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data.scholarship10Remarks}
                    name="scholarship10Remarks"
                    // value={formData.scholarship1.remarks}
                    onChange={handleInputChange}
                  />
                </Grid>

              {/* CURRENT ADDRESS */}
              <FormControl>
                <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel>Province</FormLabel>
                  <FormLabel>District</FormLabel>
                  <FormLabel >Municipality</FormLabel>
                  <FormLabel>Ward No.</FormLabel>
                </Grid>
                <HStack>
                {district == "all" ?
                  <Select
                      placeholder={data.permanentProvince}
                      name="permanentProvince"
                      onChange={handleInputChange}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                  :
                  <Input placeholder={data.permanentProvince} isDisabled />
                  }
                {district == "all" ?
                <Select
                      placeholder={data.permanentDistrict}
                      name="permanentDistrict"
                      onChange={handleInputChange}
                  >
                      {selectedPermanentProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                  </Select>
                    :
                    <Input placeholder={data.permanentProvince} isDisabled />
                      }
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
                <Select
                      placeholder={data.currentProvince}
                      name="currentProvince"
                      onChange={handleInputChange}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                <Select
                      placeholder={data.currentDistrict}
                      name="currentDistrict"
                      onChange={handleInputChange}
                  >
                      {selectedCurrentProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                  </Select>
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