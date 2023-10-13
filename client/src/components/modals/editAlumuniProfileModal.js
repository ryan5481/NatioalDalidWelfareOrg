import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import {
  useToast, Grid, Image, Box, FormLabel, Center, EditablePreview, EditableInput, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'
import { Form } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BASE_URL

const EditAlumuniProfileModal = ({ isOpen, onClose, setIsCreateNewUserActive, data }) => {
  const { userRole } = useSelector(state => state.user)
  const imageInputRef = useRef()
  const toast = useToast()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')

  const initialFormData = {
    // profileImageName: '',
    name: '',
    email: '',
    contactNumber: '',
    citizenshipNumber: '',

    currentStatus: '',
    occupation: '',
    position: '',
    organization: '',

    municipality: '',
    wardNo: '',
    alumuniDistrict: '',
    province: '',
  
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData({
      name: data.name,
      email: data.email,
      contactNumber: data.contactNumber,
      citizenshipNumber: data.citizenshipNumber,

      currentStatus: data.currentStatus,
      occupation: data.occupation,
      position: data.position,
      organization: data.organization,

      municipality: data.municipality,
      wardNo: data.wardNo,
      alumuniDistrict: data.alumuniDistrict,
      province: data.province,
    })
  }, [])


  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`${baseUrl}/edit-alumuni-student-profile/${data._id}`, formData,
        {headers: {
            'Content-Type': 'application/json',
          }}
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
            <form>
                    <VStack>
                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder={data.name}
                                    name='name'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Contact number</FormLabel>
                                <Input
                                    placeholder={data.contactNumber}
                                    name='contactNumber'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder={data.email}
                                    name='email'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Citizenship number</FormLabel>
                                <Input
                                    placeholder={data.citizenshipNumber}
                                    name='citizenshipNumber'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </HStack>

                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Current status</FormLabel>
                                <Input
                                    placeholder={data.currentStatus}
                                    name='currentStatus'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Occupation</FormLabel>
                                <Input
                                    placeholder={data.occupation}
                                    name='occupation'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Organization</FormLabel>
                                <Input
                                    placeholder={data.organization}
                                    name='organization'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Position</FormLabel>
                                <Input
                                    placeholder={data.position}
                                    name='position'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </HStack>
                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Municipality</FormLabel>
                                <Input
                                    placeholder={data.municipality}
                                    name='municipality'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Ward Number</FormLabel>
                                <Input
                                    placeholder={data.wardNo}
                                    name='wardNo'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>District</FormLabel>
                                <Input
                                    placeholder={data.alumuniDistrict}
                                    name='alumuniDistrict'
                                    onChange={handleInputChange}
                                    isDisabled={userRole !== "superAdmin" }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Province</FormLabel>
                                <Input
                                    placeholder={data.province}
                                    name='province'
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </HStack>
                    </VStack>
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

export default EditAlumuniProfileModal