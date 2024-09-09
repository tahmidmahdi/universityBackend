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
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = require("../course/course.model");
const faculties_model_1 = require("../faculties/faculties.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
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
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newScheduleTime)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This faculty is not available at that time! Choose other time or day');
    }
    // valid request
    const academicSemester = isSemesterRegistrationExist === null || isSemesterRegistrationExist === void 0 ? void 0 : isSemesterRegistrationExist.academicSemester;
    const response = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return response;
});
const getAllOfferedCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourseQuery = new QueryBuilder_1.default(offeredCourse_model_1.OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const response = yield offeredCourseQuery.modelQuery;
    return response;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExist = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offered course not found');
    }
    const isFacultyExist = yield faculties_model_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found');
    }
    const semesterRegistration = isOfferedCourseExist.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You can not update this offered course as it is not upcoming');
    }
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
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newScheduleTime)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This faculty is not available at that time! Choose other time or day');
    }
    const response = yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return response;
});
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourse = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!offeredCourse) {
        throw new AppError_1.default(404, 'Offered Course not found');
    }
    return offeredCourse;
});
const deleteOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offered Course not found');
    }
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration).select('status');
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Offered course can not update ! because the semester ${semesterRegistrationStatus}`);
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndDelete(id);
    return result;
});
exports.OfferedCoursesService = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    updateOfferedCourseIntoDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
};
