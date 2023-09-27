
const Express = require("express");
const router = Express.Router()

const {AddContactInfo, GetContactInfo, UpdateContactInfo} = require ("../04-controllers/01-contactController.js")

router.post("/admin/add-contact-info", AddContactInfo)
router.get("/get-contact-info", GetContactInfo)
router.patch("/admin/edit-contact-info/:id", UpdateContactInfo)

module.exports = router
