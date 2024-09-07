import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationController } from './semesterRegistration.controller'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()

router
  .post(
    '/create-semester-registration',
    validateRequest(
      SemesterRegistrationValidations.createSemesterRegistrationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
  )
  .get('/:id')

export const SemesterRegistrationRoutes = router
