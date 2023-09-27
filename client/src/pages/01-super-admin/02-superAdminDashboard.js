import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {
    Box,
    Heading,
    Image,
    Text,
    Grid,
    useColorModeValue,
    Container
} from '@chakra-ui/react'
const baseUrl = process.env.REACT_APP_BASE_URL 

const SuperAdminDashboard = () => {
    const[distAdminList, setDistAdminList] = useState([])

    const fetchData = async () => {
        const res = await axios.get(`${baseUrl}/get-dist-admins-list`)
        if (res) {
            const data = res.data.data
            // setImage1(`data:image/jpeg;base64,${data.valuableClientsImage1}`) 
            // setHeading1(data.heading1)
            // setText1(data.text1)
            // setDescription1(data.description1)

        }
    }

    useEffect(() => {
        fetchData()
    })
    return(
        <>
        <Grid color='blue.800'
                                templateColumns={{ sm: '1fr', md:'1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}
                                p={3}
                                gap={1}
                                textAlign={"left"}
                                fontWeight={"bold"}
                                borderTop="1px solid"
                                borderX="1px solid"
                                borderColor="lightGray"
                            >

                                <Text w="30px" textAlign={"left"} >SN</Text>
                                <Text w="120px" textAlign={"left"} >Regd. date</Text>
                                <Text w="200px">District</Text>
                                <Text w="80px">Name</Text>
                                <Text w="150px">Email</Text>
                                <Text w="300px">Password</Text>
                                <Text w="120px">Edit</Text>
                                <Text w="60px">Delete</Text>

                            </Grid>
        </>
    )
}

export default SuperAdminDashboard