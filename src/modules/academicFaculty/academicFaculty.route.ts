import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router
  .post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty,
  )
  .get('/:facultyId', AcademicFacultyControllers.getAcademicFaculty)
  .get('/', AcademicFacultyControllers.getAllAcademicFaculty)
  .patch(
    '/facultyId',
    validateRequest(
      AcademicFacultyValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
  )

export const AcademicFacultyRoutes = router
