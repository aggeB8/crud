import Users from "../models/Users.js"

export default {
    login: async (req, res) => {
        try {
            const found = await Users.findOne(req.body).exec()

            if (found) {
                req.session.user = found
                res.send()
            } else {
                res.status(401).json("Ogiltiga uppgifter")
            }
        } catch {
            res.status(400).json("Dålig input")
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.json("Logged out")
    },

    create: async (req, res) => {
        try {
            const found = await Users.find({ username: req.body.username })

            if (found.length !== 0) {
                res.status(409).json("Användarnamn finns redan")
            } else {
                const created = await Users.create(req.body)
                req.session.user = created
                created ? res.send() : res.status(400).json("Ogiltig data")
            }
        } catch {
            res.status(400).json("Ogiltig data")
        }
    },

    delete: async (req, res) => {
        const deleted = await Users.findOneAndDelete({ _id: req.body.id })
        deleted ? res.send() : res.status(400).json("Misslyckades att ta bort")
    },

    edit: async (req, res) => {
        const updated = await Users.findOneAndUpdate(
            { _id: req.body.id },
            { username: req.body.username }
        )
        updated ? res.send() : res.status(400).json("Misslyckades att uppdatera")
    },

    changePrivileges: async (req, res) => {
        const found = await Users.findOne({ _id: req.body.id })

        const changedPrivileges = await Users.findOneAndUpdate(
            { _id: req.body.id },
            { admin: !found.admin }
        )

        changedPrivileges ? res.send() : res.status(400).json("Misslyckades att byta privlegier")
    }
}
