const mongoose = require("mongoose");

const AlumuniStudentSchema = ({

    name: {
        type: String,
    },

    email: {
        type: String,
    },
    
    contactNumber: {
        type: String,
    },
    
    citizenshipNumber: {
        type: String,
    },

    currentStatus: {
        type: String,
    },

    occupation: {
        type: String,
    },

    position: {
        type: String,
    },

    organization: {
        type: String,
    },

    municipality: {
        type: String,
    },

    wardNo: {
        type: String,
    },

    district: {
        type: String,
    },
    
    province: {
        type: String,
    },

    
    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now },

})

const AlumuniStudent = mongoose.model("AlumuniStudent", AlumuniStudentSchema);

module.exports = AlumuniStudent