import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import BoardMembersGrid from '../../components/grids/boardMembersGrid'


const PrlEthStudentsList = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <Text textAlign={"center"} m={5} fontWeight={"bold"} fontSize={"22px"}> PRL & ETH Students</Text>
            <BoardMembersGrid district={""} scholarshipProject="prlEth" />
            
        </Box>
    </>
    )
}

export default PrlEthStudentsList