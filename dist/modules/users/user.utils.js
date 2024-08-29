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
exports.generateAdminId = exports.findLastAdminId = exports.generateFacultyId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.UserModel.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudentId();
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.UserModel.findOne({
        role: 'faculty',
    })
        .sort({ createdAt: -1 })
        .select({ id: 1 });
    if (!lastFaculty) {
        const facultyInitializedId = '0001';
        return facultyInitializedId;
    }
    const currentIdInNumber = Number(lastFaculty.id);
    const withFiller = Number(currentIdInNumber + 1)
        .toString()
        .padStart(4, '0');
    return withFiller;
});
exports.generateFacultyId = generateFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield user_model_1.UserModel.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield (0, exports.findLastAdminId)();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
