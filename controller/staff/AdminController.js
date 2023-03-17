const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
//model importado
const Admin = require('../../model/Staff/Admin');

//@desc Register admin
//@route POST /api/admins/register
//@acess Private
const registerAdmCtrl = asyncHandler(async (req, res)=>{
     //destruturar variaives do corpo da requisição
     const { name, email, password } = req.body

    
         //verificar se o email ja foi cadsatrado
         const adminFound = await Admin.findOne({ email });
 
         if(adminFound){
             res.json('Admin já cadastrado');
             return;
         }
 
         //ir no banco de dados e salvar um user
         const user = await Admin.create({
             name,
             email,
             password
         })
 
         res.status(201).json({
             status: "success",
             data: user
         })
 })

//@desc login admin
//@route POST /api/v1/admins/login
//@acess Private
const loginAdmCtrl = asyncHandler(async (req, res)=>{

    const { email, password } = req.body;

    
        //pegar o usuario no banco para validar
        const user = await Admin.findOne({ email });

        if(!user){
            res.json({message: "usuário não encontrado"});
            return;
        }

      
        if(user && await user.verifyPassword(password)){

            req.userAuth = user;

            res.status(201).json({
                status: "success",
                data: generateToken(user._id)
            })
        }else{
            res.json({message: "Login inválido"});
            return;
        }

})


//@desc Get all admin
//@route GET /api/v1/admins
//@acess Private
const getAdminsCtrl = (req, res)=> {

}

//@desc Get single admin
//@route GET /api/v1/admins/:id
//@acess Private
const getAdminCtrl = (req, res)=> {

}

//@desc update single admin
//@route PUT /api/v1/admins/:id
//@acess Private
const updateAdminCtrl = (req, res)=> {

}

//@desc delete single admin
//@route DELETE /api/v1/admins/:id
//@acess Private
const deleteAdminCtrl = (req, res)=> {

}

//@desc admin suspend
//@route PUT /api/v1/admins/suspend/teacher/:id
//@acess Private
const adminSuspendTeacherCtrl = (req, res)=> {

}

//@desc admin unsuspend
//@route PUT /api/v1/admins/unsuspend/teacher/:id
//@acess Private
const adminUnsuspendedTeacherCtrl = (req, res)=>{

}

//@desc admin withdraws
//@route PUT /api/v1/admins/withdraw/teacher/:id
//@acess Private
const adminWithDrawteacherCtrl = (req, res)=>{

}

//@desc admin unwithdraws
//@route PUT /api/v1/admins/unwithdraw/teacher/:id
//@acess Private
const adminUnWithdrawTeacherCtrl = (req, res)=>{

}

//@desc admin exam result
//@route PUT /api/v1/admins/publish/exam/:id
//@acess Private
const adminPublishResultsCtrl = (req, res)=>{

}

//@desc admin exam result
//@route PUT /api/v1/admins/unpublish/exam/:id
//@acess Private
const adminUnpublishResultsCtrl = (req, res)=>{

}

module.exports = {
    registerAdmCtrl,
    loginAdmCtrl,
    getAdminsCtrl,
    getAdminCtrl,
    updateAdminCtrl,
    deleteAdminCtrl,
    adminSuspendTeacherCtrl,
    adminUnsuspendedTeacherCtrl,
    adminWithDrawteacherCtrl,
    adminUnWithdrawTeacherCtrl,
    adminPublishResultsCtrl,
    adminUnpublishResultsCtrl
}