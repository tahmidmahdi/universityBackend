import express from 'express'
import auth from '../../middlewares/auth'
import { StudentControllers } from './student.controller'

const router = express.Router()
// will call controller function
router
  .get('/', auth('faculty', 'admin'), StudentControllers.getAllStudents)
  .get(
    '/:studentId',
    auth('faculty', 'admin'),
    StudentControllers.getStudentById,
  )
  .delete(
    '/:studentId',
    auth('faculty', 'admin'),
    StudentControllers.deleteStudentById,
  )
  .patch(
    '/:studentId',
    auth('faculty', 'admin'),
    StudentControllers.updateStudentDataByID,
  )

export const StudentRoutes = router
