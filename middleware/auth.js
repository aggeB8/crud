const auth = (req, res, next) => {
    req.session.user ? next() : res.status(401).json("Invalid credentials")
}

export default auth
