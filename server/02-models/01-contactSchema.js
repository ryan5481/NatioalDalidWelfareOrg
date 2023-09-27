const mongoose = require ("mongoose");

const contactSchema = ({

    landmark: {
        type: String,
        default: "radiantInfoTech"
    },

    email: {
        type: String,
    },

    address: {
        type: String,
    },

    openingHours: {
        type: String,
    },

    phoneNumber: {
        type: Number,
    },
    
    mobileNumber: {
        type: Number,
    },

    whatsappId: {
        type: String,
    },

    facebookId: {
        type: String,
    },

    messangerId: {
        type: String,
    },

    youtubeId: {
        type: String,
    },
    
    youtubeId: {
        type: String,
    },
    
    contactUsHeading: {
        type: String,
    },

    contactUsSubHeading: {
        type: String,
    },

    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const Carousel = mongoose.model("Contact", contactSchema);

module.exports = Carousel
