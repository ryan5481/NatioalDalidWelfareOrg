const Express = require("express");
const router = Express.Router()

const {
    AddCarouselImage, GetCarousleImages, UpdateCarouselImage, DeleteCarouselImage,
} = require ("../04-controllers/03-carouselController.js")
const { CarouselImageUpload } = require ("../03-middlewares/imageUpload.js")

router.post("/admin/add-carousel-image", CarouselImageUpload, AddCarouselImage)
router.get("/get-carousel-images", GetCarousleImages)
router.put("/admin/update-carousel-image", CarouselImageUpload, UpdateCarouselImage)
router.delete("/admin/delete-carousel-image/:id", DeleteCarouselImage)

module.exports = router