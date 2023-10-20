import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import {
  useToast, Grid, Image, Box, FormLabel, Center, EditablePreview, Select, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'
import provinces from "../datasets/provinces.json"
import districts from "../datasets/districts.json"
import municipalities from "../datasets/municipalities.json"
const nepalProvincesList = provinces.map(item => item.name).sort();
const nepalDistrcitsList = districts.map(item => item.name).sort();
const baseUrl = process.env.REACT_APP_BASE_URL;

const EditAlumuniProfileModal = ({ isOpen, onClose, setIsCreateNewUserActive, data }) => {
  const { userRole, district } = useSelector(state => state.user)
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
      name: data?.name,
      email: data?.email,
      contactNumber: data?.contactNumber,
      citizenshipNumber: data?.citizenshipNumber,

      currentStatus: data?.currentStatus,
      occupation: data?.occupation,
      position: data?.position,
      organization: data?.organization,

      municipality: data?.municipality,
      wardNo: data?.wardNo,
      alumuniDistrict: data?.alumuniDistrict,
      province: data?.province,
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

  // CONDITIONAL ADDRESS DROPDOWN
  let selectedCurrentProvince = {}
  if(formData?.province){
    selectedCurrentProvince = provinces.find(province => province.name == formData.province)
  }
  const selectedProvinceDistricts = selectedCurrentProvince !== null ? districts.filter(district => district.province_id === selectedCurrentProvince?.id) : nepalDistrcitsList

  let selectedCurrentDistrict = {}
  if(formData?.alumuniDistrict){
    selectedCurrentDistrict = districts.find(district => district.name == formData.alumuniDistrict)
  }
  const selectedDistrictMunicipalities = selectedCurrentDistrict ? municipalities.filter(municipality => municipality.district_id === selectedCurrentDistrict?.id) : []

//GET MUNICIPALITIES OF THE LOGGED DISTRICT ADMIN'S DISTRICT to AUTO UPDATE
let loggedInDistrictObject = {}
loggedInDistrictObject = districts.find(item => item.name == district)
 console.log(loggedInDistrictObject)
const loggedInDistrictMunicipalities = municipalities.filter(municipality => municipality.district_id === loggedInDistrictObject?.id)
  
//GET PROVINCE OF THE LOGGED DISTRICT ADMIN'S DISTRICT to AUTO UPDATE
let loggedInProvinceId = loggedInDistrictObject?.province_id
let loggedInProvinceObject = provinces.find(item => item.id == loggedInProvinceId)
let loggedInDistAdminProvince = loggedInProvinceObject?.name

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
                                <FormLabel>Province</FormLabel>
                {district == "all" ?

                                <Select
                                    placeholder={data.province}
                                    name='province'
                                    onChange={handleInputChange}
                                >
                                  {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                                </Select>
                                :
                                <Input placeholder={data.province} isDisabled />
                                }
                            </FormControl>
                            <FormControl>
                                <FormLabel>District</FormLabel>
                {district == "all" ?

                                <Select
                                    placeholder={data.alumuniDistrict}
                                    name='alumuniDistrict'
                                    onChange={handleInputChange}
                                >
                                  {selectedProvinceDistricts.map((district, index) => (
                          <option key={index} value={district.name} >{district.name}</option>
                      ))}
                                </Select>
                                :
                                <Input placeholder={data.alumuniDistrict} isDisabled />
                                }
                            </FormControl>
                            <FormControl>
                                <FormLabel>Municipality</FormLabel>

                                <Select
                                    placeholder={data.municipality}
                                    name='municipality'
                                    onChange={handleInputChange}
                                >
                                  {selectedDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                      ))}
                      </Select>
                            </FormControl>
                           
                            <FormControl>
                                <FormLabel>ward No.</FormLabel>
                                <Input
                                    placeholder={data.wardNo}
                                    name='wardNo'
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