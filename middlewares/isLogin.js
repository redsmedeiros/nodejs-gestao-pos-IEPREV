const isLogin = (req, res, next)=>{

    //pegar o usuario do req
    const isLogin = req.userAuth;

    if(isLogin){
        next();
    }else{
        const err = new Error('Você não está logado');
        next(err);
    }
}

module.exports = isLogin;