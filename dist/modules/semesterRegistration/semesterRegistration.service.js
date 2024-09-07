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
exports.SemesterRegistrationsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload.academicSemester;
    // check if their any registered semesters status with upcoming or ongoing
    const isTheirAnyUpcomingOrOngoing = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            {
                status: semesterRegistration_constant_1.SemesterRegistrationStatusType.UPCOMING,
            },
            {
                status: semesterRegistration_constant_1.SemesterRegistrationStatusType.ONGOING,
            },
        ],
    });
    if (isTheirAnyUpcomingOrOngoing) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Their is already an ${isTheirAnyUpcomingOrOngoing.status} registered semester`);
    }
    // check if the semester is exist
    const isAcademicSemesterExist = yield academicSemester_model_1.AcademicSemester.findById({
        _id: academicSemester,
    });
    if (!isAcademicSemesterExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid academic semester');
    }
    //   check is the semester is already registered
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This semester is already registered');
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrationsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const response = yield semesterRegistrationQuery.modelQuery;
    return response;
});
const getSingleSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield semesterRegistration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return response;
});
const updateSemesterRegistrationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is the registered semester is exists
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This semester is not found');
    }
    // if the requested semester registration is ended, we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExist === null || isSemesterRegistrationExist === void 0 ? void 0 : isSemesterRegistrationExist.status;
    const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (currentSemesterStatus === semesterRegistration_constant_1.SemesterRegistrationStatusType.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    }
    // UPCOMING -> ONGOING -> ENDED
    if (currentSemesterStatus === semesterRegistration_constant_1.SemesterRegistrationStatusType.UPCOMING &&
        requestedStatus === semesterRegistration_constant_1.SemesterRegistrationStatusType.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.SemesterRegistrationStatusType.ONGOING &&
        requestedStatus === semesterRegistration_constant_1.SemesterRegistrationStatusType.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const response = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return response;
});
exports.SemesterRegistrationsService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
};
