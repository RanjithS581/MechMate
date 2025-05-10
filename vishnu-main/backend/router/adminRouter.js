import express from 'express'
import { addService, bookings, mainPage, add, updateStatus, confirmUpdateUser, loginAdmin, filter } from '../controller/adminLogic.js'
import authenticate from '../middleware/authenticate.js'
const adminRouter = express.Router()


adminRouter.route('/loginAdmin').post(loginAdmin)
adminRouter.route('/').get(authenticate,mainPage)
adminRouter.route('/addService').get(authenticate,add).post(authenticate,addService)
adminRouter.route('/bookings').get(authenticate,bookings)
adminRouter.route('/filterBookings').post(authenticate,filter)
adminRouter.route('/updateStatus').post(authenticate, updateStatus)
adminRouter.route('/confirm-update-user').post(authenticate, confirmUpdateUser)

export default adminRouter