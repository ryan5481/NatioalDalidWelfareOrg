import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Heading,
    IconButton
} from '@chakra-ui/react';
import StudentNumberDisplay from '../../components/dataDisplay/studentNumberDisplay';
import { CheckIcon, RepeatClockIcon } from '@chakra-ui/icons';

const baseUrl = process.env.REACT_APP_BASE_URL;

const SuperAdminDashboard = () => {
    const [studentsList, setStudentsList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredStudentsList, setFilteredStudentsList] = useState([]);
    const toast = useToast(); // Initialize the useToast hook

    // const [disabledStudentsList, setDisabledStudentsList] = useState([]);
    const [orphanStudentsList, setOrphanStudentsList] = useState([]);
    const [currentYearStudentsList, setCurrentYearStudentsList] = useState([]);
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true);


    const fetchStudentsList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/get-student-profiles`);
            if (res) {
                const data = res.data.data;
                setStudentsList(data.reverse());
                setFilteredStudentsList(data.reverse());
                //CURRENT YEAR
                const currentYear = new Date().getFullYear()
                // const firstDayOfCurrentYear = new Date(currentYear, 0, 1)
                const currentYearData = data.filter(student => {
                    const scholarshipDates = [
                        new Date(student.scholarship1From),
                        new Date(student.scholarship2From),
                        new Date(student.scholarship3From),
                        new Date(student.scholarship4From),
                        new Date(student.scholarship5From),
                    ];

                    return scholarshipDates.some(
                        date => date.getFullYear() === currentYear
                    );
                });
                setCurrentYearStudentsList(currentYearData)
            }
        } catch (error) {
            console.error('Error fetching students list:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch students list',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchStudentsList();
    }, []);

    const filterStudentsByDate = () => {
        const filteredList = studentsList.filter(student => {
            const scholarshipDates = [
                new Date(student.scholarship1From),
                new Date(student.scholarship2From),
                new Date(student.scholarship3From),
                new Date(student.scholarship4From),
                new Date(student.scholarship5From),
            ];

            return scholarshipDates.some(
                date =>
                    date >= new Date(startDate) && date <= new Date(endDate)
            );
        });
        setFilteredStudentsList(filteredList);
        setIsCheckButtonDisabled(true);
        // console.log("FILTERED STUDENTS:" + filteredStudentsList);
    };

      // Enable the button when both startDate and endDate are selected
  useEffect(() => {
    setIsCheckButtonDisabled(!startDate || !endDate);
  }, [startDate, endDate]);

  const disabledAllStudentsList = studentsList.filter((obj) => obj.studentType === "Disabled");
  const disabledCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.studentType === "Disabled");
  const orphanAllStudentsList = studentsList.filter((obj) => obj.studentType === "Orphan");
  const orphanCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.studentType === "Orphan");

    return (
        <>
            <Box  p={5} pos={"relative"} left={"120px"}   >
                <Heading mb={5} fontSize="3xl" textAlign="center" > Overall Scholarships Provided</Heading>
                <HStack justify="center" spacing={3} m={5} >
                    <FormControl w={"220px"} >
                        <HStack>
                            <FormLabel>From:</FormLabel>
                            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </HStack>
                    </FormControl>
                    <FormControl w={"220px"}>
                        <HStack>
                            <FormLabel>To:</FormLabel>
                            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </HStack>
                    </FormControl>
                                <Box
                                    w='25px'
                                    as={IconButton}
                                    size='xs'
                                    colorScheme='green'
                                    rounded="full"

                                    boxShadow="2xl"
                                    onClick={
                                        filterStudentsByDate
                                    }
                                    isDisabled={isCheckButtonDisabled}
                                >
                                    <CheckIcon
                                        color='gray.50'
                                        w='25px'
                                    />
                                </Box>
                                <Box
                                    w='25px'
                                    as={IconButton}
                                    size='xs'
                                    colorScheme='red'
                                    rounded="full"
                                    boxShadow="2xl"
                                    onClick={()=> window.location.reload()}
                                >
                                    <RepeatClockIcon
                                        color='gray.50'
                                        w='30px'
                                    />
                                </Box>
                </HStack>
            <StudentNumberDisplay studentsList={filteredStudentsList} />
            <Heading m={5} fontSize="3xl" textAlign="center" >Current Year Scholarships ({new Date().getFullYear()})</Heading>
            <StudentNumberDisplay studentsList={currentYearStudentsList} />
            {/* <Heading m={5} fontSize="3xl" textAlign="center" >Total Scholarships For Disabled or Orphan Recepients</Heading> */}
            <Heading m={5} fontSize="3xl" textAlign="center" >Total Scholarships For Disabled Recepients</Heading>
            <StudentNumberDisplay studentsList={disabledAllStudentsList} />
            <Heading m={5} fontSize="3xl" textAlign="center" >Current Year Scholarships For Disabled Recepients ({new Date().getFullYear()})</Heading>
            <StudentNumberDisplay studentsList={disabledCurrentYearStudentsList} />
            <Heading m={5} fontSize="3xl" textAlign="center" >Total Scholarships For Orphan Recepients</Heading>
            <StudentNumberDisplay studentsList={orphanAllStudentsList} />
            <Heading m={5} fontSize="3xl" textAlign="center" >Current Year Scholarships For Orphan Recepients ({new Date().getFullYear()})</Heading>
            <StudentNumberDisplay studentsList={orphanCurrentYearStudentsList} />
            </Box>
        </>
    );
};

export default SuperAdminDashboard;
