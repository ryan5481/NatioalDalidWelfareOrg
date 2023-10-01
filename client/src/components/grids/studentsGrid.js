import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    Box,
    Heading,
    Image,
    Text,
    Grid,
    Center,
    Select,
    HStack,
    Button,
    useDisclosure,
    InputGroup,
    InputRightElement,
    IconButton,
    Input,
    FormControl
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons';
import CreateUserForm from '../form/createUserForm';
import EditStudentProfileModal from '../modals/editStudentProfileModal';
import ConfirmDeletePopUp from '../popUps/confirmDeletePopUp';

const baseUrl = process.env.REACT_APP_BASE_URL

const StudentsGrid = () => {
    //FETCH
    const [studentsList, setStudentsList] = useState([])
    //EDIT
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    //DELETE
    const disclosure = useDisclosure()
    const [studentProfileTodelete, setStudentProfileTodelete] = useState({})
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    //SWITCH BETWEEEN MANAGE USERS AND CREATE USERS
    const [isCreateNewUserActive, setIsCreateNewUserActive] = useState(false)
    const [studentProfileToEdit, setStudentProfileToEdit] = useState({})

    //PAGINATE FILTER SORT
    // Calculate the start and end indices for the current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    //CHANGE BG COLOR ON HEADING CLICK
    // Create an object to track the mouse state for each Text element
    const [textMouseStates, setTextMouseStates] = useState({});
    const handleMouseDown = (id) => {
        setTextMouseStates({ ...textMouseStates, [id]: true });
    };
    const handleMouseUp = (id) => {
        setTextMouseStates({ ...textMouseStates, [id]: false });
    };
    // Define the original and clicked background colors
    const originalBackgroundColor = 'cyan.900';
    const clickedBackgroundColor = 'cyan.500';

    //PAGINATE FILTER SORT
    const handleSort = (column) => {
        if (column === sortColumn) {
            // Reverse the order if the same column is clicked again
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set the new column and default to ascending order
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    //FILTER BY DISTRICT
    const filteredStudentsList = studentsList
        .filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.school.schoolName.toLowerCase().includes(searchInput.toLowerCase())
        );

    //SEARCH


    // Calculate the total number of pages
    const totalPages = Math.ceil(studentsList.length / itemsPerPage);

    // Sorting logic and pagination for distAdminList
    const sortedAndPaginatedStudentsList = filteredStudentsList
        .slice()
        .sort((a, b) => {
            const aValue = a[sortColumn] || '';
            const bValue = b[sortColumn] || '';

            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        })
        .slice(startIndex, endIndex);

    //FETCH
    const fetchData = async () => {
        const res = await axios.get(`${baseUrl}/get-student-profiles`)
        if (res) {
            const data = res.data.data
            setStudentsList(data.reverse())
        }
    }
    // console.log(distAdminList)

    //EDIT
    const openEditModal = (student) => {
        setStudentProfileToEdit(student)
        setIsEditDialogOpen(true);
        onOpen()
    };

    const closeEditModal = () => {
        setStudentProfileToEdit(null)
        setIsEditDialogOpen(false);
    };
    //DELETE
    const openModal = (student) => {
        setStudentProfileTodelete(student)
        setIsDeleteDialogOpen(true);
        onOpen()
    };

    const closeModal = () => {
        setStudentProfileTodelete(null)
        setIsDeleteDialogOpen(false);
    };

    const handleStudentProfileDelete = async () => {
        if (studentProfileTodelete) {
            try {
                const res = await axios.delete(`${baseUrl}/delete-student-profile/${studentProfileTodelete._id}`)
                if (res) {
                    fetchData();
                    closeModal()
                    console.log("Job deleted.")
                }
            } catch (error) {
                console.error("Error deleting the job: ", error)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Box
                pl={"200px"}
                fontSize="14px"
            >
                <Center p={2}>
                    <HStack>
                        <Button
                            h={8}
                            colorScheme={isCreateNewUserActive == false ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setIsCreateNewUserActive(false) }}
                        >Manage</Button>
                        <Button
                            h={8}
                            colorScheme={isCreateNewUserActive == true ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setIsCreateNewUserActive(true) }}
                        >Create</Button>
                    </HStack>

                </Center>
                {isCreateNewUserActive == false ?
                    (<Box
                        pos={"absolute"}
                        px={10}
                        h={8}
                    >
                        <HStack>
                            <FormControl>

                            <InputGroup>
                            <Text fontSize={"14px"} px={2} >Search:</Text>
                                <Input
                                    rounded="full"
                                    w="300px"
                                    h={8}
                                    placeholder="Name, school"
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                />
                                {searchInput && (
                                    <InputRightElement>
                                        <Box
                                            as={IconButton}
                                            size='xxs'
                                            colorScheme='blue'
                                            rounded="full"
                                            right="550px"
                                            zIndex='10'
                                            boxShadow="2xl"
                                            onClick={() => setSearchInput('')}
                                        >
                                            <SmallCloseIcon
                                            w="15px"
                                            h="15px"
                                                color="gray.50"
                                            />
                                        </Box>
                                    </InputRightElement>
                                )}
                            </InputGroup>
                            </FormControl>

                        </HStack>
                        {/* LIST HEADER */}
                        <Grid
                            color="white"
                            templateColumns={{
                                sm: '1fr',
                                md: '1fr 1fr 1fr',
                                lg: '1fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr',
                            }}
                            m={1}
                            h={8}
                            gap={1}
                            bg={originalBackgroundColor}
                            _hover={{
                                cursor: "default"
                            }}
                            textAlign="left"
                            fontWeight="bold"
                            align="center"
                            justify="center"
                        >
                            <Text
                                w="100%"
                                p={1}
                                // bg={textMouseStates.sn ? clickedBackgroundColor : originalBackgroundColor}
                                // onMouseDown={() => handleMouseDown('sn')}
                                // onMouseUp={() => handleMouseUp('sn')}
                                // onMouseLeave={() => handleMouseUp('sn')}
                                // _hover={{ cursor: 'pointer' }}
                            >
                                SN
                            </Text>
                            <Text
                                w="200px"
                                p={1}
                                bg={textMouseStates.name ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('name')}
                                onMouseUp={() => handleMouseUp('name')}
                                onMouseLeave={() => handleMouseUp('name')}
                                onClick={() => handleSort('name')}

                            >
                                Studet Name
                            </Text>
                            <Text
                                w="200px"
                                p={1}
                                bg={textMouseStates.email ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('email')}
                                onMouseUp={() => handleMouseUp('email')}
                                onMouseLeave={() => handleMouseUp('email')}
                                onClick={() => handleSort('email')}

                            >
                                School Name
                            </Text>
                            <Text
                                w="120px"
                                p={1}
                                bg={textMouseStates.regdDate ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('regdDate')}
                                onMouseUp={() => handleMouseUp('regdDate')}
                                onMouseLeave={() => handleMouseUp('regdDate')}
                                onClick={() => handleSort('createdAt')}

                            >
                                Regd date
                            </Text>
                            <Text
                                w="120px"
                                p={1}
                                bg={textMouseStates.updatedDate ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('updatedDate')}
                                onMouseUp={() => handleMouseUp('updatedDate')}
                                onMouseLeave={() => handleMouseUp('updatedDate')}
                                onClick={() => handleSort('updatedAt')}

                            >
                                Updated date
                            </Text>
                            <Text
                                w="60px"
                                p={1}
                            >
                                Edit
                            </Text>
                            <Text
                                w="60px"
                                p={1}
                            >
                                Delete
                            </Text>
                        </Grid>
                        {/* LIST BODY */}
                        {sortedAndPaginatedStudentsList && sortedAndPaginatedStudentsList.map((student, index) => {
                            const isEven = index % 2 === 0;
                            const rowStyle = {
                                backgroundColor: isEven ? 'lightgray' : 'white',
                                // color: isEven ? 'white' : 'black' 
                                // padding: '3px',
                                // gap: '1px',
                            };
                            return (<>
                                <Box
                                    // mx={10}
                                    isCentered
                                >
                                    <Grid
                                        templateColumns={{
                                            sm: '1fr',
                                            md: '1fr 1fr 1fr',
                                            lg: '1fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr',
                                        }}
                                        p={1}
                                        m={1}
                                        h={8}
                                        gap={1}
                                        // w={"80%"}
                                        bg={'blue.300'}
                                        textAlign={"left"}
                                        // borderColor="blue.400"
                                        align="center"
                                        justify="center"
                                        style={rowStyle}
                                        key={student._id}
                                    >

                                        <Text w="30px"  >{index + startIndex + 1}</Text>
                                        <Text w="200px" isTruncated >{student.firstName} {student?.middleName} {student.lastName}</Text>
                                        <Text w="200px" isTruncated >{student.school.schoolName}</Text>
                                        <Text w="120px">{student.createdAt.slice(0, 10)}</Text>
                                        <Text w="120px" >{student.updatedAt.slice(0, 10)}</Text>
                                        <Box w="60px">
                                            <EditIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    openEditModal(student)
                                                }} />
                                        </Box>
                                        <Box w="60px">
                                            <DeleteIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    openModal(student)
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Box>
                            </>)
                        })}
                        {/* PAGINATION CONTROLS */}
                        <Box mt={4} textAlign="center">
                            <Button
                                h={10}
                                m={2}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                isDisabled={currentPage === 1}
                            >
                                Previous Page
                            </Button>
                            {/* Page number buttons */}
                            {[...Array(totalPages)].map((_, page) => (
                                <Button
                                    key={page + 1}
                                    m={2}
                                    onClick={() => setCurrentPage(page + 1)}
                                    colorScheme={currentPage === page + 1 ? 'blue' : 'gray'}
                                >
                                    {page + 1}
                                </Button>
                            ))}
                            <Button
                                m={2}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={endIndex >= studentsList.length}
                                isDisabled={currentPage === totalPages}

                            >
                                Next Page
                            </Button>
                        </Box>
                    </Box>)
                    :
                    (<CreateUserForm setIsCreateNewUserActive={setIsCreateNewUserActive} fetchData={fetchData} />)
                }
                <ConfirmDeletePopUp isOpen={isDeleteDialogOpen} onClose={closeModal} data={studentProfileTodelete} accountType="student profile" handleDelete={handleStudentProfileDelete} />
                <EditStudentProfileModal isOpen={isEditDialogOpen} onClose={closeEditModal} data={studentProfileToEdit} />
            </Box>

        </>
    )

}


export default StudentsGrid