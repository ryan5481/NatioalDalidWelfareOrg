import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import DistUsersGrid from '../../components/grids/distUsersGrid';
import StudentsGrid from '../../components/grids/studentsGrid';


const PrlEthStudentsList = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <Text textAlign={"center"} m={5} fontWeight={"bold"} fontSize={"22px"}> PRL & ETHS Students</Text>
            <StudentsGrid district={""} scholarshipProject="prlEth" />
            
        </Box>
    </>
    )
}

export default PrlEthStudentsList