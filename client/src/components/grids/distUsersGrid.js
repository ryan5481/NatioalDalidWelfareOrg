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
import { ViewIcon, DeleteIcon, EditIcon, SmallCloseIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import CreateUserForm from '../form/createUserForm';
import ConfirmDeletePopUp from '../popUps/confirmDeletePopUp';
import ViewDistAdminProfileModal from '../modals/viewDistAdminProfileModal';
import districts from "../datasets/districts.json"

const baseUrl = process.env.REACT_APP_BASE_URL


const nepalDistrcitsList = districts.map(item => item.name).sort();

const DistUsersGrid = () => {
    //FETCH
    const [distAdminList, setDistAdminList] = useState([])
    //DELETE
    const disclosure = useDisclosure()
    const [distAdminTodelete, setDistAdminTodelete] = useState({})
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    //DELETE
    const [distAdminToView, setDistAdminToView] = useState({})
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const { isOpenViewModal, onOpenViewModal, onCloseViewModal } = useDisclosure();
    //SWITCH BETWEEEN MANAGE USERS AND CREATE USERS
    const [isCreateNewUserActive, setIsCreateNewUserActive] = useState(false)
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
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const filteredDistAdminList = distAdminList
        .filter((item) =>
            item.district.toLowerCase().includes(selectedDistrict.toLowerCase())
        )
        .filter(
            (item) =>
                item.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.district.toLowerCase().includes(searchInput.toLowerCase())
        );

    //SEARCH


    // Calculate the total number of pages
    const totalPages = Math.ceil(distAdminList.length / itemsPerPage);

    // Sorting logic and pagination for distAdminList
    const sortedAndPaginatedDistAdminList = filteredDistAdminList
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
        const res = await axios.get(`${baseUrl}/get-dist-admins-list`)
        if (res) {
            const data = res.data.data
            setDistAdminList(data.reverse())
        }
    }
    console.log(distAdminList)

    //VIEW PROFILE
    const openViewProfileModal = (distAdmin) => {
        setDistAdminToView(distAdmin)
        setIsViewModalOpen(true);
    };

    const closeViewProfileModal = () => {
        setDistAdminToView(null)
        setIsViewModalOpen(false);
    };

    //DELETE
    const openModal = (distAdmin) => {
        setDistAdminTodelete(distAdmin)
        setIsDeleteDialogOpen(true);
        onOpen()
    };

    const closeModal = () => {
        setDistAdminTodelete(null)
        setIsDeleteDialogOpen(false);
    };

    const handleDistAdminDelete = async () => {
        console.log()
        if (distAdminTodelete) {
            try {
                const res = await axios.delete(`${baseUrl}/delete-dist-admin/${distAdminTodelete._id}`)
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
                            <Box></Box>
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
                            <Text fontSize={"14px"} px={2} >Search:</Text>
                            <FormControl>
                                <InputGroup  >
                                    <Input
                                        m={3}
                                        rounded="full"
                                        w="300px"
                                        border={'solid 1px gray'}
                                        h={8}
                                        placeholder="Search name, email id"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        value={searchInput}
                                    />
                                    {searchInput && (
                                        <InputRightElement>
                                            <Box
                                                as={IconButton}
                                                size='xxs'
                                                bg='gray.500'
                                                rounded="full"
                                                right="1320%"
                                                top="20%"
                                                zIndex='10'
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
                            </FormControl>

                        </HStack>
                        {/* LIST HEADER */}
                        <Grid
                            color="white"
                            templateColumns={'0.2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.3fr 0.3fr'}
                            p={1}
                            m={1}
                            h={9}
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
                                // w="100%"
                                m={1}
                                bg={textMouseStates.sn ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('sn')}
                                onMouseUp={() => handleMouseUp('sn')}
                                onMouseLeave={() => handleMouseUp('sn')}
                                _hover={{ cursor: 'pointer' }}
                            >
                                SN
                            </Text>
                            <Text
                                // w="150px"
                                m={1}
                                bg={textMouseStates.district ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('district')}
                                onMouseUp={() => handleMouseUp('district')}
                                onMouseLeave={() => handleMouseUp('district')}
                                onClick={() => handleSort('district')}

                            >
                                District{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="200px"
                                m={1}
                                bg={textMouseStates.name ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('name')}
                                onMouseUp={() => handleMouseUp('name')}
                                onMouseLeave={() => handleMouseUp('name')}
                                onClick={() => handleSort('fullName')}

                            >
                                Name{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="200px"
                                m={1}
                                // bg={textMouseStates.number ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('number')}
                                onMouseUp={() => handleMouseUp('number')}
                                onMouseLeave={() => handleMouseUp('number')}
                            // onClick={() => handleSort('phoneNumber')}

                            >
                                Phone number{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="200px"
                                m={1}
                                bg={textMouseStates.email ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('email')}
                                onMouseUp={() => handleMouseUp('email')}
                                onMouseLeave={() => handleMouseUp('email')}
                                onClick={() => handleSort('email')}

                            >
                                Email{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="120px"
                                p={1}
                                bg={textMouseStates.regdDate ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('regdDate')}
                                onMouseUp={() => handleMouseUp('regdDate')}
                                onMouseLeave={() => handleMouseUp('regdDate')}
                                onClick={() => handleSort('createdAt')}

                            >
                                Regd date{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            <Text
                                // w="120px"
                                p={1}
                                bg={textMouseStates.updatedDate ? clickedBackgroundColor : originalBackgroundColor}
                                onMouseDown={() => handleMouseDown('updatedDate')}
                                onMouseUp={() => handleMouseUp('updatedDate')}
                                onMouseLeave={() => handleMouseUp('updatedDate')}
                                onClick={() => handleSort('updatedAt')}

                            >
                                Updated date{sortOrder == "asc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
                            </Text>
                            {/* <Text
                                w="60px"
                                m={1}
                            >
                                Edit
                            </Text> */}
                            <Text
                                w="60px"
                                m={1}
                            >
                                View
                            </Text>
                            <Text
                                w="60px"
                                m={1}
                            >
                                Delete
                            </Text>
                        </Grid>
                        {/* LIST BODY */}
                        {sortedAndPaginatedDistAdminList && sortedAndPaginatedDistAdminList.map((distAdmin, index) => {
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
                                        templateColumns={'0.2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.3fr 0.3fr'}
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
                                        key={distAdmin._id}
                                    >

                                        <Text m={1}>{index + startIndex + 1}</Text>
                                        <Text m={1}>{distAdmin.district}</Text>
                                        <Text m={1}>{distAdmin.fullName}</Text>
                                        <Text m={1}>
                                            {distAdmin.phoneNumber ?
                                                (() => {
                                                    const phoneNumberString = distAdmin.phoneNumber.toString();
                                                    console.log('Original Phone Number:', phoneNumberString);
                                                    const maskedPhoneNumber = phoneNumberString.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
                                                    console.log('Masked Phone Number:', maskedPhoneNumber);
                                                    return maskedPhoneNumber;
                                                })() :
                                                'Invalid Phone Number'
                                            }
                                        </Text>
                                        <Text m={1}>
                                            {distAdmin.email ?
                                                distAdmin.email.replace(/^(.)([^@]*)/, (match, firstLetter, rest) => firstLetter + rest.replace(/[a-zA-Z]/g, '*')) :
                                                'Invalid Email Address'
                                            }
                                        </Text>
                                        <Text m={1}>{distAdmin.createdAt.slice(0, 10)}</Text>
                                        <Text m={1} >{distAdmin.updatedAt.slice(0, 10)}</Text>
                                        <Center >
                                            <ViewIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    openViewProfileModal(distAdmin)
                                                }} />
                                        </Center>
                                        <Center m={1} >
                                            <DeleteIcon
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ color: 'blue.400' }}
                                                onClick={() => {
                                                    openModal(distAdmin)
                                                }}
                                            />
                                        </Center>
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
                                disabled={endIndex >= distAdminList.length}
                                isDisabled={currentPage === totalPages}

                            >
                                Next Page
                            </Button>
                        </Box>
                    </Box>)
                    :
                    (<CreateUserForm setIsCreateNewUserActive={setIsCreateNewUserActive} fetchData={fetchData} />)
                }
                <ConfirmDeletePopUp isOpen={isDeleteDialogOpen} onClose={closeModal} data={distAdminTodelete} accountType="district admin account" handleDelete={handleDistAdminDelete} />
                
    {/* // const [distAdminToView, setDistAdminToView] = useState({})
    // const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    // const { isOpenViewModal, onOpenViewModal, onCloseViewModal } = useDisclosure(); */}
                <ViewDistAdminProfileModal isOpen={isViewModalOpen} onClose={closeViewProfileModal} data={distAdminToView} />
            </Box>

        </>
    )

}


export default DistUsersGrid