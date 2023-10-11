const mongoose = require ("mongoose");

const loginBannerImageSchema = ({

    loginBannerImageName: {
        type: String,
    },
   
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const LoginBannerImage = mongoose.model("LoginBannerImage", loginBannerImageSchema);

module.exports = LoginBannerImage