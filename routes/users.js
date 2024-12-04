import express from "express"
import users from "../controllers/users.js"

const router = express.Router()

router.put("/delete", users.delete)
router.post("/login", users.login)
router.post("/register", users.create)
router.put("/edit", users.edit)
router.put("/change-privileges", users.changePrivileges)

export default router
