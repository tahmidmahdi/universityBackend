"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/users/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
