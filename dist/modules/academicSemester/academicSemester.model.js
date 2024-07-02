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
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true,
    },
    startMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        required: true,
    },
    endMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        required: true,
    },
}, {
    timestamps: true,
});
academicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExist = yield exports.AcademicSemester.findOne({
            name: this.name,
            year: this.year,
        });
        if (isSemesterExist) {
            throw Error('Academic semester already exist.');
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)('academicSemester', academicSemesterSchema);
