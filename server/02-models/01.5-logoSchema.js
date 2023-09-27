const mongoose = require ("mongoose");

const logoSchema = ({

    landmark: {
        type: String,
        default: "radiantInfoTech"
    },

    logoImage: {
        type: String
    },

    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const Logo = mongoose.model("Logo", logoSchema);

module.exports = Logo