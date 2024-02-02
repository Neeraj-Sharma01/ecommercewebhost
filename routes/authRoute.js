import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';


//router object
const router = express.Router();

//routing

//Register||Method POST

router.post('/register',registerController);

//Login || POST

router.post('/login', loginController);

//Forget Password || POST

router.post('/forgot-password',forgotPasswordController)

router.get('/test',requireSignIn,isAdmin,testController);

//protected User route auth
router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ok:true});
})

//protected Admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true});
})

//Update Profile
router.put("/profile",requireSignIn,updateProfileController)

//order
router.get('/orders',requireSignIn,getOrdersController)

//All order
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order Status Update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router