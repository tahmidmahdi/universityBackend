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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../users/user.model");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
    // let searchTerm = ''
    // if (query.searchTerm) {
    //   searchTerm = query?.searchTerm as string
    // }
    // const queryObject = { ...query }
    // const searchQuery = Student.find({
    //   $or: studentSearchableFields.map(field => ({
    //     [field]: { $regex: searchTerm, $options: 'i' },
    //   })),
    // })
    // filtering
    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    // excludeFields.forEach(element => delete queryObject[element])
    // console.log({ query, queryObject })
    // const filterQuery = searchQuery
    //   .find(queryObject)
    //   .populate('user')
    //   .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //       path: 'academicFaculty',
    //       strictPopulate: false,
    //     },
    //   })
    // let sort = '-createdAt'
    // if (query.sort) {
    //   sort = query.sort as string
    // }
    // const sortQuery = filterQuery.sort(sort)
    // let page = 1
    // let limit = 1
    // let skip = 0
    // if (query.limit) {
    //   limit = Number(query.limit)
    // }
    // if (query.page) {
    //   page = Number(query.page)
    //   skip = (page - 1) * limit
    // }
    // const paginateQuery: any = sortQuery.skip(skip)
    // const limitQuery = paginateQuery.limit(limit)
    // field limiting
    // let fields = '-__v'
    // fields: "name,email"
    // to
    // fields: "name email"
    // if (query.fields) {
    //   fields = (query.fields as string).split(',').join(' ')
    // }
    // const fieldQuery = await limitQuery.select(fields)
    // return fieldQuery
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate('user')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
            strictPopulate: false,
        },
    }), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const response = yield studentQuery.modelQuery;
    return response;
});
const getStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = student_model_1.Student.findOne({ id })
            .populate('user')
            .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
                strictPopulate: false,
            },
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete student');
        }
        const deletedUser = yield user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete student');
    }
});
const updateStudentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const response = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return response;
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
