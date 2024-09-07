"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router
    .post('/create-course', (0, validateRequest_1.default)(course_validation_1.courseValidations.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse)
    .get('/', course_controller_1.CourseControllers.getAllCourses)
    .get('/:id', course_controller_1.CourseControllers.getCourse)
    .patch('/:id', (0, validateRequest_1.default)(course_validation_1.courseValidations.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse)
    .put('/:id/assign-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.assignFacultiesWithCourse)
    .put('/:id/remove-faculties', (0, validateRequest_1.default)(course_validation_1.courseValidations.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.removeFacultiesWithCourse)
    .delete('/:id', course_controller_1.CourseControllers.deleteCourse);
exports.CourseRoutes = router;
