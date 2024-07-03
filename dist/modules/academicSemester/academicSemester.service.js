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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterServices = void 0;
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };
    if (payload.name &&
        payload.year &&
        academicSemesterMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code!');
    }
    const response = yield academicSemester_model_1.AcademicSemester.create(payload);
    return response;
});
const getAllAcademicSemesterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicSemester_model_1.AcademicSemester.find();
    return response;
});
const getAcademicSemesterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicSemester_model_1.AcademicSemester.findById({ _id: id });
    return response;
});
const updateAcademicSemesterFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return response;
});
exports.AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getAcademicSemesterFromDB,
    updateAcademicSemesterFromDB,
};
