const mongoose = require("mongoose");

const boardMemberProfileSchema = ({

    //
    profileImageName: {
        type: String,
    },

    citizenshipFileName: {
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

    dateOfBirth: {
        type: String,
    },

    contactNumber: {
        type: String,
    },

    email: {
        type: String,
    },

    citizenshipNumber: {
        type: String,
    },

    membershipType:{
        type: String,
    },

    //EDUCATION
    qualification: {
        type: String,
    },

    graduatedYear: {
        type: String,
    },

    institutionName: {
        type: String,
    },
    
    institutionAddress: {
        type: String,
    },
    //TENURE ONE
    position1: {
        type: String,
    },

    joinedDate1: {
        type: String,
    },

    tenure1: {
        type: String,
    },

    remark1: {
        type: String,
    },
    
    //TENURE TWO
    position2: {
        type: String,
    },

    joinedDate2: {
        type: String,
    },

    tenure2: {
        type: String,
    },

    remark2: {
        type: String,
    },
    
    //TENURE THREE
    position3: {
        type: String,
    },

    joinedDate3: {
        type: String,
    },

    tenure3: {
        type: String,
    },

    remark3: {
        type: String,
    },
    
    //TENURE FOUR
    position4: {
        type: String,
    },

    joinedDate4: {
        type: String,
    },

    tenure4: {
        type: String,
    },

    remark4: {
        type: String,
    },
    
    //TENURE FIVE
    position5: {
        type: String,
    },

    joinedDate5: {
        type: String,
    },

    tenure5: {
        type: String,
    },

    remark5: {
        type: String,
    },
    
    //PERMANENT ADDRESS
    permanentMunicipality: {
        type: String,
    },

    permanentWardNo: {
        type: String,
    },

    permanentDistrict: {
        type: String,
    },

    permanentProvince: {
        type: String,
    },
    
    //PRESENT ADDRESS
    temporaryMunicipality: {
        type: String,
    },

    temporaryWardNo: {
        type: String,
    },

    temporaryDistrict: {
        type: String,
    },

    temporaryProvince: {
        type: String,
    },
    
    //PERSONAL INVOLVEMENT 1
    profession1: {
        type: String,
    },

    organization1: {
        type: String,
    },

    address1: {
        type: String,
    },

    startingDate1: {
        type: String,
    },
     
    currentStatus1: {
        type: String,
    },

    pRemark1: {
        type: String,
    },
     
    //PERSONAL INVOLVEMENT 2
    profession2: {
        type: String,
    },

    organization2: {
        type: String,
    },

    address2: {
        type: String,
    },

    startingDate2: {
        type: String,
    },
     
    currentStatus2: {
        type: String,
    },

    pRemark2: {
        type: String,
    },
     
    //PERSONAL INVOLVEMENT 3
    profession3: {
        type: String,
    },

    organization3: {
        type: String,
    },

    address3: {
        type: String,
    },

    startingDate3: {
        type: String,
    },
     
    currentStatus3: {
        type: String,
    },

    pRemark3: {
        type: String,
    },
     
    //PERSONAL INVOLVEMENT 4
    profession4: {
        type: String,
    },

    organization4: {
        type: String,
    },

    address4: {
        type: String,
    },

    startingDate4: {
        type: String,
    },
     
    currentStatus4: {
        type: String,
    },

    pRemark4: {
        type: String,
    },
    
    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

})

const BoardMemberProfile = mongoose.model("BoardMemberProfile", boardMemberProfileSchema);

module.exports = BoardMemberProfile