import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import DistUsersGrid from '../../components/grids/distUsersGrid';
import StudentsGrid from '../../components/grids/studentsGrid';


const NcacpStudentsList = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <Text textAlign={"center"} m={5} fontWeight={"bold"} fontSize={"22px"}> NCSEP Students</Text>
            <StudentsGrid district={""} />
            
        </Box>
    </>
    )
}

export default NcacpStudentsList