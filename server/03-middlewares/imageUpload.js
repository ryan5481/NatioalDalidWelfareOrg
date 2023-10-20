const multer = require('multer')

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

//Logo IMAGE
const logoImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/logoImage/")
    },
    filename: function (req, file, cb) {
        cb(null, "Logo_img_" + Date.now() + ".jpeg")
    }
})

const LogoImageUpload = multer({
    storage: logoImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("logoImageName")


//Logo IMAGE
const loginBannerImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/loginBanner/")
    },
    filename: function (req, file, cb) {
        cb(null, "Login_banner_img_" + Date.now() + ".jpeg")
    }
})

const LoginBannerImageUpload = multer({
    storage: loginBannerImageStorage,
    // limits: { fileSize: 1024 * 1024 * 4 }, //max file size 4 MB
    // fileFilter: fileFilter
}).single("loginBannerImageName")

//CITIZENSHIP FILE
const citizenshipFileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/assets/boardmemberCitizenshipFile/")
    },
    filename: function (req, file, cb) {
        cb(null, "Board_member_ctzn_" + Date.now() + ".pdf")
    }
})

const CitizenshipFileUpload = multer({
    storage: citizenshipFileStorage,
}).single("citizenshipFileName");

exports.StudentProfileImageUpload = StudentProfileImageUpload;
exports.BoardMemberProfileImageUpload = BoardMemberProfileImageUpload;
exports.LogoImageUpload = LogoImageUpload;
exports.LoginBannerImageUpload = LoginBannerImageUpload;
exports.CitizenshipFileUpload = CitizenshipFileUpload;
