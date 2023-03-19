const verifyToken = require('../utils/verifyToken');
const Admin = require('../model/Staff/Admin');

const isLogin = async (req, res, next)=>{

    //pegar o token do header
    const headerObj = req.headers;
    
    const token = headerObj && headerObj.authorization && headerObj.authorization.split(' ')[1];
    const verifiedToken = verifyToken(token);

    if(verifiedToken){
        //encontrar o usuario
        const user = await Admin.findById(verifiedToken.id).select("name email role");
        //salvar no obj da requisição
        req.userAuth = user;
        next();
    }else{
        const err = new Error('Token inválido');
        next(err);
    }
}

module.exports = isLogin;