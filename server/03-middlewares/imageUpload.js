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


//////////////////////////////////
//STUDENT PROFILE IMAGE
const studentProfileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/studentImage/")
    },
    filename: function (req, file, cb) {
        cb(null, "Student_profile_img_" + Date.now() + ".jpeg")
    }
})

const StudentProfileImageUpload = multer({
    storage: studentProfileImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("profileImageName")

//BOARD MEMBER PROFILE IMAGE
const boardMemberProfileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/boardMemberImage/")
    },
    filename: function (req, file, cb) {
        cb(null, "Board_member_profile_img_" + Date.now() + ".jpeg")
    }
})

const BoardMemberProfileImageUpload = multer({
    storage: boardMemberProfileImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("profileImageName")


exports.StudentProfileImageUpload = StudentProfileImageUpload;
exports.BoardMemberProfileImageUpload = BoardMemberProfileImageUpload;
/////////////////
exports.CarouselImageUpload = CarouselImageUpload;
exports.LogoImageUpload = LogoImageUpload;
exports.ServicesImageUpload = ServicesImageUpload;