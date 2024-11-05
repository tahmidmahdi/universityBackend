"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
// will call controller function
router
    .get('/', (0, auth_1.default)('faculty', 'admin'), student_controller_1.StudentControllers.getAllStudents)
    .get('/:studentId', (0, auth_1.default)('faculty', 'admin'), student_controller_1.StudentControllers.getStudentById)
    .delete('/:studentId', (0, auth_1.default)('faculty', 'admin'), student_controller_1.StudentControllers.deleteStudentById)
    .patch('/:studentId', (0, auth_1.default)('faculty', 'admin'), student_controller_1.StudentControllers.updateStudentDataByID);
exports.StudentRoutes = router;
