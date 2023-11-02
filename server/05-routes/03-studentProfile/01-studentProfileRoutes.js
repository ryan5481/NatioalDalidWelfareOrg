const Express = require("express");
const router = Express.Router()
const {
    CreateStudentProfile,
    GetStudentProfiles,
    EditStudentProfile,
    DeleteStudentProfile
} = require("../../04-controllers/03-studentProfile/01-studentProfileController")
const {StudentProfileImageUpload} = require("../../03-middlewares/imageUpload")

router.post("/create-student-profile", StudentProfileImageUpload, CreateStudentProfile)
router.get("/get-student-profiles", GetStudentProfiles)
router.patch("/edit-student-profile/:id",StudentProfileImageUpload, EditStudentProfile)
router.delete("/delete-student-profile/:id", DeleteStudentProfile)

module.exports = router