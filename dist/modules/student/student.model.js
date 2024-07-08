"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required'],
        maxLength: [20, "Name can't be more than 20"],
        validate: {
            validator: function (value) {
                const firstNameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameCapitalized === value;
            },
            message: '{VALUE} is not in capitalized formate',
        },
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not valid',
        },
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father Occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact Number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother Occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact Number is required'],
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Local Guardian Name is required'],
        trim: true,
        maxLength: [20, 'Allowed name length is 20'],
    },
    occupation: {
        type: String,
        required: [true, 'Local Guardian Occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Local Guardian Contact Number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local Guardian Address is required'],
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User Id is required'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: userNameSchema,
        required: [true, 'Student Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported or valid',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not a valid email type',
        },
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: [true, 'Blood Group is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required'],
    },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian Information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local Guardian Information is required'],
    },
    profileImg: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// create model
exports.Student = (0, mongoose_1.model)('Student', studentSchema);
