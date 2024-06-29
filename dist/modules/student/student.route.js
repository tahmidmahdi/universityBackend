"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
// will call controller function
router.get('/', student_controller_1.StudentControllers.getAllStudents);
router.get('/:studentId', student_controller_1.StudentControllers.getStudentById);
router.delete('/:studentId', student_controller_1.StudentControllers.deleteStudentById);
router.put('/:studentId');
exports.StudentRoutes = router;
