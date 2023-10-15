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
    IconButton,
    Center,
    Divider,
    Select
} from '@chakra-ui/react';
import StudentNumberDisplay from '../../components/dataDisplay/studentNumberDisplay';
import { CheckIcon, RepeatClockIcon } from '@chakra-ui/icons';

const baseUrl = process.env.REACT_APP_BASE_URL;
const districtNames = [
    "Achham",
    "Arghakhanchi",
    "Baglung",
    "Baitadi",
    "Bajhang",
    "Bajura",
    "Banke",
    "Bara",
    "Bardiya",
    "Bhaktapur",
    "Bhojpur",
    "Chitwan",
    "Dadeldhura",
    "Dailekh",
    "Dang",
    "Darchula",
    "Dhading",
    "Dhankuta",
    "Dhanusa",
    "Dholkha",
    "Dolpa",
    "Doti",
    "Gorkha",
    "Gulmi",
    "Humla",
    "Ilam",
    "Jajarkot",
    "Jhapa",
    "Jumla",
    "Kailali",
    "Kalikot",
    "Kanchanpur",
    "Kapilvastu",
    "Kaski",
    "Kathmandu",
    "Kavrepalanchok",
    "Khotang",
    "Lalitpur",
    "Lamjung",
    "Mahottari",
    "Makwanpur",
    "Manang",
    "Morang",
    "Mugu",
    "Mustang",
    "Myagdi",
    "Nawalparasi",
    "Nuwakot",
    "Okhaldhunga",
    "Palpa",
    "Panchthar",
    "Parbat",
    "Parsa",
    "Pyuthan",
    "Ramechhap",
    "Rasuwa",
    "Rautahat",
    "Rolpa",
    "Rukum",
    "Rupandehi",
    "Salyan",
    "Sankhuwasabha",
    "Saptari",
    "Sarlahi",
    "Sindhuli",
    "Sindhupalchok",
    "Siraha",
    "Solukhumbu",
    "Sunsari",
    "Surkhet",
    "Syangja",
    "Tanahun",
    "Taplejung",
    "Terhathum",
    "Udayapur",
];
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

    const [dataToDisplayByStudentType, setDataToDisplayByStudentType] = useState("disabled");
    const [dataToDisplayByProject, setDataToDisplayByProject] = useState("NCSEP");



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

    //FILTER BY DISTRICT
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const studentsListFilteredByDistrict = filteredStudentsList
        .filter((item) =>
            item.currentDistrict.toLowerCase().includes(selectedDistrict.toLowerCase())
        )

    const [selectedFundType, setSelectedFundType] = useState("all");

    
    const allStudentsListFilteredByFundType = 
    selectedFundType == "all" ? (studentsListFilteredByDistrict) : (studentsListFilteredByDistrict
        .filter((item) =>
        item.scholarship1FundType.includes(selectedFundType) ||
        item.scholarship2FundType.includes(selectedFundType) ||
        item.scholarship3FundType.includes(selectedFundType) ||
        item.scholarship4FundType.includes(selectedFundType) ||
        item.scholarship5FundType.includes(selectedFundType))
         )
    
    
    const disabledAllStudentsList = allStudentsListFilteredByFundType.filter((obj) => obj.studentType === "Disabled");
    const disabledCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.studentType === "Disabled");
    const orphanAllStudentsList = allStudentsListFilteredByFundType.filter((obj) => obj.studentType === "Orphan");
    const orphanCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.studentType === "Orphan");

    const ncsepAllStudentsList = allStudentsListFilteredByFundType.filter((obj) => obj.project === "NCSEP");
    const prlAllStudentsList = allStudentsListFilteredByFundType.filter((obj) => obj.project === "PRL");
    const ethsAllStudentsList = allStudentsListFilteredByFundType.filter((obj) => obj.project === "ETHS");
    const ncsepCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.project === "NCSEP");
    const prlCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.project === "PRL");
    const ethsCurrentYearStudentsList = currentYearStudentsList.filter((obj) => obj.project === "ETHS");


    return (
        <>
            <Box p={5} pos={"relative"} left={"120px"} mb={10}  >
                <Heading mb={5} fontSize="2xl" textAlign="center" > Overall Scholarships Provided</Heading>
                <HStack zIndex={5} pos="fixed" bottom="0px" left={"20%"} bg={"gray.100"} border={'solid 1px lightgray'} p={2} px={4} rounded={10} justify="center" spacing={3} m={5} >
                    <Select
                        mx={1}
                        h={8}
                        w={"200px"}
                        id="district"
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        value={selectedDistrict}
                        placeholder="All districts"
                    >
                        <option value="">All Districts</option>
                        {districtNames.map((district, index) => (
                            <option key={index} value={district} >{district}</option>
                        ))}
                    </Select>
                    <Select
                        mx={1}
                        h={8}
                        w={"200px"}
                        onChange={(e) => setSelectedFundType(e.target.value)}
                        placeholder='Fund type'
                    >
                        <option key="all" value="all">
                            All
                        </option>
                        <option key="NEF" value="NEF">
                            NEF
                        </option>
                        <option key="ARMF" value="ARMF">
                            ARMF
                        </option>
                    </Select>
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
                        onClick={() => window.location.reload()}
                    >
                        <RepeatClockIcon
                            color='gray.50'
                            w='30px'
                        />
                    </Box>
                </HStack>
                <StudentNumberDisplay studentsList={filteredStudentsList} />
                <Heading m={5} fontSize="2xl" textAlign="center" >Current Year Scholarships ({new Date().getFullYear()})</Heading>
                <StudentNumberDisplay studentsList={currentYearStudentsList} />
                <Divider alignItems="center" my={5} borderColor={"gray.400"} w="1100px" mx={"auto"} />
                <Center >
                    <HStack>
                        <Button
                            h={8}
                            colorScheme={dataToDisplayByStudentType == "disabled" ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setDataToDisplayByStudentType("disabled") }}
                        >Disabled</Button>
                        <Button
                            h={8}
                            colorScheme={dataToDisplayByStudentType == "orphan" ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setDataToDisplayByStudentType("orphan") }}
                        >Orphans</Button>
                    </HStack>
                </Center>


                {dataToDisplayByStudentType == "disabled" ?
                    (<><Heading m={5} fontSize="2xl" textAlign="center" >Total Scholarships For Disabled Recepients</Heading>
                        <StudentNumberDisplay studentsList={disabledAllStudentsList} />
                        <Heading m={5} fontSize="2xl" textAlign="center" >Current Year Scholarships For Disabled Recepients ({new Date().getFullYear()})</Heading>
                        <StudentNumberDisplay studentsList={disabledCurrentYearStudentsList} /></>)
                    :
                    (<><Heading m={5} fontSize="2xl" textAlign="center" >Total Scholarships For Orphan Recepients</Heading>
                        <StudentNumberDisplay studentsList={orphanAllStudentsList} />
                        <Heading m={5} fontSize="2xl" textAlign="center" >Current Year Scholarships For Orphan Recepients ({new Date().getFullYear()})</Heading>
                        <StudentNumberDisplay studentsList={orphanCurrentYearStudentsList} /></>)}
                <Divider alignItems="center" my={5} borderColor={"gray.400"} w="1100px" mx={"auto"} />

                <Center >
                    <HStack>
                        <Button
                            h={8}
                            colorScheme={dataToDisplayByProject == "NCSEP" ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setDataToDisplayByProject("NCSEP") }}
                        >NCSEP</Button>
                        <Button
                            h={8}
                            colorScheme={dataToDisplayByProject == "PRL" ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setDataToDisplayByProject("PRL") }}
                        >PRL</Button>
                        <Button
                            h={8}
                            colorScheme={dataToDisplayByProject == "ETHS" ? "blue" : "gray"}
                            _hover={{ border: '2px solid #1C6FEB' }}
                            transition="0.15s ease-in-out"
                            onClick={() => { setDataToDisplayByProject("ETHS") }}
                        >ETHS</Button>
                    </HStack>
                </Center>
                {dataToDisplayByProject == "NCSEP" && <> <Heading m={5} fontSize="2xl" textAlign="center" >Total NCSEP Recepients </Heading>
                    <StudentNumberDisplay studentsList={ncsepAllStudentsList} />
                    <Heading m={5} fontSize="2xl" textAlign="center" >Current Year NCSEP Recepients ({new Date().getFullYear()})</Heading>
                    <StudentNumberDisplay studentsList={ncsepCurrentYearStudentsList} /></>}
                {dataToDisplayByProject == "PRL" && <><Heading m={5} fontSize="2xl" textAlign="center" >Total PRL Recepients</Heading>
                    <StudentNumberDisplay studentsList={prlAllStudentsList} />
                    <Heading m={5} fontSize="2xl" textAlign="center" >Current Year PRL Recepients ({new Date().getFullYear()})</Heading>
                    <StudentNumberDisplay studentsList={prlCurrentYearStudentsList} /></>}
                {dataToDisplayByProject == "ETHS" && <>
                    <Heading m={5} fontSize="2xl" textAlign="center" >Total ETHS Recepients</Heading>
                    <StudentNumberDisplay studentsList={ethsAllStudentsList} />
                    <Heading m={5} fontSize="2xl" textAlign="center" >Current Year ETHS Recepients ({new Date().getFullYear()})</Heading>
                    <StudentNumberDisplay studentsList={ethsCurrentYearStudentsList} /></>}
            </Box>
        </>
    );
};

export default SuperAdminDashboard;

