import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import {
  useToast, Grid, Image, Box, Text, Select, EditablePreview, EditableText,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack, FormControl, VStack, Center
} from '@chakra-ui/react'


const ViewStudentProfileModal = ({ isOpen, onClose, data, scholarshipProject }) => {
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')



  const scholarshipCategories =
    scholarshipProject == "prlEth"
      ? (["", "Pratap Ram Lohar", "ETHS Project"]) : (["", "Special Focus Children", "Highly Vunerable Children", "Role Model (RM)"])

  return (
    <>
      {data &&
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
          size="6xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" fontSize="24px" >Student Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody m={5} >

              <Grid gridTemplateColumns={"1fr 3fr"}>
                {data?.profileImageName && <Image
                  rounded={10}
                  src={require(`../../uploads/studentImage/${data?.profileImageName}`)} w="200px"
                />}
                <Box>
                <HStack mb={5} >
                  <Text fontWeight="bold" >Project:</Text>
                   <Text>
                      {data.project == "NCSEP" ? "Nepal Children Scholarship Endowment Program" : data.project == "ETHS" ? "Etela Tapiola High School" : "Pratap Ram Lohar Memorial Scholarship Program" }
                      </Text>
                  </HStack>
                <Center>
                <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr"} gap={1}   >
                  <VStack gap={8}  align="start" >
                    <Text fontWeight="bold" >First name:</Text>
                    <Text fontWeight="bold">Gender:</Text>
                    <Text fontWeight="bold">Student type:</Text>
                    <Text fontWeight="bold">Ethnicity:</Text>
                  </VStack>
                  <VStack  gap={8}  align="start">
                    <Text>{data.firstName}</Text>
                    <Text>{data.gender}</Text>
                    <Text>{data.studentType}</Text>
                    <Text>{data.ethnicity}</Text>
                  </VStack>
                  <VStack  gap={8}  align="start" >
                    <Text fontWeight="bold" >Middle name:</Text>
                    <Text fontWeight="bold">Date of birth:</Text>
                    <Text fontWeight="bold">Contact no.:</Text>
                  </VStack>
                  <VStack  gap={8}  align="start">
                    <Text>{data.middleName}</Text>
                    <Text>{data.dateOfBirth}</Text>
                    <Text>{data.contactNumber}</Text>
                  </VStack>
                  <VStack  gap={8} align="start" >
                    <Text fontWeight="bold" >Last name:</Text>
                    <Text fontWeight="bold">Birth cert. no.:</Text>
                    <Text fontWeight="bold">Email ID:</Text>
                  </VStack>
                  <VStack  gap={8}  align="start">
                    <Text>{data.lastName}</Text>
                    <Text>{data.birthCertificateNo}</Text>
                    <Text>{data.email}</Text>
                  </VStack>
                </Grid>
                </Center>
                </Box>
              </Grid>


              {/* SCHOLARSHIP */}
              <Text mt={5} fontSize="18px" fontWeight="bold" >Scholarship</Text>
              <Box border={'solid 1px lightgray'}>
                <Grid bg="gray.300" fontWeight="bold" gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} rowGap={5} >
                  <Text ml={1} >SN</Text>
                  <Text >Fund type</Text>
                  <Text >Category</Text>
                  <Text>Grade</Text>
                  <Text>Field</Text>
                  <Text>From</Text>
                  <Text>To</Text>
                  <Text>GPA</Text>
                  <Text>Remarks</Text>
                </Grid>
                {/* SCHOLARSHIP ONE */}
                {data.scholarship1FundType &&
                <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>1.</Text>
                  <Text>{data.scholarship1FundType}</Text>
                  <Text>{data.scholarship1Category}</Text>
                  <Text>{data.scholarship1Grade}</Text>
                  <Text>{data.scholarship1Field}</Text>
                  <Text>{data.scholarship1From}</Text>
                  <Text>{data.scholarship1To}</Text>
                  <Text>{data.scholarship1Gpa}</Text>
                  <Text>{data.scholarship1Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP TWO */}
                {data.scholarship2FundType &&
                <Grid bg="gray.200" gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>2.</Text>
                  <Text>{data.scholarship2FundType}</Text>
                  <Text>{data.scholarship2Category}</Text>
                  <Text>{data.scholarship2Grade}</Text>
                  <Text>{data.scholarship2Field}</Text>
                  <Text>{data.scholarship2From}</Text>
                  <Text>{data.scholarship2To}</Text>
                  <Text>{data.scholarship2Gpa}</Text>
                  <Text>{data.scholarship2Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP THREE */}
                {data.scholarship3FundType &&
                <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>3.</Text>
                  <Text>{data.scholarship3FundType}</Text>
                  <Text>{data.scholarship3Category}</Text>
                  <Text>{data.scholarship3Grade}</Text>
                  <Text>{data.scholarship3Field}</Text>
                  <Text>{data.scholarship3From}</Text>
                  <Text>{data.scholarship3To}</Text>
                  <Text>{data.scholarship3Gpa}</Text>
                  <Text>{data.scholarship3Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP FOUR */}
                {data.scholarship4FundType &&
                  <Grid bg="gray.200" gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>4.</Text>
                  <Text>{data.scholarship4FundType}</Text>
                  <Text>{data.scholarship4Category}</Text>
                  <Text>{data.scholarship4Grade}</Text>
                  <Text>{data.scholarship4Field}</Text>
                  <Text>{data.scholarship4From}</Text>
                  <Text>{data.scholarship4To}</Text>
                  <Text>{data.scholarship4Gpa}</Text>
                  <Text>{data.scholarship4Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP FIVE */}
                {data.scholarship5FundType &&
                  <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>5.</Text>
                  <Text>{data.scholarship5FundType}</Text>
                  <Text>{data.scholarship5Category}</Text>
                  <Text>{data.scholarship5Grade}</Text>
                  <Text>{data.scholarship5Field}</Text>
                  <Text>{data.scholarship5From}</Text>
                  <Text>{data.scholarship5To}</Text>
                  <Text>{data.scholarship5Gpa}</Text>
                  <Text>{data.scholarship5Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP SIX */}
                {data.scholarship6FundType &&
                <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>6.</Text>
                  <Text>{data.scholarship6FundType}</Text>
                  <Text>{data.scholarship6Category}</Text>
                  <Text>{data.scholarship6Grade}</Text>
                  <Text>{data.scholarship6Field}</Text>
                  <Text>{data.scholarship6From}</Text>
                  <Text>{data.scholarship6To}</Text>
                  <Text>{data.scholarship6Gpa}</Text>
                  <Text>{data.scholarship6Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP Seven */}
                {data.scholarship7FundType &&
                <Grid bg="gray.200" gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>7.</Text>
                  <Text>{data.scholarship7FundType}</Text>
                  <Text>{data.scholarship7Category}</Text>
                  <Text>{data.scholarship7Grade}</Text>
                  <Text>{data.scholarship7Field}</Text>
                  <Text>{data.scholarship7From}</Text>
                  <Text>{data.scholarship7To}</Text>
                  <Text>{data.scholarship7Gpa}</Text>
                  <Text>{data.scholarship7Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP THREE */}
                {data.scholarship8FundType &&
                <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>8.</Text>
                  <Text>{data.scholarship8FundType}</Text>
                  <Text>{data.scholarship8Category}</Text>
                  <Text>{data.scholarship8Grade}</Text>
                  <Text>{data.scholarship8Field}</Text>
                  <Text>{data.scholarship8From}</Text>
                  <Text>{data.scholarship8To}</Text>
                  <Text>{data.scholarship8Gpa}</Text>
                  <Text>{data.scholarship8Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP FOUR */}
                {data.scholarship9FundType &&
                  <Grid bg="gray.200" gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>9.</Text>
                  <Text>{data.scholarship9FundType}</Text>
                  <Text>{data.scholarship9Category}</Text>
                  <Text>{data.scholarship9Grade}</Text>
                  <Text>{data.scholarship9Field}</Text>
                  <Text>{data.scholarship9From}</Text>
                  <Text>{data.scholarship9To}</Text>
                  <Text>{data.scholarship9Gpa}</Text>
                  <Text>{data.scholarship9Remarks}</Text>
                </Grid>}
                {/* SCHOLARSHIP FIVE */}
                {data.scholarship10FundType &&
                  <Grid gridTemplateColumns={"0.2fr 1fr 1.1fr 0.5fr 0.7fr 0.7fr 0.7fr 0.4fr 0.5fr"} gap={1} mb={1} >
                  <Text ml={1}>10.</Text>
                  <Text>{data.scholarship10FundType}</Text>
                  <Text>{data.scholarship10Category}</Text>
                  <Text>{data.scholarship10Grade}</Text>
                  <Text>{data.scholarship10Field}</Text>
                  <Text>{data.scholarship10From}</Text>
                  <Text>{data.scholarship10To}</Text>
                  <Text>{data.scholarship10Gpa}</Text>
                  <Text>{data.scholarship10Remarks}</Text>
                </Grid>}
              </Box>

              {/* PERMANANT ADDRESS */}
              <Text mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"} >
                <VStack align="start" >
                  <Text fontWeight="bold" >Province:</Text>
                  <Text fontWeight="bold">District:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.permanentProvince}</Text>
                  <Text>{data.permanentDistrict}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Municipality:</Text>
                  <Text fontWeight="bold">Ward No.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.permanentMunicipality}</Text>
                  <Text>{data.permanentWardNumber}</Text>
                </VStack>
              </Grid>
              {/* CURRENT ADDRESS */}
              <Text mt={5} fontSize="18px" fontWeight="bold"  >Current address</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"}>
                <VStack align="start" >
                  <Text fontWeight="bold" >Province:</Text>
                  <Text fontWeight="bold">District:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.currentProvince}</Text>
                  <Text>{data.currentDistrict}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Municipality:</Text>
                  <Text fontWeight="bold">Ward No.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.currentMunicipality}</Text>
                  <Text>{data.currentWardNumber}</Text>
                </VStack>
              </Grid>

              {/* SCHOOL */}
              <Text mt={5} fontSize="20px" fontWeight="bold" >School</Text>

              <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr"} gap={5} >
                <VStack align="start">
                  <Text fontWeight="bold" >School name:</Text>
                  <Text fontWeight="bold" >Contact Person:</Text>

                </VStack>
                <VStack align="start">
                  <Text >{data.schoolName}</Text>
                  <Text >{data.contactPersonName}</Text>

                </VStack>
                <VStack align="start">
                  <Text fontWeight="bold" >Principal name:</Text>
                  <Text fontWeight="bold" >Position.:</Text>

                </VStack>
                <VStack align="start">
                  <Text >{data.principalName}</Text>
                  <Text >{data.contactPersonPosition}</Text>

                </VStack>
                <VStack align="start">
                  <Text fontWeight="bold" >Contact no.:</Text>
                  <Text fontWeight="bold" >Contact per. no.:</Text>

                </VStack>
                <VStack align="start">
                  <Text >{data.schoolNumber}</Text>
                  <Text >{data.contactPersonNumber}</Text>

                </VStack>
              </Grid>

              {/* CURRENT ADDRESS */}
              <Text mt={5} fontSize="20px" fontWeight="bold"  >School address</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"}>
                <VStack align="start" >
                  <Text fontWeight="bold" >Province:</Text>
                  <Text fontWeight="bold">District:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.schoolProvince}</Text>
                  <Text>{data.schoolDistrict}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Municipality:</Text>
                  <Text fontWeight="bold">Ward No.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.schoolMunicipality}</Text>
                  <Text>{data.schoolWardNumber}</Text>
                </VStack>
              </Grid>

              {/* Father */}
              <Text mt={5} fontSize="20px" fontWeight="bold"  >Father</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"}>
                <VStack align="start" >
                  <Text fontWeight="bold" >Name:</Text>
                  <Text fontWeight="bold">Address:</Text>
                  <Text fontWeight="bold">Occupation:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.fatherName}</Text>
                  <Text>{data.fatherAddress}</Text>
                  <Text>{data.fatherOccupation}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Citizenship no.:</Text>
                  <Text fontWeight="bold">Contact no.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.fatherCitizenshipNumber}</Text>
                  <Text>{data.fatherContactNumber}</Text>
                </VStack>
              </Grid>
              {/* MOTHER */}
              <Text mt={5} fontSize="20px" fontWeight="bold"  >Mother</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"}>
                <VStack align="start" >
                  <Text fontWeight="bold" >Name:</Text>
                  <Text fontWeight="bold">Address:</Text>
                  <Text fontWeight="bold">Occupation:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.motherName}</Text>
                  <Text>{data.motherAddress}</Text>
                  <Text>{data.motherOccupation}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Citizenship no.:</Text>
                  <Text fontWeight="bold">Contact no.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.motherCitizenshipNumber}</Text>
                  <Text>{data.motherContactNumber}</Text>
                </VStack>
              </Grid>
              {/* GUARDIAN */}
              <Text mt={5} fontSize="20px" fontWeight="bold"  >Guardian</Text>
              <Grid gridTemplateColumns={"0.3fr 1fr 0.3fr 1fr"}>
                <VStack align="start" >
                  <Text fontWeight="bold" >Name:</Text>
                  <Text fontWeight="bold">Address:</Text>
                  <Text fontWeight="bold">Occupation:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.guardianName}</Text>
                  <Text>{data.guardianAddress}</Text>
                  <Text>{data.guardianOccupation}</Text>
                </VStack>
                <VStack align="start" >
                  <Text fontWeight="bold">Citizenship no.:</Text>
                  <Text fontWeight="bold">Contact no.:</Text>
                </VStack>
                <VStack align="start" >
                  <Text>{data.guardianCitizenshipNumber}</Text>
                  <Text>{data.guardianContactNumber}</Text>
                </VStack>
              </Grid>
             
            </ModalBody>
          </ModalContent>
        </Modal >}
    </>
  )
}

export default ViewStudentProfileModal