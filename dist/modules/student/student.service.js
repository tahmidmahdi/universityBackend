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
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield student_model_1.Student.find();
    return response;
});
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = student_model_1.Student.aggregate([{ $match: { id: id } }]);
        return response;
    }
    catch (error) { }
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = student_model_1.Student.updateOne({ id }, { isDeleted: true });
        return response;
    }
    catch (error) { }
});
const updateStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield student_model_1.Student.findOneAndUpdate({ id }, { gender: '' });
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
