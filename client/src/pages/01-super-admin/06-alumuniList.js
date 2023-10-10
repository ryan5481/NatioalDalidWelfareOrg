import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import AlumuniStudentsGrid from '../../components/grids/alumuniStudentsGrid'


const AlumuniList = () => {
    
    return (<>
        <Box
            textAlign="center"
        >
            <Text textAlign={"center"} m={5} fontWeight={"bold"} fontSize={"22px"}>Alumuni</Text>
            <AlumuniStudentsGrid district={""}  />
            
        </Box>
    </>
    )
}

export default AlumuniList