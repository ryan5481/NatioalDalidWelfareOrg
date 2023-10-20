import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import {
  useToast, Grid, Image, Box, FormLabel, Select, Stack, RadioGroup, Radio, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'
import { Form } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BASE_URL

const EditBoardMemberProfileModal = ({ isOpen, onClose, data, scholarshipProject }) => {
  const imageInputRef = useRef()
  const toast = useToast()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')

  const initialFormData = {
    // profileImageName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    citizenshipNumber: '',

    membershipType: '',

    qualification: '',
    graduatedYear: '',
    institutionName: '',
    institutionAddress: '',

    position1: '',
    joinedDate1: '',
    tenure1: '',
    remark1: '',

    position2: '',
    joinedDate2: '',
    tenure2: '',
    remark2: '',

    position3: '',
    joinedDate3: '',
    tenure3: '',
    remark3: '',

    position4: '',
    joinedDate4: '',
    tenure4: '',
    remark4: '',

    position5: '',
    joinedDate5: '',
    tenure5: '',
    remark5: '',

    permanentMunicipality: '',
    permanentWardNumber: '',
    permanentDistrict: '',
    permanentProvince: '',

    temporaryMunicipality: '',
    temporaryWardNumber: '',
    temporaryDistrict: '',
    temporaryProvince: '',

    profession1: '',
    organization1: '',
    address1: '',
    startingDate1: '',
    currentStatus1: '',
    pRemark1: '',

    profession2: '',
    organization2: '',
    address2: '',
    startingDate2: '',
    currentStatus2: '',
    pRemark2: '',

    profession3: '',
    organization3: '',
    address3: '',
    startingDate3: '',
    currentStatus3: '',
    pRemark3: '',

    profession4: '',
    organization4: '',
    address4: '',
    startingDate4: '',
    currentStatus4: '',
    pRemark4: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    setFormData({
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      dateOfBirth: data?.dateOfBirth,
      citizenshipNumber: data?.citizenshipNumber,
      contactNumber: data?.contactNumber,
      email: data?.email,
      
      membershipType: data?.membershipType,

      qualification: data?.qualification,
      graduatedYear: data?.graduatedYear,
      institutionName: data?.institutionName,
      institutionAddress: data?.institutionAddress,

      position1: data?.position1,
      joinedDate1: data?.joinedDate1,
      tenure1: data?.tenure1,
      remark1: data?.remark1,

      position2: data?.position2,
      joinedDate2: data?.joinedDate2,
      tenure2: data?.tenure2,
      remark2: data?.remark2,

      position3: data?.position3,
      joinedDate3: data?.joinedDate3,
      tenure3: data?.tenure3,
      remark3: data?.remark3,

      position4: data?.position4,
      joinedDate4: data?.joinedDate4,
      tenure4: data?.tenure4,
      remark4: data?.remark4,

      position5: data?.position5,
      joinedDate5: data?.joinedDate5,
      tenure5: data?.tenure5,
      remark5: data?.remark5,

      permanentMunicipality: data?.permanentMunicipality,
      permanentWardNumber: data?.permanentWardNumber,
      permanentDistrict: data?.permanentDistrict,
      permanentProvince: data?.permanentProvince,

      temporaryMunicipality: data?.temporaryMunicipality,
      temporaryWardNumber: data?.temporaryWardNumber,
      temporaryDistrict: data?.temporaryDistrict,
      temporaryProvince: data?.temporaryProvince,

      profession1: data?.profession1,
      organization1: data?.organization1,
      address1: data?.address1,
      startingDate1: data?.startingDate1,
      currentStatus1: data?.currentStatus1,
      pRemark1: data?.pRemark1,

      profession2: data?.profession2,
      organization2: data?.organization2,
      address2: data?.address2,
      startingDate2: data?.startingDate2,
      currentStatus2: data?.currentStatus2,
      pRemark2: data?.pRemark2,

      profession3: data?.profession3,
      organization3: data?.organization3,
      address3: data?.address3,
      startingDate3: data?.startingDate3,
      currentStatus3: data?.currentStatus3,
      pRemark3: data?.pRemark3,

      profession4: data?.profession4,
      organization4: data?.organization4,
      address4: data?.address4,
      startingDate4: data?.startingDate4,
      currentStatus4: data?.currentStatus4,
      pRemark4: data?.pRemark4,
    })
  }, [])


  const handleSubmit = async (event) => {
    try {
      const res = await axios.patch(`${baseUrl}/edit-board-member-profile/${data._id}`, formData,
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
            <ModalHeader textAlign="center" fontSize="24px" >Edit Board Member Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody m={5} >
              <form
              >
                <Grid gridTemplateColumns={"1fr 3fr"}>
                  {data?.profileImageName && <Image
                    rounded={10}
                    src={require(`../../uploads/boardMemberImage/${data?.profileImageName}`)} w="200px"
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
                          placeholder={data?.firstName}
                          name='firstName'
                          onChange={handleInputChange}
                          isRequired
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Middle name</FormLabel>
                        <Input
                          placeholder={data?.middleName}
                          name="middleName"
                          // value={formdata?.middleName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Last name</FormLabel>
                        <Input
                          placeholder={data?.lastName}
                          isRequired
                          name="lastName"
                          // value={formdata?.lastName}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                    <HStack justify="flex-start" mb={5}>
                    
                      <FormControl>
                        <FormLabel>Date of birth</FormLabel>
                        <Input
                          placeholder={data?.dateOfBirth}
                          isRequired
                          name="dateOfBirth"
                          // value={formdata?.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Birth certificate number</FormLabel>
                        <Input
                          placeholder={data?.citizenshipNumber}
                          type='number'
                          name="citizenshipNumber"
                          // value={formdata?.birthCertificateNo}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                    <HStack justify="flex-start" mb={5}>
                      <FormControl>
                        <FormLabel>Contact number</FormLabel>
                        <Input placeholder={data?.contactNumber}
                          type='number'
                          isRequired
                          name="contactNumber"
                          // value={formdata?.contactNumber}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email ID</FormLabel>
                        <Input
                          placeholder={data?.email}
                          type='email'
                          name="email"
                          // value={formdata?.email}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </HStack>
                  </Box>
                </Grid>

                <FormControl mb={5} >
            <FormLabel fontSize="22px" fontWeight="bold" >Membership type</FormLabel>
            <Select w="500px"
                        placeholder={data?.membershipType}
                        name='membershipType'
                        onChange={handleInputChange}
                      >
                        <option key="General" value="General">
                        General
                        </option>
                        <option key="Active" value="Active">
                        Active
                        </option>
                        <option key="Honorary" value="Honorary">
                        Honorary
                        </option>
                        <option key="Lifetime" value="Lifetime">
                        Lifetime
                        </option>
                      </Select>
            </FormControl>
               {/* QUALIFICATION */}
               <FormControl mb={5} >
                <FormLabel mt={5} fontSize="22px" fontWeight="bold"  >Education</FormLabel>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                  <FormLabel >Qualification</FormLabel>
                  <FormLabel>Graduated year</FormLabel>
                  <FormLabel>Institution name</FormLabel>
                  <FormLabel>Address</FormLabel>
                </Grid>
                <HStack>
                  <Input
                    placeholder={data?.qualification}
                    name="qualification"
                    // value={formdata?.permanentAddress.municipality}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data?.graduatedYear}
                    type='number'
                    name='graduatedYear'
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder={data?.institutionName}
                    name="institutionName"
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder={data?.institutionAddress}
                    name='institutionAddress'
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
                {/* TENURE */}
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
                  placeholder={data?.position1}
                  name="position1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.joinedDate1}
                   name="joinedDate1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.tenure1}
                  name="tenure1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.remark1}
                  name="remark1"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Tenure TWO */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>2. </FormLabel>
                <Input
                  placeholder={data?.position2}
                  name="position2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.joinedDate2}
                  name="joinedDate2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.tenure2}
                  name="tenure2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.remark2}
                  name="remark2"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Tenure THREE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>3. </FormLabel>
                <Input
                  placeholder={data?.position3}
                  name="position3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.joinedDate3}
                  name="joinedDate3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.tenure3}
                  name="tenure3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.remark3}
                  name="remark3"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Tenure FOUR */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>4. </FormLabel>
                <Input
                  placeholder={data?.position4}
                  name="position4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.joinedDate4}
                  name="joinedDate4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.tenure4}
                  name="tenure4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.remark4}
                  name="remark4"
                  onChange={handleInputChange}
                />
              </Grid>
              {/* Tenure FIVE */}
              <Grid gridTemplateColumns={"0.1fr 1fr 1fr 1fr 1fr"} gap={1} mb={1} >
                <FormLabel>5. </FormLabel>
                <Input
                  placeholder={data?.position5}
                  name="position5"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.joinedDate5}
                  name="joinedDate5"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.tenure5}
                  name="tenure5"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.remark5}
                  name="remark5"
                  onChange={handleInputChange}
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
                  placeholder={data?.permanentMunicipality}
                  name="permanentMunicipality"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.permanentWardNo}
                  type='number'
                  name="permanentWardNo"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.permanentDistrict}
                  name="permanentDistrict"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.permanentProvince}
                  name="permanentProvince"
                  onChange={handleInputChange}
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
                  placeholder={data?.temporaryMunicipality}
                  name="temporaryMunicipality"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.temporaryWardNo}
                  type='number'
                  name="temporaryWardNo"
                  onChange={handleInputChange}
                />
                
                <Input
                  placeholder={data?.temporaryDistrict}
                  name="temporaryDistrict"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.temporaryProvince}
                  name="temporaryProvince"
                  onChange={handleInputChange}
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
                  placeholder={data?.profession1}
                  name="profession1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.organization1}
                  name="organization1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.address1}
                  name="address1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.startingDate1}
                  name="startingDate1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.currentStatus1}
                  name="currentStatus1"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.pRemark1}
                  name="pRemark1"
                  onChange={handleInputChange}
                />
              </Grid>
            {/* PERSONAL TWO */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>2. </FormLabel>
                <Input
                  placeholder={data?.profession2}
                  name="profession2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.organization2}
                  name="organization2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.address2}
                  name="address2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.startingDate2}
                  name="startingDate2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.currentStatus2}
                  name="currentStatus2"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.pRemark2}
                  name="pRemark2"
                  onChange={handleInputChange}
                />
              </Grid>
            {/* PERSONAL THREE */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>1. </FormLabel>
                <Input
                  placeholder={data?.profession3}
                  name="profession3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.organization3}
                  name="organization3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.address3}
                  name="address3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.startingDate3}
                  name="startingDate3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.currentStatus3}
                  name="currentStatus3"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.pRemark3}
                  name="pRemark3"
                  onChange={handleInputChange}
                />
              </Grid>
            {/* PERSONAL FOUR */}
               <Grid gridTemplateColumns={"0.1fr 0.7fr 1fr 1fr 0.7fr 0.7fr 1fr"} gap={1} mb={1} >
                <FormLabel>4. </FormLabel>
                <Input
                  placeholder={data?.profession4}
                  name="profession4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.organization4}
                  name="organization4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.address4}
                  name="address4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.startingDate4}
                  name="startingDate4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.currentStatus4}
                  name="currentStatus4"
                  onChange={handleInputChange}
                />
                <Input
                  placeholder={data?.pRemark4}
                  name="pRemark4"
                  onChange={handleInputChange}
                />
              </Grid>

            </FormControl>
               
              </form>
            </ModalBody>
            <ModalFooter justifyContent="center" >
              <Button colorScheme='red' mx={1} w={'200px'} onClick={onClose}>Cancel</Button>
              <Button colorScheme='green' mx={1} w={'200px'} onClick={() => handleSubmit()} >Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal >}
    </>
  )
}

export default EditBoardMemberProfileModal