import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
    FormControl,
    useToast
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon, EditIcon, SmallCloseIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import StudentProfileForm from '../form/studentProfileForm';
import EditStudentProfileModal from '../modals/editStudentProfileModal';
import ViewStudentProfileModal from '../modals/viewStudentProfileModal'
import ConfirmDeletePopUp from '../popUps/confirmDeletePopUp';
import Confirm2FAPopUp from '../popUps/confirm2FaPopUp'
import Confirm2FAToEditPopUp from '../popUps/confirm2FaToEditPopUp'
import districts from "../datasets/districts.json"
const baseUrl = process.env.REACT_APP_BASE_URL

const nepalDistrcitsList = districts.map(item => item.name).sort();

const StudentsGrid = ({ scholarshipProject }) => {
    const toast = useToast()
    const { userRole, district } = useSelector(state => state.user)
    //FETCH
    const [studentsList, setStudentsList] = useState([])
    //VIEW
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    //EDIT
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    //FILTER ACTIVE/INACTIVE STUDENTS
    const [currentYearStudentsList, setCurrentYearStudentsList] = useState([]);


    //DELETE
    const disclosure = useDisclosure()
    const [studentProfileTodelete, setStudentProfileTodelete] = useState({})
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    // CHECK 2FA FOR DELETION
    const [isCheck2FaDialogOpen, setIsCheck2FaDialogOpen] = useState(false);
    //SWITCH BETWEEEN MANAGE USERS AND CREATE USERS
    const [isCreateNewUserActive, setIsCreateNewUserActive] = useState(false)
    const [studentProfileToView, setStudentProfileToView] = useState({})
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
    const originalBackgroundColor = 'blue.600';
    const clickedBackgroundColor = 'blue.400';

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
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const filteredStudentsList = studentsList
        .filter((item) =>
            item.permanentDistrict.toLowerCase().includes(selectedDistrict.toLowerCase())
        )
        .filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.schoolName.toLowerCase().includes(searchInput.toLowerCase())
        );

    // FILTER ACTIVE / INACTIVE STUEDNTS
    const [selectedOption, setSelectedOption] = useState("Active");

    const currentYear = new Date().getFullYear();
    const filterActiveInactiveStudents = () => {
        if (selectedOption === "Active") {
            return filteredStudentsList.filter((student) => {
                for (let i = 1; i <= 5; i++) {
                    const scholarshipFrom = student[`scholarship${i}From`];
                    if (
                        scholarshipFrom &&
                        new Date(scholarshipFrom).getFullYear() === currentYear
                    ) {
                        return true;
                    }
                }
                return false;
            });
        } else if (selectedOption === "Inactive") {
            return filteredStudentsList.filter((student) => {
                for (let i = 1; i <= 5; i++) {
                    const scholarshipFrom = student[`scholarship${i}From`];
                    if (
                        scholarshipFrom &&
                        new Date(scholarshipFrom).getFullYear() >= currentYear
                    ) {
                        return false;
                    }
                }
                return true;
            });
        }
        return [];
    };

    const filteredActiveInactiveStudents = filterActiveInactiveStudents();

    //SEARCH
    // Calculate the total number of pages
    const totalPages = Math.ceil(studentsList.length / itemsPerPage);

    // Sorting logic and pagination for distAdminList
    const sortedAndPaginatedStudentsList = filteredActiveInactiveStudents
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
        let apiUrl = `${baseUrl}/get-student-profiles`;

        // Check if district is "all"
        if (userRole !== "superAdmin") {
            apiUrl += `?permanentDistrict=${district}`;
        }
        const res = await axios.get(apiUrl)
        if (res) {
            const data = res.data.data;


            // Filter based on scholarshipProject
            const filteredData = scholarshipProject === "prlEth"
                ? data.filter(student => student.isPrlEthProject === true)
                : data.filter(student => student.isPrlEthProject === false);

            setStudentsList(filteredData.reverse());
        }
    }
    // console.log(distAdminList)

    //VIEW
    const openViewModal = (student) => {
        setStudentProfileToView(student)
        setIsViewDialogOpen(true);
        onOpen()
    };

    const closeViewModal = () => {
        setStudentProfileToView(null)
        setIsViewDialogOpen(false);
    };

    //EDIT
    const openEditModal = (student) => {
        console.log("Before setting EditDialogOpen: ", { district, student });
        setStudentProfileToEdit(student)
        setIsEditDialogOpen(true);
        onOpen()
    };

    const closeEditModal = () => {
        setStudentProfileToEdit(null)
        setIsEditDialogOpen(false);
    };

    // useEffect(() => {
    //     console.log("isEditDialogOpen in EditStudentProfileModal:", isOpen);
    // }, [isOpen]);
    
    //CONFIRM 2FA CODE TO EDIT 
    let selectedStudent = {}
    const [isCheck2FaEditDialogOpen,setIsCheck2FaEditDialogOpen] = useState(false)
    const openCheck2FaEditModal = (student) => {
            
            setStudentProfileToEdit(student)
            setIsCheck2FaEditDialogOpen(true);
            onOpen()
    };

    const closeCheck2FaEditModal = () => {
        // setStudentProfileTodelete(null)
        setIsCheck2FaEditDialogOpen(false);
    };
    //CONFIRM 2FA CODE TO DELETE 
    const openCheck2FaModal = (student) => {
        setStudentProfileTodelete(student)
        setIsCheck2FaDialogOpen(true);
        onOpen()
    };

    const closeCheck2FaModal = () => {
        setStudentProfileTodelete(null)
        setIsCheck2FaDialogOpen(false);
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
                    closeCheck2FaModal()
                    console.log("Job deleted.")
                    toast({
                        title: 'Success.',
                        description: 'Student profile deleted.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top'
                    });
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
                // bg="gray.300"
                pl={"230px"}
                fontSize="14px"
            >
                <Center >
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
                                <HStack>
                                    {district == "all" &&
                                        <HStack>
                                            <Text fontSize={"14px"} px={2} >District:</Text>
                                            <Select
                                                mx={1}
                                                h={8}
                                                w={"200px"}
                                                id="district"
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                                value={selectedDistrict}
                                            >
                                                <option value="">All Districts</option>
                                                {nepalDistrcitsList.map((district, index) => (
                                                    <option key={index} value={district} >{district}</option>
                                                ))}
                                            </Select>
                                        </HStack>}
                                    <Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="Active">Active students</option>
                                        <option value="Inactive">Alumuni students</option>
                                    </Select>
                                    <InputGroup display="flex" justifyContent="flex-end" alignItems="center">
                                            <Input
                                                m={3}
                                                rounded="full"
                                                w="300px"
                                                border={'solid 1px gray'}
                                                h={8}
                                                placeholder="Search name"
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                value={searchInput}
                                            />
                                            {searchInput && (
                                                <InputRightElement>
                                                    <Box
                                                        as={IconButton}
                                                        top="20%"
                                                        right="20%"
                                                        size='xxs'
                                                        bg='gray.500'
                                                        rounded="full"
                                                        boxShadow="2xl"
                                                        _hover={{
                                                            bg: "darkgray"
                                                        }}
                                                        onClick={() => setSearchInput('')}
                                                    >
                                                        <SmallCloseIcon
                                                            w="19x"
                                                            h="19px"
                                                            color="gray.50"
                                                        />
                                                    </Box>
                                                </InputRightElement>
                                            )}
                                        </InputGroup>
                                </HStack>
                            </FormControl>

                        </HStack>
                        {/* LIST HEADER */}
                        <Grid
                            color="white"
                            templateColumns={
                                '0.5fr 2fr 2fr 1.5fr 1fr 1fr 0.3fr 0.3fr 0.3fr'
                            }
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
                                onClick={() => handleSort('firstName')}
                            >
                                Studet Name { sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
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
                                School Name { sortOrder == "asc" ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </Text>
                            <Text
                                w="200px"
                                p={1}
                                bg={textMouseStates.district ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('district')}
                                onMouseUp={() => handleMouseUp('district')}
                                onMouseLeave={() => handleMouseUp('district')}
                                onClick={() => handleSort('currentDistrict')}

                            >District { sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}</Text>
                            <Text
                                w="120px"
                                p={1}
                                bg={textMouseStates.regdDate ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('regdDate')}
                                onMouseUp={() => handleMouseUp('regdDate')}
                                onMouseLeave={() => handleMouseUp('regdDate')}
                                onClick={() => handleSort('createdAt')}

                            >
                                Regd date { sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
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
                                Updated date{ sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="60px"
                                p={1}
                            >
                                View
                            </Text>
                            <Text
                                // w="60px"
                                p={1}
                            >
                                Edit
                            </Text>
                            <Text
                                // w="60px"
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
                                >
                                    <Grid
                                        templateColumns={ '0.5fr 2fr 2fr 1.5fr 1fr 1fr 0.3fr 0.3fr 0.3fr'}
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
                                        <Text w="200px" isTruncated >{student.schoolName}</Text>
                                        <Text w="200px" isTruncated >{student.currentDistrict}</Text>
                                        <Text w="120px">{student.createdAt.slice(0, 10)}</Text>
                                        <Text w="120px" >{student.updatedAt.slice(0, 10)}</Text>
                                        <Box  >
                                            <ViewIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => { openViewModal(student) }}
                                            />
                                        </Box>
                                        <Box  >
                                            <EditIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    district == "all" ? (openEditModal(student)) : (openCheck2FaEditModal(student))
                                                }} />
                                        </Box>
                                        <Box  >
                                            <DeleteIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    district == "all" ? (openModal(student)) : (openCheck2FaModal(student))
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
                                disabled={endIndex >= sortedAndPaginatedStudentsList.length}
                                isDisabled={currentPage === totalPages}

                            >
                                Next Page
                            </Button>
                        </Box>
                    </Box>)
                    :
                    (<StudentProfileForm setIsCreateNewUserActive={setIsCreateNewUserActive} scholarshipProject={scholarshipProject} />)
                }
                <ConfirmDeletePopUp isOpen={isDeleteDialogOpen} onClose={closeModal} data={studentProfileTodelete} accountType="student profile" handleDelete={handleStudentProfileDelete} />
                <Confirm2FAPopUp isOpen={isCheck2FaDialogOpen} onClose={closeCheck2FaModal} data={studentProfileTodelete} action="delete" triggerFunctionOn2FaMatch={handleStudentProfileDelete} />
                <Confirm2FAToEditPopUp isOpen={isCheck2FaEditDialogOpen} onClose={closeCheck2FaEditModal} action="edit" openEditModal={openEditModal} student={studentProfileToEdit} />
                <EditStudentProfileModal isOpen={isEditDialogOpen} onClose={closeEditModal} data={studentProfileToEdit} fetchData={fetchData} closeEditModal={closeEditModal} scholarshipProject={scholarshipProject} />
                <ViewStudentProfileModal isOpen={isViewDialogOpen} onClose={closeViewModal} data={studentProfileToView} fetchData={fetchData} closeEditModal={closeViewModal} scholarshipProject={scholarshipProject} />
            </Box>

        </>
    )

}


export default StudentsGrid