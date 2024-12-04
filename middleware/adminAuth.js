import Users from "../models/Users.js"

const dashAdmin = async (req, res, next) => {
    const dbUserData = await Users.findOne({ _id: req.session.user._id })
    if (dbUserData) {
        if (dbUserData.admin) {
            next()
            return
        }
    }
    res.status(401).json("Not admin")
}

export default dashAdmin
