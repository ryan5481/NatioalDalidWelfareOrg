const Express = require("express");
const router = Express.Router()
const {
    SuperAdminSignUp,
    SuperAdminLogin,
    ChangeSuperAdminUserProfile,
    ChangeSuperAdminUserPassword,
    GetSuperAdminUserProfile,
    // GetSuperAdminPassword
} = require("../../04-controllers/01-superAdmin/01-superAdminUserController.js")

router.post("/super-admin-signup", SuperAdminSignUp)
router.post("/super-admin-login", SuperAdminLogin)
router.put("/change-super-admin-profile", ChangeSuperAdminUserProfile)
router.put("/change-super-admin-password", ChangeSuperAdminUserPassword)
router.get("/get-super-admin-profile", GetSuperAdminUserProfile)
// router.get("/get-super-admin-password", GetSuperAdminPassword)

module.exports = router