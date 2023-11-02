const Express = require("express");
const router = Express.Router()
const {
    CreateBoardMemberProfile,
    UploadBoardMemberCtznship,
    GetBoardMemberProfiles,
    EditBoardMemberProfile,
    DeleteBoardMemberProfile
} = require("../../04-controllers/04-boardMember/01-boardMemberProfileController")
const {BoardMemberProfileImageUpload, CitizenshipFileUpload} = require("../../03-middlewares/imageUpload")

router.post("/create-board-member-profile", BoardMemberProfileImageUpload, CreateBoardMemberProfile)
router.post("/upload-board-member-citizenship", CitizenshipFileUpload, UploadBoardMemberCtznship)
router.get("/get-board-member-profiles", GetBoardMemberProfiles)
router.patch("/edit-board-member-profile/:id", EditBoardMemberProfile)
router.delete("/delete-board-member-profile/:id", DeleteBoardMemberProfile)

module.exports = router