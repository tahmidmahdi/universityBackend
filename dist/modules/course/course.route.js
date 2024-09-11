"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../users/user.constant");
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router
    .post('/create-course', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse)
    .get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), course_controller_1.CourseControllers.getAllCourses)
    .get('/:id', course_controller_1.CourseControllers.getCourse)
    .patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse)
    .put('/:id/assign-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.assignFacultiesWithCourse)
    .put('/:id/remove-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.removeFacultiesWithCourse)
    .delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseControllers.deleteCourse);
exports.CourseRoutes = router;
