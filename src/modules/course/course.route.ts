import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../users/user.constant'
import { CourseControllers } from './course.controller'
import { courseValidations } from './course.validation'

const router = express.Router()

router
  .post(
    '/create-course',
    auth(USER_ROLE.admin),
    validateRequest(courseValidations.createCourseValidationSchema),
    CourseControllers.createCourse,
  )
  .get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    CourseControllers.getAllCourses,
  )
  .get('/:id', CourseControllers.getCourse)
  .patch(
    '/:id',
    auth(USER_ROLE.admin),
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
  .delete('/:id', auth(USER_ROLE.admin), CourseControllers.deleteCourse)

export const CourseRoutes = router
