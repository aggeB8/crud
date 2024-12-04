import Users from "../models/Users.js"

export default {
    login: async (req, res) => {
        const found = await Users.findOne(req.body).exec()

        if (found) {
            req.session.user = found
            res.json("Logged in")
        } else {
            res.json("Invalid credentials").send()
        }
    },

    create: async (req, res) => {
        const created = await Users.create(req.body)
        req.session.user = created
        created ? res.json(created) : res.send("Invalid data")
    },

    delete: async (req, res) => {
        const deleted = await Users.findOneAndDelete({ _id: req.body.id })
        deleted ? res.json(deleted) : res.json("Failed to delete")
    },

    edit: async (req, res) => {
        const updated = await Users.findOneAndUpdate(
            { _id: req.body.id },
            { username: req.body.username }
        )
        updated ? res.json(updated) : res.json("Failed to update")
    },

    changePrivileges: async (req, res) => {
        const found = await Users.findOne({ _id: req.body.id })

        const changedPrivileges = await Users.findOneAndUpdate(
            { _id: req.body.id },
            { admin: !found.admin }
        )

        changedPrivileges ? res.json(changedPrivileges) : res.json("Failed to change privileges")
    }
}
