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
exports.CourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const _course_constant_1 = require("./ course.constant");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_model_1.Course.create(payload);
    return response;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .search(_course_constant_1.courseSearchableFields)
        .paginate()
        .filter()
        .sort()
        .fields();
    const response = yield courseQuery.modelQuery;
    return response;
});
const getCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return response;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, remaining = __rest(payload, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // basic course info update
        const updateBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, remaining, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course');
        }
        // check if there is any pre requisite courses
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out deleted fields
            const deletedPreRequisites = preRequisiteCourses
                .filter(course => {
                if (course.course) {
                    return course.isDeleted;
                }
            })
                .map(course => course.course);
            // deleted pre requisite courses
            const deletedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: { course: { $in: deletedPreRequisites } },
                },
            }, { new: true, runValidators: true, session });
            if (!deletedPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete course');
            }
            // filter out new pre requisites
            const newPreRequisites = preRequisiteCourses.filter(course => {
                if (course.course) {
                    return !course.isDeleted;
                }
            });
            // add new pre requisites
            const newPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
            }, { new: true, runValidators: true, session });
            if (!newPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete course');
            }
        }
        const response = course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        yield session.commitTransaction();
        yield session.endSession();
        return response;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong');
    }
});
const assignFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return response;
});
const removeFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } },
    }, {
        new: true,
    });
    return response;
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return response;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesWithCourseIntoDB,
    deleteCourseFromDB,
};
