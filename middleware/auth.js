const auth = (req, res, next) => {
    req.session.user ? next() : res.status(401).send("Invalid credentials")
}

export default auth
