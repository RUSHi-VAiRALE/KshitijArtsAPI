
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    // console.log(req)
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, `${{env.friday}}`,(err,user)=>{
            if (err) {
                res.send("Token is not valid");
            } else {
                req.user = user
                next();
            }
        })
    } else {
        res.send("user has no token");
    }
}

const verifyandAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin) {
        next();
    } else {
        res.send("you are not allowed to do that");
    }
    })
}

module.exports = {verifyToken, verifyandAdmin};