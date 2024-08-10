"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultiesRoute = void 0;
const express_1 = __importDefault(require("express"));
const faculties_controller_1 = require("./faculties.controller");
const router = express_1.default.Router();
router.get('/', faculties_controller_1.FacultyControllers.getAllFaculties);
exports.FacultiesRoute = router;
