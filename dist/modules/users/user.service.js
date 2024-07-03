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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDB = (studentData, password) => __awaiter(void 0, void 0, void 0, function* () {
    // create role
    const userData = {
        role: 'student',
        id: '2030100003',
    };
    // year semesterCode 4digitNumber
    const generateStudentId = (payload) => { };
    // if password not given, use default password
    userData.password = password || config_1.default.default_password;
    const response = yield user_model_1.UserModel.create(userData);
    if (Object.keys(response).length) {
        // set id and _id as user
        studentData.id = response.id;
        studentData.user = response._id;
        const newStudent = student_model_1.Student.create(studentData);
        return newStudent;
    }
    return response;
});
exports.UserServices = {
    createStudentIntoDB,
};
