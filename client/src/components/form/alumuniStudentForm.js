
import { useState } from "react"
import { useSelector } from "react-redux";
import { Center, Button, Box, Heading, FormControl, FormLabel, Input, HStack, VStack, useToast, Select, Toast } from "@chakra-ui/react"
import axios from 'axios';
import provinces from "../datasets/provinces.json"
import districts from "../datasets/districts.json"
import municipalities from "../datasets/municipalities.json"
const nepalProvincesList = provinces.map(item => item.name).sort();
const nepalDistrcitsList = districts.map(item => item.name).sort();
const baseUrl = process.env.REACT_APP_BASE_URL;


    const AlumuniStudentForm = ({ setIsCreateNewUserActive, scholarshipProject }) => {
    const { district, userRole } = useSelector(state => state.user)
    const toast = useToast()
    const [project, setProject] = useState("")
    const [name, setName] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")
    const [citizenshipNumber, setCitizenshipNumber] = useState("")
    const [currentStatus, setCurrentStatus] = useState("")
    const [occupation, setOccupation] = useState("")
    const [organization, setOrganization] = useState("")
    const [position, setPosition] = useState("")
    const [municipality, setMunicipality] = useState("")
    const [wardNo, setWardNo] = useState("")
    const [alumuniDistrict, setAlumuniDistrict] = useState("")
    const [province, setProvince] = useState("")


    const submitForm = async () => {
        const formData = new FormData()
        formData.append('registeredBy', district)
        if(district !== "all"){
            formData.append('project', "ncsep")
        }else{
            formData.append('project', project)
        }
        formData.append('name', name)
        formData.append('contactNumber', contactNumber)
        formData.append('email', email)
        formData.append('citizenshipNumber', citizenshipNumber)
        formData.append('currentStatus', currentStatus)
        formData.append('occupation', occupation)
        formData.append('organization', organization)
        formData.append('position', position)
        formData.append('municipality', municipality)
        formData.append('wardNo', wardNo)
        formData.append('alumuniDistrict', district)
        formData.append('province', loggedInDistAdminProvince)

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
                // window.location.reload()

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

// CONDITIONAL ADDRESS DROPDOWN
  let selectedCurrentProvince = {}
  if(province){
    selectedCurrentProvince = provinces.find(province => province.name == province)
  }
  const selectedProvinceDistricts = selectedCurrentProvince !== null ? districts.filter(district => district.province_id === selectedCurrentProvince?.id) : nepalDistrcitsList

  let selectedCurrentDistrict = {}
  if(alumuniDistrict){
    selectedCurrentDistrict = districts.find(district => district.name == alumuniDistrict)
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
            <Box
                w={"5xl"}
                bg="white"
                pos="relative"
                left={"100px"}
                rounded={10}
                border={'solid 1px lightgray'}
                p={5}
            >
                <Heading m={5} textAlign="center" fontSize="26px" >Alumini Student Form</Heading>

                <form>
                    <VStack>
                    {district == "all" && <FormControl px={20} mb={5} w={"500px"} >
                      <FormLabel>Project</FormLabel>
                      <Select
                        placeholder='Select'
                        onChange={(event) => setProject(event.target.value)}
                      >
                        <option key="ncsep" value="ncsep">
                          NCSEP
                        </option>
                        <option key="prlEths" value="prlEths">
                          PRL & ETHS
                        </option>
                      </Select>
                    </FormControl>}
                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Contact number</FormLabel>
                                <Input
                                type="number"
                                    placeholder='Contact number'
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                type="email"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Citizenship number</FormLabel>
                                <Input
                                type="number"
                                    placeholder='Citizenship number'
                                    onChange={(e) => setCitizenshipNumber(e.target.value)}
                                />
                            </FormControl>
                        </HStack>

                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Current status</FormLabel>
                                <Input
                                    placeholder='Current status'
                                    onChange={(e) => setCurrentStatus(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Occupation</FormLabel>
                                <Input
                                    placeholder='Occupation'
                                    onChange={(e) => setOccupation(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Organization</FormLabel>
                                <Input
                                    placeholder='Organization'
                                    onChange={(e) => setOrganization(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Position</FormLabel>
                                <Input
                                    placeholder='Position'
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                {/* Province is set to the district admin's province, is only selectable by super admin */}
                <FormControl>
                    <FormLabel>Province</FormLabel>
                  {district == "all" ?
                    <Select
                      placeholder="Province"
                      onChange={(e) => setProvince(e.target.value)}
                  >
                      {nepalProvincesList.map((province, index) => (
                          <option key={index} value={province} >{province}</option>
                      ))}
                  </Select>
                  :
                  <Input
                  placeholder={loggedInDistAdminProvince}
s                  isDisabled
                />
                  }
                </FormControl>
                {/* District is set to the district admin's district, is only selectable by super admin */}
                <FormControl>
                    <FormLabel>District</FormLabel>
                 { 
                 district == "all" ?
                 <Select
                      placeholder="District"
                      onChange={(e) => setAlumuniDistrict(e.target.value)}
                  >
                      {selectedProvinceDistricts.map((district, index) => (
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
                </FormControl>
                <FormControl>
                    <FormLabel>Municipality</FormLabel>
                  <Select
                      placeholder="Municipality"
                      onChange={(e) => setMunicipality(e.target.value)}
                  >
                      {
                        district == "all" ?
                      selectedDistrictMunicipalities.map((municipality, index) => (
                          <option key={index} value={municipality.name} >{municipality.name}</option>
                      ))
                      :
                      loggedInDistrictMunicipalities.map((municipality, index) => (
                        <option key={index} value={municipality.name} >{municipality.name}</option>))
                    }
                  </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Ward no.</FormLabel>
                  <Input
                    placeholder='Ward no.'
                    type='number'
                    onChange={(e) => setWardNo(e.target.value)}
                  />
                </FormControl>
                </HStack>
                    </VStack>
                    <Box justifySelf="center" m={5}  >
                        <Center>
                            <Button onClick={() => setIsCreateNewUserActive(false)} colorScheme='red' mx={1} w={'200px'} >Cancel</Button>
                            <Button onClick={() => submitForm()} colorScheme='green' mx={1} w={'200px'} >Save</Button>
                        </Center>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default AlumuniStudentForm