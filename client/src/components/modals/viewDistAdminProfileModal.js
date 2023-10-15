import React, { useEffect, useState } from 'react'
import axios from "axios"
import {
  useToast, Grid, Image, Box, Text, Select, EditablePreview, EditableText,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, HStack, FormControl, VStack, Center
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const ViewDistAdminProfileModal = ({ isOpen, onClose, data, scholarshipProject }) => {
  const [scrollBehavior, setScrollBehavior] = useState('inside')
const [showBackup2FaCode, setShowBackup2FaCode] = useState(false)

const handleToggleBackup2FaCode = () => {
  setShowBackup2FaCode((prevShowCode) => !prevShowCode)
}

  return (
    <>
      {data &&
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" fontSize="24px" >District Admin Profile</ModalHeader>
            <ModalCloseButton onClick={() => setShowBackup2FaCode()} />
            <ModalBody m={5} >

              <Grid gridTemplateColumns={"0.8fr 1fr"}>
                  <VStack  align="start" >
                    <Text fontWeight="bold" >Name:</Text>
                    <Text fontWeight="bold">Email:</Text>
                    <Text fontWeight="bold" >Phone number:</Text>
                    <Text fontWeight="bold">District:</Text>
                    <Text fontWeight="bold">2FA code:</Text>
                  </VStack>
                  <VStack  align="start">
                    <Text>{data.fullName}</Text>
                    <Text>{data.email}</Text>
                    <Text>{data.phoneNumber}</Text>
                    <Text>{data.district}</Text>
                    <HStack>
                    <Text w={"70px"} >{showBackup2FaCode ? data.backup2FaCode : "******"}</Text>{showBackup2FaCode ? (
                    <Button colorScheme='blue' h={"25px"} w={"80px"} onClick={handleToggleBackup2FaCode} >Hide</Button>
                  ) : (
                    <Button colorScheme='blue' h={"25px"} w={"80px"} onClick={handleToggleBackup2FaCode} >View</Button>
                  )}
                    </HStack>
                  </VStack>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal >}
    </>
  )
}

export default ViewDistAdminProfileModal