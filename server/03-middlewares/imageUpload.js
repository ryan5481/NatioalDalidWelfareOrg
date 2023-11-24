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
}).single("profileImageName")

//BOARD MEMBER PROFILE IMAGE
// const boardMemberImageStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "../client/src/uploads/boardMemberImage/")
//     },
//     filename: function (req, file, cb) {
//         cb(null, "Board_member_img_" + Date.now() + ".jpeg")
//     }
// })

// const BoardMemberProfileImageUpload = multer({
//     storage: boardMemberImageStorage,
// }).single("profileImageName")

//BOARD MEMBER CITIZENSHIP FILE
const boardMembersImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/boardMembersImages/")
    },
    filename: function (req, file, cb) {
        cb(null, "Board_member_image_" + Date.now() + ".jpeg")
    }
}) 

const BoardMemberImagesUpload = multer({storage: boardMembersImagesStorage }).fields([{name: "profileImageName", maxCount: 1}, {name: "citizenshipFileName", maxCount: 1}])

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
}).single("logoImageName")


//BANNER IMAGE
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
}).single("loginBannerImageName")



exports.StudentProfileImageUpload = StudentProfileImageUpload;
exports.LogoImageUpload = LogoImageUpload;
exports.LoginBannerImageUpload = LoginBannerImageUpload;
// exports.BoardMemberProfileImageUpload = BoardMemberProfileImageUpload;
exports.BoardMemberImagesUpload = BoardMemberImagesUpload;
