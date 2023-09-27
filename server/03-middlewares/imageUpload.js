const multer = require('multer')

//CAROUSEL
const carouselImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/carouselImages/")
    },
    filename: function (req, file, cb) {
        cb(null, "Carousel_Img_" + Date.now() + ".jpeg")
    }
})

const CarouselImageUpload = multer({
    storage: carouselImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("carouselImage")

//LOGO
const logoImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/logoImages/")
    },
    filename: function (req, file, cb) {
        cb(null, "Logo_Img_" + Date.now() + ".jpeg")
    }
})

const LogoImageUpload = multer({
    storage: logoImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("logoImage")

//SERVICES
const servicesImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/serviceImages/")
    },
    filename: function (req, file, cb) {
        cb(null, "Service_Img_" + Date.now() + ".jpeg")
    }
})

const ServicesImageUpload = multer({
    storage: servicesImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("serviceImage")

exports.CarouselImageUpload = CarouselImageUpload;
exports.LogoImageUpload = LogoImageUpload;
exports.ServicesImageUpload = ServicesImageUpload;