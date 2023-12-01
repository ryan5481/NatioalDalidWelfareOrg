import { useNavigate } from "react-router-dom"
import { Button, VStack, Text, Heading } from '@chakra-ui/react'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <>
            <VStack pos='absolute' left="50%" top="30vh" zIndex={99999} >
                <Heading >404 ERROR</Heading>
                <Text fontSize={22} fontWeight="bold" >This page doesn't exist.</Text>
                <Button onClick={() => navigate('/')} >Return to dashboard</Button>
            </VStack>
        </>
    )
}

export default PageNotFound