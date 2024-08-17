import express from 'express'
import { FacultyControllers } from './faculties.controller'

const router = express.Router()

router
  .get('/', FacultyControllers.getAllFaculties)
  .get('/:facultyId', FacultyControllers.getFacultyById)
  .patch('/:facultyId', FacultyControllers.updateFacultyById)

export const FacultiesRoute = router
