import express, { Router } from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/users/user.route'

interface IRoutes {
  path: string
  route: Router
}

const router = express.Router()

const moduleRoutes: Array<IRoutes> = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
