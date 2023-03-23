const Admin = require('../model/Staff/Admin');

const isAdmin = async (req, res, next)=>{

    //pegar o id do usuario logado
    const userId = req?.userAuth?._id

    //buscar o usuario no banco
    const adminFound = await Admin.findById(userId);

    //verificar se é admin
    if(adminFound?.role === 'admin'){
        next();
    }else{
        next(new Error("Acesso negado"));
    }
}

module.exports = isAdmin;