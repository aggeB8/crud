import express from "express"
import users from "../controllers/users.js"
import adminAuth from "../middleware/adminAuth.js"

const router = express.Router()

router.use(adminAuth)

router.delete("/delete", users.delete)
router.put("/edit", users.edit)
router.put("/change-privileges", users.changePrivileges)

export default router
