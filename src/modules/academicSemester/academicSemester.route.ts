import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterControllers } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router
  .post(
    '/create-academic-semester',
    validateRequest(
      AcademicSemesterValidation.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester,
  )
  .get('/', AcademicSemesterControllers.getAllAcademicSemester)
  .get('/:semesterId', AcademicSemesterControllers.getAcademicSemester)
  .patch('/:semesterId', AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router
