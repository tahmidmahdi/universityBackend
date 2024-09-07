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
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload.academicSemester;
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
    const response = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    return response;
});
const updateSemesterRegistrationIntoDB = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.SemesterRegistrationsService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
};
