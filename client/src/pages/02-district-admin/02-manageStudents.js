import React from 'react'
import { Box } from '@chakra-ui/react'
import StudentsGrid from '../../components/grids/studentsGrid'


const ManageStudents = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <StudentsGrid />
        </Box>
    </>
    )
}

export default ManageStudents