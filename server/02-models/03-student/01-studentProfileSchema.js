const mongoose = require("mongoose");

const studentProfileSchema = ({

    //STUDENT
    profileImageName: {
        type: String,
    },

    firstName: {
        type: String,
    },

    middleName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    gender: {
        type: String,
    },

    dateOfBirth: {
        type: String,
    },

    contactNumber: {
        type: String,
    },

    email: {
        type: String,
    },

    birthCertificateNo: {
        type: String,
    },
    //SCHOLARSHIP ONE
    scholarship1Cartage: {
        type: String,
    },
    scholarship1Grade: {
        type: String,
    },
    scholarship1From: {
        type: String,
    },
    scholarship1To: {
        type: String,
    },
    scholarship1Gpa: {
        type: String,
    },
    scholarship1Remarks: {
        type: String,
    },
        //SCHOLARSHIP TWO
    scholarship2Cartage: {
        type: String,
    },
    scholarship2Grade: {
        type: String,
    },
    scholarship2From: {
        type: String,
    },
    scholarship2To: {
        type: String,
    },
    scholarship2Gpa: {
        type: String,
    },
    scholarship2Remarks: {
        type: String,
    },
        //SCHOLARSHIP THREE
    scholarship3Cartage: {
        type: String,
    },
    scholarship3Grade: {
        type: String,
    },
    scholarship3From: {
        type: String,
    },
    scholarship3To: {
        type: String,
    },
    scholarship3Gpa: {
        type: String,
    },
    scholarship3Remarks: {
        type: String,
    },
        //SCHOLARSHIP FOUR
    scholarship4Cartage: {
        type: String,
    },
    scholarship4Grade: {
        type: String,
    },
    scholarship4From: {
        type: String,
    },
    scholarship4To: {
        type: String,
    },
    scholarship4Gpa: {
        type: String,
    },
    scholarship4Remarks: {
        type: String,
    },
        //SCHOLARSHIP FIVE
    scholarship5Cartage: {
        type: String,
    },
    scholarship5Grade: {
        type: String,
    },
    scholarship5From: {
        type: String,
    },
    scholarship5To: {
        type: String,
    },
    scholarship5Gpa: {
        type: String,
    },
    scholarship5Remarks: {
        type: String,
    },
        //PERMANENT ADDRESS
    permanentMunicipality: {
        type: String,
    },
    permanentWardNumber: {
        type: String,
    },
    permanentDistrict: {
        type: String,
    },
    permanentProvince: {
        type: String,
    },
        //CURRENT ADDRESS
    currentMunicipality: {
        type: String,
    },
    currentWardNumber: {
        type: String,
    },
    currentDistrict: {
        type: String,
    },
    currentProvince: {
        type: String,
    },
        //SCHOOL
    schoolName: {
        type: String,
    },
    principalName: {
        type: String,
    },
    schoolNumber: {
        type: String,
    },
    contactPersonName: {
        type: String,
    },
    contactPersonPosition: {
        type: String,
    },
    contactPersonNumber: {
        type: String,
    },
    schoolMunicipality: {
        type: String,
    },
    schoolWardNumber: {
        type: String,
    },
    schoolDistrict: {
        type: String,
    },
    schoolProvince: {
        type: String,
    },
        //FATHER
    fatherName: {
        type: String,
    },
    fatherAddress: {
        type: String,
    },
    fatherCitizenshipNumber: {
        type: String,
    },
    fatherOccupation: {
        type: String,
    },
    fatherContactNumber: {
        type: String,
    },
    //MOTHER
    motherName: {
        type: String,
    },
    motherAddress: {
        type: String,
    },
    motherCitizenshipNumber: {
        type: String,
    },
    motherOccupation: {
        type: String,
    },
    motherContactNumber: {
        type: String,
    },
    //GUARDIAN
    guardianName: {
        type: String,
    },
    guardianAddress: {
        type: String,
    },
    guardianCitizenshipNumber: {
        type: String,
    },
    guardianCitizenshipNumber: {
        type: String,
    },
    guardianOccupation: {
        type: String,
    },
    guardianContactNumber: {
        type: String,
    },
    
    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

})

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile