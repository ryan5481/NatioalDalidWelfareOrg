const Express = require("express");
const router = Express.Router()
const {
    AddLogoImage,
    GetLogoImage,
    EditLogoImage,
    DeleteLogoImage
} = require("../../04-controllers/05-settings/logoImageController.js")
const {LogoImageUpload, LoginBannerImageUpload} = require("../../03-middlewares/imageUpload")

router.post("/add-logo-image", LogoImageUpload, AddLogoImage)
router.get("/get-logo-image", GetLogoImage)
router.patch("/update-logo-image", LogoImageUpload, EditLogoImage)
router.delete("/delete-logo-image/:id", DeleteLogoImage)

module.exports = router