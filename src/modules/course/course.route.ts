import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'
import { courseValidations } from './course.validation'

const router = express.Router()

router
  .post(
    '/create-course',
    validateRequest(courseValidations.createCourseValidationSchema),
    CourseControllers.createCourse,
  )
  .get('/', CourseControllers.getAllCourses)
  .get('/:id', CourseControllers.getCourse)
  .patch(
    '/:id',
    validateRequest(courseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse,
  )
  .put(
    '/:id/assign-faculties',
    validateRequest(courseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.assignFacultiesWithCourse,
  )
  .put(
    '/:id/remove-faculties',
    validateRequest(courseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.removeFacultiesWithCourse,
  )
  .delete('/:id', CourseControllers.deleteCourse)

export const CourseRoutes = router
