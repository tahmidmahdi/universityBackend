import express, { Router } from 'express'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { FacultiesRoute } from '../modules/faculties/faculties.route'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/users/user.route'
import { AcademicFacultyRoutes } from './../modules/academicFaculty/academicFaculty.route'

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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultiesRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
