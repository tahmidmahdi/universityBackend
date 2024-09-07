import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegistrationsService } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await SemesterRegistrationsService.createSemesterRegistrationIntoDB(
        req.body,
      )
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Creates Academic Semester successfully',
      data: response,
    })
  },
)

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const response =
      await SemesterRegistrationsService.getAllSemesterRegistrationsFromDB(
        req.query,
      )
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieved all Academic Semester successfully',
      data: response,
    })
  },
)

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const response =
      await SemesterRegistrationsService.getSingleSemesterRegistrationFromDB(
        id as string,
      )
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrieved Academic Semester successfully',
      data: response,
    })
  },
)

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const response =
      await SemesterRegistrationsService.updateSemesterRegistrationIntoDB(
        id as string,
        req.body,
      )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Updated Academic Semester successfully',
      data: response,
    })
  },
)

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
}
