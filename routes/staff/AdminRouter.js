const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const { 
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
} = require('../../controller/staff/AdminController')

const adminRouter = express.Router("");

//Rotas
adminRouter.post("/register", registerAdmCtrl);
adminRouter.post('/login', loginAdmCtrl);
adminRouter.get("/", getAdminsCtrl);
adminRouter.get("/:id", getAdminCtrl);
adminRouter.put("/:id", updateAdminCtrl);
adminRouter.delete("/:id", deleteAdminCtrl);
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendedTeacherCtrl);
adminRouter.put("/withdraw/teacher/:id", adminWithDrawteacherCtrl);
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl);
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);
adminRouter.put("/unpublish/exam/:id", adminUnpublishResultsCtrl)

module.exports = adminRouter;