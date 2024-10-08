import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseController } from './offeredCourse.controller'
import { OfferedCourseValidations } from './offeredCourse.validation'

const router = express.Router()

router
  .post(
    '/create-offered-course',
    validateRequest(
      OfferedCourseValidations.createOfferedCourseValidationSchema,
    ),
    OfferedCourseController.createOfferedCourse,
  )
  .get('/', OfferedCourseController.getAllOfferedCourses)
  .get('/:id', OfferedCourseController.getSingleOfferedCourses)
  .patch(
    '/:id',
    validateRequest(
      OfferedCourseValidations.updateOfferedCourseValidationSchema,
    ),
    OfferedCourseController.updateOfferedCourse,
  )
  .delete('/:id', OfferedCourseController.deleteOfferedCourseFromDB)

export const OfferedCourseRoutes = router
