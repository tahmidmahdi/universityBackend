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
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = __importDefault(require("../../utils/sendImageToCloudinary"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const admin_model_1 = require("../admin/admin.model");
const faculties_model_1 = require("../faculties/faculties.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = (file, payload, password) => __awaiter(void 0, void 0, void 0, function* () {
    // create role
    const userData = {
        role: 'student',
        id: '',
    };
    // year semesterCode 4digitNumber
    // if password not given, use default password
    userData.password = password || config_1.default.default_password;
    userData.email = payload.email;
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById({
        _id: payload.admissionSemester,
    });
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        const imageName = `${userData.id}-${payload.name.firstName}`;
        const profileImg = yield (0, sendImageToCloudinary_1.default)(imageName, file.path);
        // create a user: transaction -1
        const response = yield user_model_1.UserModel.create([userData], { session });
        if (!response.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id and _id as user
        payload.id = response[0].id;
        payload.user = response[0]._id;
        payload.profileImg = profileImg;
        // create a student: transaction -2
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create student');
    }
});
const createFacultyIntoDB = (payload, password) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = {
        role: 'faculty',
        id: '',
    };
    facultyData.password = password || config_1.default.default_password;
    facultyData.email = payload.email;
    const lastFaculty = yield (0, user_utils_1.generateFacultyId)();
    facultyData.id = lastFaculty;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const response = yield user_model_1.UserModel.create([facultyData], { session });
        if (!response.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        payload.id = response[0].id;
        payload.user = response[0]._id;
        const createNewFaculty = yield faculties_model_1.Faculty.create([payload], { session });
        if (!createNewFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return createNewFaculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create faculty');
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use default password
    userData.password = password || config_1.default.default_password;
    userData.email = payload.email;
    //set student role
    userData.role = 'admin';
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // send image to cloudinary
        // create a user (transaction-1)
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Error in creating admin');
    }
});
const getMeFromDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'student') {
        const response = yield student_model_1.Student.findOne({ id: userId }).populate('user');
        return response;
    }
    if (role === 'faculty') {
        const response = yield faculties_model_1.Faculty.findOne({ id: userId }).populate('user');
        return response;
    }
    const response = yield admin_model_1.Admin.findOne({ id: userId }).populate('user');
    return response;
});
const changeStatusIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = payload;
    const response = yield user_model_1.UserModel.findByIdAndUpdate(id, { status }, { new: true });
    return response;
});
exports.UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMeFromDB,
    changeStatusIntoDB,
};
