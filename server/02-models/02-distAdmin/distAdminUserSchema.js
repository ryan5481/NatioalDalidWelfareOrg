const mongoose = require ("mongoose");

const distAdminUserSchema = ({
    landmark: {
        type: String,
        default: "radiantInfoTech"
    },
    
    fullName: {
        type: String,
        default: "Full Name"
    },

    profileImageName: {
        type: String,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },
    
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    backup2FaCode: {
        type: String,
        required: true,
    },

    district: {
        type: String
    },
   
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const DistAdminUser = mongoose.model("DistAdminUser", distAdminUserSchema);

module.exports = DistAdminUser