const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret ="hellojee"

 function generateToken(email,access,role){
    return jwt.sign({
        email:email,
      
        access:access,
        role:role
    },secret,{algorithm:"HS256",expiresIn:"10m"})}

     function verifyAccess(token){
        try{
            const decoded = jwt.verify(token,secret,{
            algorithm: "HS256"
        });
            return decoded;
        } catch (error) {
          return error
        }
    }

    module.exports = {
        generateToken,
        verifyAccess
    }