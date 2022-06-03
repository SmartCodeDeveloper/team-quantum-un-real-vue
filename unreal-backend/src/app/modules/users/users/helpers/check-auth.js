import jwt from 'jsonwebtoken'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns  JWT Token Athentication using User WalletAddress
 */
module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,config.JWT_KEY)
        req.userData = decoded
        next();  
    }
    catch (error){
        
        return res.status(401).json({
            message : "invalid token authorization"
        });
    }
}



