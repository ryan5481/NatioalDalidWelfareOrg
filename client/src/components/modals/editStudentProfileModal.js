import React from 'react'
import {
  Grid, Image, Box, FormLabel, Editable, EditablePreview, EditableInput, Input,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, HStack, FormControl, VStack
} from '@chakra-ui/react'

const EditStudentProfileModal = ({ isOpen, onClose, data }) => {
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
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
            <ModalHeader textAlign="center" fontSize="24px" >Edit Student Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody m={5} >
              <Grid gridTemplateColumns={"1fr 3fr"}>
                {data.profileImageName && <Image
                  rounded={10}
                  src={require(`../../uploads/studentImage/${data.profileImageName}`)} w="200px"
                />}
                <Box m={5} >
                  <HStack justify="flex-start">
                    <FormControl>
                      <FormLabel>First name:</FormLabel>
                      <Input placeholder={data.firstName} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Middle name:</FormLabel>
                      <Input placeholder={data.middleName} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last name:</FormLabel>
                      <Input placeholder={data.lastName} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Gender:</FormLabel>
                      <Input placeholder={data.gender} />
                    </FormControl>
                  </HStack>
                  <HStack>
                  
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input  placeholder={data.dateOfBirth} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Birth cert. no.</FormLabel>
                    <Input placeholder={data.birthCertificateNo} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>contactNumber</FormLabel>
                    <Input  placeholder={data.contactNumber} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder={data.email} />
                  </FormControl>
                  </HStack>
                </Box>
              </Grid>
              {/* SCHOLARSHIP */}
              <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Scholarship</FormLabel>
              <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                <FormLabel >Cartage</FormLabel>
                <FormLabel>Class</FormLabel>
                <FormLabel>From</FormLabel>
                <FormLabel>To</FormLabel>
                <FormLabel>Remarks</FormLabel>
              </Grid>
                <FormControl mb={2} >
                  <HStack>
                    <Input placeholder={data.scholarship1Cartage} />
                    <Input placeholder={data.scholarship1Grade} />
                    <Input placeholder={data.scholarship1From} />
                    <Input placeholder={data.scholarship1To} />
                    <Input placeholder={data.scholarship1Remarks} />
                  </HStack>
                </FormControl>
                <FormControl mb={2} >
                  <HStack>
                    <Input placeholder={data.scholarship2Cartage} />
                    <Input placeholder={data.scholarship2Grade} />
                    <Input placeholder={data.scholarship2From} />
                    <Input placeholder={data.scholarship2To} />
                    <Input placeholder={data.scholarship2Remarks} />
                  </HStack>
                </FormControl>
                <FormControl mb={2} >
                  <HStack>
                    <Input placeholder={data.scholarship3Cartage} />
                    <Input placeholder={data.scholarship3Grade} />
                    <Input placeholder={data.scholarship3From} />
                    <Input placeholder={data.scholarship3To} />
                    <Input placeholder={data.scholarship3Remarks} />
                  </HStack>
                </FormControl>
                <FormControl mb={2} >
                  <HStack>
                    <Input placeholder={data.scholarship4Cartage} />
                    <Input placeholder={data.scholarship4Grade} />
                    <Input placeholder={data.scholarship4From} />
                    <Input placeholder={data.scholarship4To} />
                    <Input placeholder={data.scholarship4Remarks} />
                  </HStack>
                </FormControl>
                <FormControl mb={2} >
                  <HStack>
                    <Input placeholder={data.scholarship5Cartage} />
                    <Input placeholder={data.scholarship5Grade} />
                    <Input placeholder={data.scholarship5From} />
                    <Input placeholder={data.scholarship5To} />
                    <Input placeholder={data.scholarship5Remarks} />
                  </HStack>
                </FormControl>
              {/* PERMANANT ADDRESS */}
              
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.permanentMunicipality} />
                    <Input placeholder={data.permanentWardNumber} />
                    <Input placeholder={data.permanentDistrict} />
                    <Input placeholder={data.permanentProvince} />
                  </HStack>
                </FormControl>
              {/* TEMPORARY ADDRESS */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Current address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.currentMunicipality} />
                    <Input placeholder={data.currentWardNumber} />
                    <Input placeholder={data.currentDistrict} />
                    <Input placeholder={data.currentProvince} />
                  </HStack>
                </FormControl>
              {/* SCHOOL */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >School</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Principal</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                    <FormLabel>Contact person pos.</FormLabel>
                    <FormLabel>Contact person No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.schoolName} />
                    <Input placeholder={data.principalName} />
                    <Input placeholder={data.contactNumber} />
                    <Input placeholder={data.contactPersonPosition} />
                    <Input placeholder={data.contactPersonNumber} />
                  </HStack>
                </FormControl>
              {/* SCHOOL ADDRESS */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >School address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.schoolMunicipality} />
                    <Input placeholder={data.schoolWardNumber} />
                    <Input placeholder={data.schoolDistrict} />
                    <Input placeholder={data.schoolProvince} />
                  </HStack>
                </FormControl>
              {/* FATHER */}
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Father</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.fatherName} />
                    <Input placeholder={data.fatherAddress} />
                    <Input placeholder={data.fatherCitizenshipNumber} />
                    <Input placeholder={data.fatherOccupation} />
                    <Input placeholder={data.fatherContactNumber} />
                  </HStack>
                </FormControl>
              {/* MOTHER */}
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Mother</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.motherName} />
                    <Input placeholder={data.motherAddress} />
                    <Input placeholder={data.motherCitizenshipNumber} />
                    <Input placeholder={data.motherOccupation} />
                    <Input placeholder={data.motherContactNumber} />
                  </HStack>
                </FormControl>
              {/* GUARDIAN */}
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Guardian</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Occupation</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.guardianName} />
                    <Input placeholder={data.guardianAddress} />
                    <Input placeholder={data.guardianCitizenshipNumber} />
                    <Input placeholder={data.guardianOccupation} />
                    <Input placeholder={data.guardianContactNumber} />
                  </HStack>
                </FormControl>
            </ModalBody>
            <ModalFooter justifyContent="center" >
              <Button colorScheme='red' mx={1} w={'200px'} onClick={onClose}>Cancel</Button>
              <Button colorScheme='green' mx={1} w={'200px'} >Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>}
    </>
  )
}

export default EditStudentProfileModal