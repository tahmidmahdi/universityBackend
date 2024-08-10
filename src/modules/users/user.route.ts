import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
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

export const UserRoutes = router
