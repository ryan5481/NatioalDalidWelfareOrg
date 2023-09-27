const Express = require("express");
const router = Express.Router()
const {
    DistAdminSignUp,
    DistAdminLogin,
    ChangeDistAdminUserProfile,
    ChangeDistAdminUserPassword,
    GetDistAdminUserProfile,
    GetDistAdminUsersList
} = require("../../04-controllers/02-distAdmin/01-distAdminUserController.js")

router.post("/dist-admin-signup", DistAdminSignUp)
router.post("/dist-admin-login", DistAdminLogin)
router.put("/change-dist-admin-profile", ChangeDistAdminUserProfile)
router.put("/change-dist-admin-password", ChangeDistAdminUserPassword)
router.get("/get-dist-admin-profile", GetDistAdminUserProfile)
router.get("/get-dist-admins-list", GetDistAdminUsersList)

module.exports = router