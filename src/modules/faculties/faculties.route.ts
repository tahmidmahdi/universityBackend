import express from 'express'
import { FacultyControllers } from './faculties.controller'

const router = express.Router()

router.get('/', FacultyControllers.getAllFaculties)

export const FacultiesRoute = router
