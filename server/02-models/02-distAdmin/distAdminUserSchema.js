const mongoose = require ("mongoose");
const { Schema } = mongoose;

const distAdminUserSchema = new Schema ({
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
        type: String,
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

const DistAdminUser = mongoose.model("DistAdminUser", distAdminUserSchema);

module.exports = DistAdminUser