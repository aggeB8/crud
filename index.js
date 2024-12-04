import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import session from "express-session"
import cors from "cors"

import users from "./routes/users.js"
import dash from "./routes/dash.js"

const app = express()
const PORT = 3000

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 12
        }
    })
)

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/users", users)
app.use("/dash", dash)

try {
    const dbConnection = "mongodb://127.0.0.1:27017/crud"
    mongoose.connect(dbConnection)
    app.listen(PORT)
    console.log(`Express: http://localhost:${PORT}`)
    console.log(`Mongodb: ${dbConnection}`)
} catch (e) {
    console.log(`Failed to start server: ${e}`)
}
