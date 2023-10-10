
import { useState } from "react"
import { Center, Button, Box, Heading, FormControl, FormLabel, Input, HStack, VStack, useToast, useStatStyles, Toast } from "@chakra-ui/react"
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;


const AlumuniStudentForm = ({ setIsCreateNewUserActive }) => {
    const toast = useToast()
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
    const [district, setDistrict] = useState("")
    const [province, setProvince] = useState("")


    const submitForm = async () => {
        const formData = new FormData()
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
        formData.append('district', district)
        formData.append('province', province)

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

    return (
        <>
            <Box
                w={"5xl"}
                bg="white"
                pos="relative"
                left={"100px"}
                rounded={10}
                border={'solid 1px lightgray'}
            >
                <Heading m={5} textAlign="center" fontSize="26px" >Alumini Student Form</Heading>

                <form>
                    <VStack>
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
                        <HStack mb={5} >
                            <FormControl>
                                <FormLabel>Municipality</FormLabel>
                                <Input
                                    placeholder='Municipality'
                                    onChange={(e) => setMunicipality(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Ward Number</FormLabel>
                                <Input
                                type="number"
                                    placeholder='Ward Number'
                                    onChange={(e) => setWardNo(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>District</FormLabel>
                                <Input
                                    placeholder='District'
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Province</FormLabel>
                                <Input
                                    placeholder='Province'
                                    onChange={(e) => setProvince(e.target.value)}
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