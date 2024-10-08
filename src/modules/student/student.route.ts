import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()
// will call controller function
router
  .get('/', StudentControllers.getAllStudents)
  .get('/:studentId', StudentControllers.getStudentById)
  .delete('/:studentId', StudentControllers.deleteStudentById)
  .patch('/:studentId', StudentControllers.updateStudentDataByID)

export const StudentRoutes = router
