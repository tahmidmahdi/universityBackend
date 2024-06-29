import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller function
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getStudentById)
router.delete('/:studentId', StudentControllers.deleteStudentById)
router.put('/:studentId')

export const StudentRoutes = router
