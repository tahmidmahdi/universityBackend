import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { facultyValidation } from '../faculties/faculties.validation'
import { studentValidations } from '../student/student.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router
  .post(
    '/create-student',
    validateRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent,
  )
  .post(
    '/create-faculty',
    validateRequest(facultyValidation.createFacultyValidationSchema),
    UserControllers.createFaculty,
  )
  .post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
  )

export const UserRoutes = router
