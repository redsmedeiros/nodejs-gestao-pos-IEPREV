const jwt = require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id}, 'fsdfsd123tretr', {expiresIn: '5d'});
}

module.exports = generateToken;