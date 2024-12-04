import express from "express"
import users from "../controllers/users.js"
import usersAdmin from "./usersAdmin.js"

const router = express.Router()

router.use("/admin", usersAdmin)

router.post("/login", users.login)
router.post("/logout", users.logout)
router.post("/register", users.create)

export default router
