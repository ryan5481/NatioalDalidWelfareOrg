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
          size="4xl"
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
                  </HStack>
                  <HStack>
                  <FormControl>
                    <FormLabel>Gender:</FormLabel>
                    <Input placeholder={data.gender} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth:</FormLabel>
                    <Input  placeholder={data.dateOfBirth} />
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
              {data.scholarship && data.scholarship.map((item, index) => (
                <FormControl>
                  <HStack>
                    <Input placeholder={item.scholarshipCartages} />
                    <Input placeholder={item.class} />
                    <Input placeholder={item.from} />
                    <Input placeholder={item.to} />
                    <Input placeholder={item.remarks} />
                  </HStack>
                </FormControl>
              ))
              }
              {/* PERMANANT ADDRESS */}
              {data.permanentAddress &&
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold"  >Permanent address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.permanentAddress.municipality} />
                    <Input placeholder={data.permanentAddress.wardNumber} />
                    <Input placeholder={data.permanentAddress.district} />
                    <Input placeholder={data.permanentAddress.province} />
                  </HStack>
                </FormControl>}
              {/* TEMPORARY ADDRESS */}
              {data.currentAddress &&
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Current address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.currentAddress.municipality} />
                    <Input placeholder={data.currentAddress.wardNumber} />
                    <Input placeholder={data.currentAddress.district} />
                    <Input placeholder={data.currentAddress.province} />
                  </HStack>
                </FormControl>}
              {/* SCHOOL */}
              {data.school &&
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
                    <Input placeholder={data.school.schoolName} />
                    <Input placeholder={data.school.principalName} />
                    <Input placeholder={data.school.contactNumber} />
                    <Input placeholder={data.school.contactPersonPosition} />
                    <Input placeholder={data.school.contactPersonNumber} />
                  </HStack>
                </FormControl>}
              {/* SCHOOL ADDRESS */}
              {data.schoolAddress &&
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >School address</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Municipality</FormLabel>
                    <FormLabel>Ward No.</FormLabel>
                    <FormLabel>District</FormLabel>
                    <FormLabel>Province</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.schoolAddress.municipality} />
                    <Input placeholder={data.schoolAddress.wardNumber} />
                    <Input placeholder={data.schoolAddress.district} />
                    <Input placeholder={data.schoolAddress.province} />
                  </HStack>
                </FormControl>}
              {/* FATHER */}
              {data.father &&
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Father</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.father.name} />
                    <Input placeholder={data.father.address} />
                    <Input placeholder={data.father.citizenshipNumber} />
                    <Input placeholder={data.father.occupation} />
                    <Input placeholder={data.father.contactNumber} />
                  </HStack>
                </FormControl>}
              {/* MOTHER */}
              {data.mother &&
                <FormControl mt={5} fontSize="18px" fontWeight="bold" >
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold">Mother</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.mother.name} />
                    <Input placeholder={data.mother.address} />
                    <Input placeholder={data.mother.citizenshipNumber} />
                    <Input placeholder={data.mother.occupation} />
                    <Input placeholder={data.mother.contactNumber} />
                  </HStack>
                </FormControl>}
              {/* GUARDIAN */}
              {data.guardian &&
                <FormControl>
                  <FormLabel mt={5} fontSize="18px" fontWeight="bold" >Guardian</FormLabel>
                  <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5} >
                    <FormLabel >Name</FormLabel>
                    <FormLabel>Address No.</FormLabel>
                    <FormLabel>Citizenship No</FormLabel>
                    <FormLabel>Contact No.</FormLabel>
                  </Grid>
                  <HStack>
                    <Input placeholder={data.guardian.name} />
                    <Input placeholder={data.guardian.address} />
                    <Input placeholder={data.guardian.citizenshipNumber} />
                    <Input placeholder={data.guardian.occupation} />
                    <Input placeholder={data.guardian.contactNumber} />
                  </HStack>
                </FormControl>}
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