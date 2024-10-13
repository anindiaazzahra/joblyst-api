const jwt = require("jsonwebtoken");
const accessTokenSecretKey = "testing-secret-joblyst-app";

// function authenticationToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//         next(new Error("Token not found"));
//     }
    
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//         next(new Error("Token is required"));
//     }

//     const decoded = jwt.verify(token, accessTokenSecretKey);
//     const user = {
//         email: decoded.email,
//     };
//     req.user = user;

//     return next();
// }

async function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next(new Error("Token not found"));
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new Error("Token is required"));
    }

    try {
        const decoded = jwt.verify(token, accessTokenSecretKey);
        const uid = decoded.uid;

        const userSnapshot = await firestore.collection('users').doc(uid).get();
        if (!userSnapshot.exists) {
            return next(new Error("User not found"));
        }

        const userData = userSnapshot.data();
        req.user = {
            email: userData.email,
            role: userData.role,
            uid: uid
        };

        return next();
    } catch (error) {
        return next(new Error("Invalid token"));
    }
}


module.exports = authenticationToken;