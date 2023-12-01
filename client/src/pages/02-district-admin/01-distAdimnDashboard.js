import {Text, useToast} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import SuperAdminDashboard from '../01-super-admin/01-SuperAdminDashboard';
const baseUrl = process.env.REACT_APP_BASE_URL;


const DistAdminDashboard = () => {
    const toast = useToast()
    const [studentsList, setStudentsList] = useState([])

    const fetchStudentsList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/get-student-profiles`);
            if (res) {
                const data = res.data.data;
                setStudentsList(data.reverse());
               
            }
        } catch (error) {
            console.error('Error fetching students list:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch students list',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchStudentsList()
    },[])


    return(
        <>
            <SuperAdminDashboard left={{base: "300px", sm:"300px", md: "200px",lg:"100px", xl: "100px" }}  />
        </>
    )
}

export default DistAdminDashboard