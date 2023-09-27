const Express = require("express");
const router = Express.Router()

const {
    AddLogoImage, GetLogoImage, UpdateLogoImage
} = require ("../04-controllers/01.5-logoController")
const { LogoImageUpload } = require ("../03-middlewares/imageUpload.js")

router.post("/admin/add-logo-image", LogoImageUpload, AddLogoImage)
router.get("/get-logo-image", GetLogoImage)
router.put("/admin/update-logo-image", LogoImageUpload, UpdateLogoImage)
// router.delete("/admin/delete-carousel-image/:id", DeleteCarouselImage)

module.exports = router