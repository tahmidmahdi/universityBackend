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

export const SemesterRegistrationController = {
  createSemesterRegistration,
}
