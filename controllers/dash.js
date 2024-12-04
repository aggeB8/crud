import axios from "axios"
import Users from "../models/Users.js"

export default {
    get: async (req, res) => {
        if (req.session.user.admin) {
            const users = await Users.find()
            res.render("dash", { data: { session: req.session.user, users: users } })
        } else {
            res.render("dash", { data: { session: req.session.user } })
        }
    },

    getQuote: async (req, res) => {
        try {
            const quote = (
                await axios.get("https://api.api-ninjas.com/v1/quotes", {
                    headers: {
                        "X-Api-Key": process.env.API_KEY
                    }
                })
            ).data[0]
            res.json(quote)
        } catch {
            res.status(500).json("Couldn't get quote")
        }
    }
}
