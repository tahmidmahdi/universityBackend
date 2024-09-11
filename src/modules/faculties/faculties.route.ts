import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'
import { FacultyControllers } from './faculties.controller'

const router = express.Router()

router
  .get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getAllFaculties,
  )
  .get('/:facultyId', FacultyControllers.getFacultyById)
  .patch('/:facultyId', FacultyControllers.updateFacultyById)
  .delete('/:facultyId', FacultyControllers.deleteFacultyById)

export const FacultiesRoute = router
