import React from 'react'
import { Box } from '@chakra-ui/react'
import DistUsersGrid from '../../components/grids/distUsersGrid';
import StudentsGrid from '../../components/grids/studentsGrid';


const NcacpStudentsList = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <StudentsGrid district={""} />
            
        </Box>
    </>
    )
}

export default NcacpStudentsList