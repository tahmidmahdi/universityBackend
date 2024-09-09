"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCoursesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = require("../course/course.model");
const faculties_model_1 = require("../faculties/faculties.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime, } = payload;
    // check if the semester registration id exist!
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester registration not found');
    }
    const isAcademicFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic faculty not found');
    }
    const isAcademicDepartmentExist = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic department not found');
    }
    const isCourseExist = yield course_model_1.Course.findById(course);
    if (!isCourseExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    const isFacultyExist = yield faculties_model_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    // check if the department belong to the faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `This academicDepartment:${isAcademicDepartmentExist.name} is not belong to this academicFaculty:${isAcademicFacultyExist.name}`);
    }
    // check if the same offered course same section in same registered semester exist
    const isSameOfferedCourseWithSameRegisteredSemesterWithSameSection = yield offeredCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isSameOfferedCourseWithSameRegisteredSemesterWithSameSection) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Offered course with same section is already exist`);
    }
    // get the schedules of the faculty
    const assignedSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newScheduleTime = {
        days,
        startTime,
        endTime,
    };
    assignedSchedules.forEach(schedule => {
        const existingStartTime = new Date(`1996-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1996-01-01T${schedule.endTime}`);
        const newStartingTime = new Date(`1996-01-01T${newScheduleTime.startTime}`);
        const newEndTime = new Date(`1996-01-01T${newScheduleTime.endTime}`);
        if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, `This faculty is not available at that time, choose other time or day`);
        }
    });
    // valid request
    const academicSemester = isSemesterRegistrationExist === null || isSemesterRegistrationExist === void 0 ? void 0 : isSemesterRegistrationExist.academicSemester;
    const response = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return response;
});
const getAllOfferedCoursesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield offeredCourse_model_1.OfferedCourse.find();
    return response;
});
const getSingleOfferedCourseIntoDB = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.OfferedCoursesService = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseIntoDB,
};
