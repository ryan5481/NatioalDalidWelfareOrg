const Express = require("express");
const router = Express.Router()
const {
    AddLoginBannerImage,
    GetLoginBannerImage,
    EditLoginBannerImage,
    DeleteLoginBannerImage
} = require("../../04-controllers/05-settings/loginBannerImageController")
const {LoginBannerImageUpload} = require("../../03-middlewares/imageUpload.js")

router.post("/add-login-banner-image", LoginBannerImageUpload, AddLoginBannerImage)
router.get("/get-login-banner-image", GetLoginBannerImage)
router.patch("/update-login-banner-image/:id", LoginBannerImageUpload, EditLoginBannerImage)
router.delete("/delete-login-banner-image/:id", DeleteLoginBannerImage)

module.exports = router