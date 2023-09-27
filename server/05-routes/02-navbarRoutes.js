
const Express = require("express");
const router = Express.Router()

const {CreateNavbarMenu, GetNavbarMenu, UpdateNavbarMenu} = require ("../04-controllers/02-navbarController.js")

router.post("/admin/create-navbar-menu", CreateNavbarMenu)
router.get("/get-navbar-menu", GetNavbarMenu)
router.patch("/admin/edit-navbar-menu/:id", UpdateNavbarMenu)

module.exports = router
