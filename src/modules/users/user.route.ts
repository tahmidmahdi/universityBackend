import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { facultyValidation } from '../faculties/faculties.validation'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router
  .post(
    '/create-student',
    auth(USER_ROLE.admin),
    // validateRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent,
  )
  .post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(facultyValidation.createFacultyValidationSchema),
    UserControllers.createFaculty,
  )
  .post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
  )
  .get('/me', auth('student', 'faculty', 'admin'), UserControllers.getMe)
  .post(
    '/change-status/:id',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.changeStatusValidationSchema),
    UserControllers.changeStatus,
  )

export const UserRoutes = router
