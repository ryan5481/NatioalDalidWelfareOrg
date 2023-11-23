const mongoose = require("mongoose");

const studentProfileSchema = ({

    isPrlEthProject: {
        type: Boolean,
    },

    project: {
        type: String,
    },

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

    ethnicity: {
        type: String,
    },

    studentType: {
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
    scholarship1FundType: {
        type: String,
    },
    scholarship1Category: {
        type: String,
    },
    scholarship1Grade: {
        type: String,
    },
    scholarship1Field: {
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
    scholarship2FundType: {
        type: String,
    },

    scholarship2Category: {
        type: String,
    },
    scholarship2Grade: {
        type: String,
    },
    scholarship2Field: {
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
    scholarship3FundType: {
        type: String,
    },

    scholarship3Category: {
        type: String,
    },
    scholarship3Grade: {
        type: String,
    },
    scholarship3Field: {
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
    scholarship4FundType: {
        type: String,
    },

    scholarship4Category: {
        type: String,
    },
    scholarship4Grade: {
        type: String,
    },
    scholarship4Field: {
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
    scholarship5FundType: {
        type: String,
    },

    scholarship5Category: {
        type: String,
    },
    scholarship5Grade: {
        type: String,
    },
    scholarship5Field: {
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
    //SCHOLARSHIP SIX
    scholarship6FundType: {
        type: String,
    },
    scholarship6Category: {
        type: String,
    },
    scholarship6Grade: {
        type: String,
    },
    scholarship6Field: {
        type: String,
    },
    scholarship6From: {
        type: String,
    },
    scholarship6To: {
        type: String,
    },
    scholarship6Gpa: {
        type: String,
    },
    scholarship6Remarks: {
        type: String,
    },
    //SCHOLARSHIP SEVEN
    scholarship7FundType: {
        type: String,
    },

    scholarship7Category: {
        type: String,
    },
    scholarship7Grade: {
        type: String,
    },
    scholarship7Field: {
        type: String,
    },
    scholarship7From: {
        type: String,
    },
    scholarship7To: {
        type: String,
    },
    scholarship7Gpa: {
        type: String,
    },
    scholarship7Remarks: {
        type: String,
    },
    //SCHOLARSHIP EIGHT
    scholarship8FundType: {
        type: String,
    },

    scholarship8Category: {
        type: String,
    },
    scholarship8Grade: {
        type: String,
    },
    scholarship8Field: {
        type: String,
    },
    scholarship8From: {
        type: String,
    },
    scholarship8To: {
        type: String,
    },
    scholarship8Gpa: {
        type: String,
    },
    scholarship8Remarks: {
        type: String,
    },
    //SCHOLARSHIP NINE
    scholarship9FundType: {
        type: String,
    },
    scholarship9Category: {
        type: String,
    },
    scholarship9Grade: {
        type: String,
    },
    scholarship9Field: {
        type: String,
    },
    scholarship9From: {
        type: String,
    },
    scholarship9To: {
        type: String,
    },
    scholarship9Gpa: {
        type: String,
    },
    scholarship9Remarks: {
        type: String,
    },
    //SCHOLARSHIP TEN
    scholarship10FundType: {
        type: String,
    },

    scholarship10Category: {
        type: String,
    },
    scholarship10Grade: {
        type: String,
    },
    scholarship10Field: {
        type: String,
    },
    scholarship10From: {
        type: String,
    },
    scholarship10To: {
        type: String,
    },
    scholarship10Gpa: {
        type: String,
    },
    scholarship10Remarks: {
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