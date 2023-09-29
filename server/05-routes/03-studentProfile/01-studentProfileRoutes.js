const Express = require("express");
const router = Express.Router()
const {
    CreateAtudentProfile,
    GetStudentProfiles,
    EditStudentProfile,
    DeleteStudentProfile
} = require("../../04-controllers/03-studentProfile/01-studentProfileController")

router.post("/create-student-profile", CreateAtudentProfile)
router.get("/get-student-profiles", GetStudentProfiles)
router.put("/edit-student-profile", EditStudentProfile)
router.delete("/delete-student-profile", DeleteStudentProfile)

module.exports = router