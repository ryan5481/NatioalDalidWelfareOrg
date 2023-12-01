import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'

const StudentNumberDisplay = ({studentsList}) => {

    //TOTAL SCHOLARSHIPS
    // const totalStudents = studentsList.length

    function getTotalscholarships(studentsList) {
        return  studentsList.reduce((sum, student) => {
            for (let i = 1; i <= 5; i++) {
                const categoryKey = `scholarship${i}Category`;
                const categoryValue = student[categoryKey]?.trim();
                sum += categoryValue && typeof categoryValue === 'string' && categoryValue.trim() !== '' ? 1 : 0;
            }
            return sum;
        }, 0);
    }

    const totalScholarships = getTotalscholarships(studentsList)

    //EDUCATION NUMBER BY GRADES
    const basicEducationGrades = ["Grade1", "Grade2", "Grade3", "Grade4", "Grade5", "Grade6", "Grade7", "Grade8"];
    const secondaryEducationGrades = [ "Grade9", "Grade10"];
    const higherSecondaryEducationGrades = [ "Grade11", "Grade12"];
    const bachelorsEducationGrade = [ "Bachelors"];
    const mastersEducationGrade = [ "Masters"];
    const diplomaEducationGrade = [ "Diploma"];

    function getEducationNumber(targetGrades, studentsList) {
        return studentsList.reduce((sum, student) => {
            for (let i = 1; i <= 5; i++) {
                const gradeKey = `scholarship${i}Grade`;
                const gradeValue = student[gradeKey];

                // Check if the grade is in the targetGrades array
                if (targetGrades.includes(gradeValue)) {
                    sum += 1;
                }
            }
            return sum;
        }, 0);
    }

    const basicEducationNumber = getEducationNumber(basicEducationGrades, studentsList)
    const secondaryEducationNumber = getEducationNumber(secondaryEducationGrades, studentsList)
    const higherSecondaryEducationNumber = getEducationNumber(higherSecondaryEducationGrades, studentsList)
    const bachelorsEducationNumber = getEducationNumber(bachelorsEducationGrade, studentsList)
    const mastersEducationNumber = getEducationNumber(mastersEducationGrade, studentsList)
    const diplomaEducationNumber = getEducationNumber(diplomaEducationGrade, studentsList)

    //DATA BY GENDER
    function scholarshipNumbersByGender(targetGrades, studentsList, studentGender) {
        
        return studentsList.reduce((sum, student) => {
          if (student.gender === studentGender) {
            for (let i = 1; i <= 5; i++) {
              const gradeKey = `scholarship${i}Grade`;
              const gradeValue = student[gradeKey];
      
              // Check if the grade is in the targetGrades array
              if (targetGrades.includes(gradeValue)) {
                sum += 1;
              }
            }
          }
          return sum;
        }, 0);
      }
      //MALE
      const basicEducationNumberMale = scholarshipNumbersByGender(basicEducationGrades, studentsList, "Male")
      const secondaryEducationNumberMale = scholarshipNumbersByGender(secondaryEducationGrades, studentsList, "Male")
      const higherSecondaryEducationNumberMale = scholarshipNumbersByGender(higherSecondaryEducationGrades, studentsList, "Male")
      const bachelorsEducationNumberMale = scholarshipNumbersByGender(bachelorsEducationGrade, studentsList, "Male")
      const mastersEducationNumberMale = scholarshipNumbersByGender(mastersEducationGrade, studentsList, "Male")
      const diplomaEducationNumberMale = scholarshipNumbersByGender(diplomaEducationGrade, studentsList, "Male")

      //FEMALE
      const basicEducationNumberFemale = scholarshipNumbersByGender(basicEducationGrades, studentsList, "Female")
      const secondaryEducationNumberFemale = scholarshipNumbersByGender(secondaryEducationGrades, studentsList, "Female")
      const higherSecondaryEducationNumberFemale = scholarshipNumbersByGender(higherSecondaryEducationGrades, studentsList, "Female")
      const bachelorsEducationNumberFemale = scholarshipNumbersByGender(bachelorsEducationGrade, studentsList, "Female")
      const mastersEducationNumberFemale = scholarshipNumbersByGender(mastersEducationGrade, studentsList, "Female")
      const diplomaEducationNumberFemale = scholarshipNumbersByGender(diplomaEducationGrade, studentsList, "Female")
      //OTHER
      const basicEducationNumberOther = scholarshipNumbersByGender(basicEducationGrades, studentsList, "Other")
      const secondaryEducationNumberOther = scholarshipNumbersByGender(secondaryEducationGrades, studentsList, "Other")
      const higherSecondaryEducationNumberOther = scholarshipNumbersByGender(higherSecondaryEducationGrades, studentsList, "Other")
      const bachelorsEducationNumberOther = scholarshipNumbersByGender(bachelorsEducationGrade, studentsList, "Other")
      const mastersEducationNumberOther = scholarshipNumbersByGender(mastersEducationGrade, studentsList, "Other")
      const diplomaEducationNumberOther = scholarshipNumbersByGender(diplomaEducationGrade, studentsList, "Other")

    return (
        <>
            <Box mb={10} >
                <VStack>
                    <Box>
                        <VStack p={2} w="180px" h="130px" rounded={10} border={'solid 1px gray'} >
                            {studentsList && <Heading fontSize="5xl" >{totalScholarships}</Heading>}
                            <Text fontSize="xl" >Total</Text>
                        </VStack>
                    </Box>
                    <HStack>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{basicEducationNumber}</Heading>
                                    <Text  >Basic Education</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{basicEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{basicEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{basicEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{secondaryEducationNumber}</Heading>
                                    <Text  >Secondary Education</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{secondaryEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{secondaryEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{secondaryEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{higherSecondaryEducationNumber} </Heading>
                                    <Text  >Higher Secondary Education</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{higherSecondaryEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{higherSecondaryEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{higherSecondaryEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{bachelorsEducationNumber} </Heading>
                                    <Text  >Bachelors Degree</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{bachelorsEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{bachelorsEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{bachelorsEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{mastersEducationNumber} </Heading>
                                    <Text >Masters Degree</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{mastersEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{mastersEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{mastersEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box>
                            <VStack>
                                <Box textAlign="center" p={2} w="130px" h="100px" rounded={10} border={'solid 1px gray'} >
                                    <Heading fontSize="5xl" >{diplomaEducationNumber} </Heading>
                                    <Text  >Technical and Vocational Education</Text>
                                </Box>
                                <HStack>
                                    <Text>Girls</Text> <Text>{diplomaEducationNumberFemale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Boys</Text> <Text>{diplomaEducationNumberMale}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Others</Text> <Text>{diplomaEducationNumberOther}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
            </Box>

        </>
    )
}

export default StudentNumberDisplay