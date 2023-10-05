import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import StudentNumberDisplay from '../../components/dataDisplay/studentNumberDisplay'

const baseUrl = process.env.REACT_APP_BASE_URL

const SuperAdminDashboard = () => {
    const [studentsList, setStudentsList] = useState([])

    const fetchStudentsList = async () => {
        const res = await axios.get(`${baseUrl}/get-student-profiles`)
        if (res) {
            const data = res.data.data
            setStudentsList(data.reverse())
        }
    }
    useEffect(() => {
        fetchStudentsList()
    }, [])

    return(
        <>
        <StudentNumberDisplay studentsList={studentsList} />
        </>
    )
    
}

export default SuperAdminDashboard