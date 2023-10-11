const mongoose = require ("mongoose");

const logoImageSchema = ({

    logoImageName: {
        type: String
    },
   
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const LogoImage = mongoose.model("LogoImage", logoImageSchema);

module.exports = LogoImage