"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const admin_validation_1 = require("../admin/admin.validation");
const faculties_validation_1 = require("../faculties/faculties.validation");
const student_validation_1 = require("../student/student.validation");
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router
    .post('/create-student', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.UserControllers.createStudent)
    .post('/create-faculty', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(faculties_validation_1.facultyValidation.createFacultyValidationSchema), user_controller_1.UserControllers.createFaculty)
    .post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin)
    .get('/me', (0, auth_1.default)('student', 'faculty', 'admin'), user_controller_1.UserControllers.getMe)
    .post('/change-status/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.UserValidation.changeStatusValidationSchema), user_controller_1.UserControllers.changeStatus);
exports.UserRoutes = router;
