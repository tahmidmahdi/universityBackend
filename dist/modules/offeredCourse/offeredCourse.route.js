"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const router = express_1.default.Router();
router
    .post('/create-offered-course', (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseController.createOfferedCourse)
    .get('/', offeredCourse_controller_1.OfferedCourseController.getAllOfferedCourses)
    .get('/:id', offeredCourse_controller_1.OfferedCourseController.getSingleOfferedCourses)
    .patch('/:id', (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseController.updateOfferedCourse)
    .delete('/:id', offeredCourse_controller_1.OfferedCourseController.deleteOfferedCourseFromDB);
exports.OfferedCourseRoutes = router;
