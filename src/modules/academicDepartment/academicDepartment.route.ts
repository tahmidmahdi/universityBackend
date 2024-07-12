import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
const router = express.Router()

router
  .post(
    '/create-academic-department',
    // validateRequest(
    //   AcademicDepartmentValidation.academicDepartmentValidationSchema,
    // ),
    AcademicDepartmentControllers.createAcademicDepartment,
  )
  .get('/:departmentId', AcademicDepartmentControllers.getAcademicDepartment)
  .get('/', AcademicDepartmentControllers.getAllAcademicDepartment)
  .patch(
    '/:departmentId',
    validateRequest(
      AcademicDepartmentValidation.updateDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartment,
  )

export const AcademicDepartmentRoutes = router
