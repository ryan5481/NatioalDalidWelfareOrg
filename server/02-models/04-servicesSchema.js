const mongoose = require ("mongoose");

const servicesSchema = ({

    landmark: {
        type: String,
        default: "radiantInfoTech"
    },

    serviceImage: {
        type: Object,
    },

    imageTitle: {
        type: String,
    },

    imageDescription: {
        type: String,
    },

    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const Services = mongoose.model("Services", servicesSchema);

module.exports = Services