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
exports.OfferedCoursesService = void 0;
const offeredCourse_model_1 = require("./offeredCourse.model");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield offeredCourse_model_1.OfferedCourse.create(payload);
    return response;
});
const getAllOfferedCoursesIntoDB = () => __awaiter(void 0, void 0, void 0, function* () { });
const getSingleOfferedCourseIntoDB = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.OfferedCoursesService = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesIntoDB,
    getSingleOfferedCourseIntoDB,
};
