/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
exports.verifyToken = (req,res,next)=>{
    console.log(req.cookies.jwt);
    const accessToken = req.cookies.jwt; // name of token

    // if there is no token in the cookies , req is unauthorized

    if(!accessToken){
        return res.status(403).json({error: "unauthorized"});
    }

    let payload;
    try {
        // verify the token jwt.verify
        // throws an error if token has expired or invalid
        payload = jwt.verify(accessToken,process.env.JWT_SECRET);
        // if verified it will pass id through req._id

        // eslint-disable-next-line no-underscore-dangle
       
        req._id = payload.userId;
        next();

    }catch(e){

        // req is unauthorized
        return res.status(403).json({error: 'unauthorized'});
    }

}