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
exports.AcademicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return response;
});
const getAllAcademicDepartmentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicDepartment_model_1.AcademicDepartment.find().populate('academicFaculty');
    return response;
});
const getAcademicDepartmentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicDepartment_model_1.AcademicDepartment.findById(id).populate('academicFaculty');
    return response;
});
const updateAcademicDepartmentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield academicDepartment_model_1.AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return response;
});
exports.AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
};
