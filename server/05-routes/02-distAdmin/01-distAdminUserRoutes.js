const Express = require("express");
const router = Express.Router()
const {
    DistAdminSignUp,
    DistAdminLogin,
    ChangeDistAdminUserProfile,
    ChangeDistAdminUserPassword,
    GetDistAdminUserProfile,
    GetDistAdminUsersList,
    DeleteDistAdmin,
    CheckBackUp2FaCode,
    SendDistAdminOtp,
    verifyDistAdminOtp
} = require("../../04-controllers/02-distAdmin/01-distAdminUserController.js")

router.post("/dist-admin-signup", DistAdminSignUp)
router.post("/dist-admin-login", DistAdminLogin)
router.put("/change-dist-admin-profile", ChangeDistAdminUserProfile)
router.put("/change-dist-admin-password", ChangeDistAdminUserPassword)
router.get("/get-dist-admin-profile", GetDistAdminUserProfile)
router.get("/get-dist-admins-list", GetDistAdminUsersList)
router.delete("/delete-dist-admin/:id", DeleteDistAdmin)
router.post("/check-2FA-backup-code/:id", CheckBackUp2FaCode)
router.post("/send-dist-admin-otp", SendDistAdminOtp)
router.post("/verify-dist-admin-otp", verifyDistAdminOtp)

module.exports = router