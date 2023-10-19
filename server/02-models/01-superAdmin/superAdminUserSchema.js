const mongoose = require ("mongoose");

const superAdminUserSchema = ({
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
    
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    otp: {
        type: String,
    },

    otpExpiresAt: {
        type: String,
    },
   
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const SuperAdminUser = mongoose.model("SuperAdminUser", superAdminUserSchema);

module.exports = SuperAdminUser