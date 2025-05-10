import express from 'express'
import {  serviceList, requestService, confirmBooking,logout, registerUser, LoginPage, loginUser, loggedIndashboard, totalBookings } from '../controller/userLogic.js'
import authenticate from '../middleware/authenticate.js'
import isLoggedIn from '../middleware/isLoggesdIn.js'
import { rateMechanic } from '../controller/userLogic.js';

const userRouter = express.Router()

userRouter.route('/').get(isLoggedIn, serviceList)
userRouter.route('/loggedIn').get(authenticate, loggedIndashboard)
userRouter.route('/requestService').post(authenticate, requestService).get(authenticate, requestService)
userRouter.route('/confirmBooking').post(authenticate, confirmBooking)
userRouter.route('/auth/userRegister').post(registerUser).get(LoginPage)
userRouter.route('/auth/userLogin').post(loginUser).get(LoginPage)
userRouter.route('/totalBookings').post(authenticate, totalBookings)
userRouter.route('/logout').get(logout)
userRouter.route('/rateMechanic').post(authenticate, rateMechanic);

export default userRouter