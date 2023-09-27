import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Box,
    Heading,
    Image,
    Text,
    Grid,
    Center,
    Container,
    HStack,
    Button
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import CreateUserForm from '../../components/form/createUserForm';

const baseUrl = process.env.REACT_APP_BASE_URL

const SuperAdminDashboard = () => {
    const [distAdminList, setDistAdminList] = useState([])
    //SWITCH BETN MANAGE USERS AND CREATE USERS
    const [isCreateNewUserActive, setIsCreateNewUserActive] = useState(false)
    const fetchData = async () => {
        const res = await axios.get(`${baseUrl}/get-dist-admins-list`)
        if (res) {
            const data = res.data.data
            setDistAdminList(data.reverse())
            // setImage1(`data:image/jpeg;base64,${data.valuableClientsImage1}`) 
            // setHeading1(data.heading1)
            // setText1(data.text1)
            // setDescription1(data.description1)

        }
    }
    console.log(distAdminList)

    useEffect(() => {
        fetchData()
    }, [])
    return (<>
        <Box
            textAlign="center"
        >
            <Heading m={5} > District Admin Users Management</Heading>
            <Center p={5}>
                <HStack>
                    <Button
                    colorScheme={isCreateNewUserActive == false ? "blue" : "gray" }
                    _hover={{ border: '2px solid #1C6FEB' }} 
                    transition="0.15s ease-in-out" 
                    onClick={() => {setIsCreateNewUserActive(false)}}
                    >Manage</Button>
                    <Button 
                    colorScheme={isCreateNewUserActive == true ? "blue" : "gray" }
                    _hover={{ border: '2px solid #1C6FEB' }} 
                    transition="0.15s ease-in-out" 
                    onClick={() => {setIsCreateNewUserActive(true)}}
                    >Create</Button>
                </HStack>
            </Center>
            {isCreateNewUserActive == false ? 
            (<Box
                mx={10}
                isCentered >
                {/* LIST HEADER */}
                <Grid color='white'
                    templateColumns={{ sm: '1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 2fr 2fr 2fr 1fr 1fr 1fr 1fr' }}
                    p={1}
                    m={1}
                    h={10}
                    gap={1}
                    // w={"80%"}
                    bg={'blue.700'}
                    textAlign={"left"}
                    fontWeight={"bold"}
                    align="center"
                    justify="center"
                >
                    <Text w="30px"  >SN</Text>
                    <Text w="150px">District</Text>
                    <Text w="200px">Name</Text>
                    <Text w="200px">Email</Text>
                    <Text w="200px">Password</Text>
                    <Text w="120px" >Regd. date</Text>
                    <Text w="120px"  >Updated date</Text>
                    <Text w="60px">Edit</Text>
                    <Text w="60px">Delete</Text>
                </Grid>
                {/* LIST BODY */}
                {distAdminList && distAdminList.map((distAdmin, index) => {
                    const isEven = index % 2 === 0;
                    const rowStyle = {
                        backgroundColor: isEven ? 'lightgray' : 'white',
                        // color: isEven ? 'white' : 'black' 
                        // padding: '3px',
                        // gap: '1px',
                    };
                    return (<>
                        <Box
                            // mx={10}
                            isCentered
                        >
                            <Grid
                                templateColumns={{ sm: '1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 2fr 2fr 2fr 1fr 1fr 1fr 1fr' }}
                                p={1}
                                m={1}
                                h={10}
                                gap={1}
                                // w={"80%"}
                                bg={'blue.300'}
                                textAlign={"left"}
                                // borderColor="blue.400"
                                align="center"
                                justify="center"
                                style={rowStyle}
                                key={distAdmin._id}
                            >

                                <Text w="30px"  >{index + 1}</Text>
                                <Text w="150px"  >{distAdmin.district}</Text>
                                <Text w="200px">{distAdmin.fullName}</Text>
                                <Text w="200px">{distAdmin.email}</Text>
                                <Text w="200px">**********</Text>
                                <Text w="120px">{distAdmin.createdAt.slice(0, 10)}</Text>
                                <Text w="120px" >{distAdmin.updatedAt.slice(0, 10)}</Text>
                                <Box w="60px">
                                    <ViewIcon
                                        style={{ cursor: 'pointer' }}
                                        _hover={{ color: 'blue.400' }}
                                        onClick={() => {
                                            // onOpen()
                                            // setselectedJob(doc)
                                            // setReqQualificationsList(doc.reqQualification)
                                            // setReqSkillsList(doc.skillsRequired)
                                            // setReqResponsiblitiesList(doc.responsiblities)
                                        }} />
                                </Box>
                                <Box w="60px">
                                    <DeleteIcon
                                        style={{ cursor: 'pointer' }}
                                        _hover={{ color: 'blue.400' }}
                                        onClick={() => {
                                            // setJobTodelete(doc._id)
                                            // handleDeleteDialogOpen()

                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Box>
                    </>)
                })}
            </Box>)
            :
            (
            <CreateUserForm setIsCreateNewUserActive={setIsCreateNewUserActive} />
            )}
        </Box>
    </>
    )
}

export default SuperAdminDashboard