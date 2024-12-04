import "dotenv/config"
import express from "express"
import dash from "../controllers/dash.js"

import auth from "../middleware/auth.js"

const router = express.Router()

router.use(auth)

router.get("/", dash.get)
router.get("/quote", dash.getQuote)

export default router
