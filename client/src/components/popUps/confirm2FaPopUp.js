import {
    Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, PinInput, PinInputField, HStack, Text, useToast
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

const Confirm2FAPopUp = ({ isOpen, onClose, data, accountType, handleDelete }) => {
    const cancelRef = useRef()
    const toast = useToast()
    const { id } = useSelector(state => state.user)
    const [backupCode, setBackupCode] = useState('');
    const checkBackup2FaCode = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/check-2FA-backup-code/${id}`, { backup2FaCodeForCheck: backupCode })
            if (res.status == 200) {
                handleDelete()
            } else if (res.status == 401) {
                toast({
                    title: 'Error.',
                    description: 'Incorrect backup code.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                toast({
                    title: 'Error.',
                    description: 'Invalid backup 2FA code.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
                setBackupCode('')
            } else {
                toast({
                    title: 'Error.',
                    description: 'Could not connect to server.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
            }
        }
    }

    return (
        <>
            {data && <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <form>
                            <AlertDialogHeader fontSize="xl" fontWeight="bold" textAlign="center" >
                                Delete {accountType}
                                <Text fontWeight="normal" fontSize="16px" >Type your backup code to confirm delete</Text>
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                <HStack justify="center" >
                                    <PinInput
                                        type='alphanumeric'
                                        mask
                                        value={backupCode}
                                        onChange={(value) => setBackupCode(value)}
                                    >
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button
                                    ref={cancelRef}
                                    onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={checkBackup2FaCode} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>}
        </>
    )
}

export default Confirm2FAPopUp