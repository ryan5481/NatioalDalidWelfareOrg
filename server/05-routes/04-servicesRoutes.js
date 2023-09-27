const Express = require("express");
const router = Express.Router()

const {
    AddServiceImage, GetServiceImages, UpdateServiceImage, DeleteServiceImage,
} = require ("../04-controllers/04-servicesController.js")
const { ServicesImageUpload } = require ("../03-middlewares/imageUpload.js")

router.post("/admin/add-services-image", ServicesImageUpload, AddServiceImage)
router.get("/get-services-images", GetServiceImages)
router.put("/admin/update-services-image", ServicesImageUpload, UpdateServiceImage)
router.delete("/admin/delete-services-image/:id", DeleteServiceImage)

module.exports = router