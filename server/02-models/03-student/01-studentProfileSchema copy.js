const mongoose = require("mongoose");

const studentProfileSchema = ({

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

    scholarship1: {
        scholarshipCartage: {
            type: String
        },
        grade: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        gpa: {
            type: String
        },
        remarks: {
            type: String
        },
    },
    scholarship2: {
        scholarshipCartage: {
            type: String
        },
        grade: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        gpa: {
            type: String
        },
        remarks: {
            type: String
        },
    },
    scholarship3: {
        scholarshipCartage: {
            type: String
        },
        grade: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        gpa: {
            type: String
        },
        remarks: {
            type: String
        },
    },
    scholarship4: {
        scholarshipCartage: {
            type: String
        },
        grade: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        gpa: {
            type: String
        },
        remarks: {
            type: String
        },
    },
    scholarship5: {
        scholarshipCartage: {
            type: String
        },
        grade: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        gpa: {
            type: String
        },
        remarks: {
            type: String
        },
    },

    permanentAddress: {
        municipality: {
            type: String
        },

        wardNumber: {
            type: String
        },
        district: {
            type: String
        },
        province: {
            type: String
        },
    },

    currentAddress: {
        municipality: {
            type: String
        },

        wardNumber: {
            type: String
        },

        district: {
            type: String
        },

        province: {
            type: String
        },
    },

    school: {
        schoolName: {
            type: String
        },

        principalName: {
            type: String
        },

        contactNumber: {
            type: String
        },

        contactPersonName: {
            type: String
        },

        contactPersonPosition: {
            type: String
        },

        contactPersonNumber: {
            type: String
        },
    },

    schoolAddress: {
        municipality: {
            type: String
        },

        wardNumber: {
            type: String
        },

        district: {
            type: String
        },

        province: {
            type: String
        },
    },

    father: {
        name: {
            type: String
        },

        address: {
            type: String
        },

        citizenshipNumber: {
            type: String
        },

        occupation: {
            type: String
        },

        contactNumber: {
            type: String
        },
    },

    mother: {
        name: {
            type: String
        },

        address: {
            type: String
        },

        citizenshipNumber: {
            type: String
        },

        occupation: {
            type: String
        },

        contactNumber: {
            type: String
        },
    },
    
    guardian: {
        name: {
            type: String
        },

        address: {
            type: String
        },

        citizenshipNumber: {
            type: String
        },

        occupation: {
            type: String
        },

        contactNumber: {
            type: String
        },
    },

    exStudents: {
        name: {
            type: String
        },

        currentStatus: {
            type: String
        },

        occupation: {
            type: String
        },

        position: {
            type: String
        },

        organization: {
            type: String
        },

        municipality: {
            type: String
        },

        wardNumber: {
            type: String
        },

        district: {
            type: String
        },

        province: {
            type: String
        },

        email: {
            type: String
        },

        contactNumber: {
            type: String
        },

        citizenshipNumber: {
            type: String
        },

        summit: {
            type: String
        },
    },



    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

})

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile