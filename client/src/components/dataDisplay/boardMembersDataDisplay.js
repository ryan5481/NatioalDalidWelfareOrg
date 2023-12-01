import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'

const BoardMembersDataDisplay = ({data}) => {

    const getListByIthnicity = (ethnicityName) => {
        return data?.filter((item) => item?.ethnicity == ethnicityName)
    }

    const getListByGender = (ethnicityName, gender) => {
        return data?.filter((item) => item?.ethnicity == ethnicityName && item?.gender == gender) 
    }

    return (
                <VStack m={5} pos="relative" >
                            <Heading fontSize="3xl" p={2} >Board Members</Heading>
                    <Box>
                        <VStack p={2} w="150px" h="130px" rounded={10} border={'solid 1px gray'} >
                            <Heading fontSize="5xl" >{data.length}</Heading>
                            <Text fontSize="xl" >Total</Text>
                        </VStack>
                    </Box>
                    <HStack>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Badi").length}</Heading>
                                    <Text>Badi</Text>
                                </Box>
                                <HStack>
                                    <Text>Female</Text> <Text>{getListByGender("Badi", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Badi", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Badi", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Gandarva").length}</Heading>
                                    <Text>Gandarva</Text>
                                </Box>
                                <HStack>
                                    <Text>Female</Text> <Text>{getListByGender("Gandarva", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Gandarva", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Gandarva", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Madeshi Origin").length} </Heading>
                                    <Text  >Madeshi Origin</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{getListByGender("Madeshi Origin", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Madeshi Origin", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Madeshi Origin", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Pariyar").length}</Heading>
                                    <Text  >Pariyar</Text>
                                </Box>
                                <HStack>
                                    <Text>Female</Text> <Text>{getListByGender("Pariyar", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Pariyar", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Pariyar", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Sarki").length}</Heading>
                                    <Text >Sarki</Text>
                                </Box>
                                <HStack>
                                    <Text>Female</Text> <Text>{getListByGender("Sarki", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Sarki", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Sarki", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="130px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{data && getListByIthnicity("Viswakarma").length}</Heading>
                                    <Text  >Viswakarma</Text>
                                </Box>
                                <HStack>
                                    <Text>Female</Text> <Text>{getListByGender("Viswakarma", "Female").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Male</Text> <Text>{getListByGender("Viswakarma", "Male").length}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{getListByGender("Viswakarma", "Other").length}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
    )
}

export default BoardMembersDataDisplay