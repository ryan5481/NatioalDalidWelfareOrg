import {
    Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, List, ListItem, Text
} from '@chakra-ui/react'
import { useRef } from 'react'

const ConfirmDeletePopUp = ({ isOpen, onClose, data, accountType, handleDistAdminDelete }) => {
const cancelRef = useRef()

return (
    <>
        {data && <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center" >
                        Delete {accountType}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <List spacing={2}>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Name:
                                </Text>{' '}
                                {data.fullName}
                            </ListItem>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Email:
                                </Text>{' '}
                                {data.email}
                            </ListItem>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    District:
                                </Text>{' '}
                                {data.district}
                            </ListItem>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    You can't undo this action afterwards.
                                </Text>
                            </ListItem>
                        </List>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleDistAdminDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>}
    </>
)
}

export default ConfirmDeletePopUp