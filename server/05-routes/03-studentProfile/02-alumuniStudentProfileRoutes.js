const Express = require("express");
const router = Express.Router()
const {
    CreateAlumuniStudentProfile,
    GetAlumuniStudentProfiles,
    EditAlumuniStudentProfile,
    DeleteAlumuniStudentProfile
} = require("../../04-controllers/03-studentProfile/02-alumuniStudentProfileController")

router.post("/create-alumuni-student-profile", CreateAlumuniStudentProfile)
router.get("/get-alumuni-student-profiles", GetAlumuniStudentProfiles)
router.patch("/edit-alumuni-student-profile/:id", EditAlumuniStudentProfile)
router.delete("/delete-alumuni-student-profile/:id", DeleteAlumuniStudentProfile)

module.exports = router