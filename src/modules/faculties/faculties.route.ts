import express from 'express'
import auth from '../../middlewares/auth'
import { FacultyControllers } from './faculties.controller'

const router = express.Router()

router
  .get('/', auth(), FacultyControllers.getAllFaculties)
  .get('/:facultyId', FacultyControllers.getFacultyById)
  .patch('/:facultyId', FacultyControllers.updateFacultyById)
  .delete('/:facultyId', FacultyControllers.deleteFacultyById)

export const FacultiesRoute = router
