import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import BoardMembersGrid from '../../components/grids/boardMembersGrid'


const PrlEthStudentsList = () => {
    
    return (<>
        <Box>
            <BoardMembersGrid district={""} scholarshipProject="prlEth" />
        </Box>
    </>
    )
}

export default PrlEthStudentsList