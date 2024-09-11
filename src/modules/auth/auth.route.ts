import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../users/user.constant'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validations'

const router = express.Router()

router
  .post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginUser,
  )
  .post(
    '/change-password',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthController.changePassword,
  )

export const AuthRoutes = router
