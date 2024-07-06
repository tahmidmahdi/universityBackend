import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully!',
      data: response,
    })
  },
)

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrieved successfully!',
      data: response,
    })
  },
)

const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params
    const response =
      await AcademicDepartmentServices.getAcademicDepartmentFromDB(
        departmentId as unknown as Types.ObjectId,
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully!',
      data: response,
    })
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params
    const response =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId as unknown as Types.ObjectId,
        req.body,
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully!',
      data: response,
    })
  },
)

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
}
