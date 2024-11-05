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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: (_a = config_1.default.cloudinary_name) === null || _a === void 0 ? void 0 : _a.toString(),
    api_key: (_b = config_1.default.cloudinary_api_key) === null || _b === void 0 ? void 0 : _b.toString(),
    api_secret: (_c = config_1.default.cloudinary_api_secret) === null || _c === void 0 ? void 0 : _c.toString(),
});
const sendImageToCloudinary = (imageName, path) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadResult = yield cloudinary_1.v2.uploader
        .upload(path, {
        public_id: imageName,
    })
        .catch(error => {
        console.log(error);
    });
    fs_1.default.unlink(path, err => {
        if (err) {
            console.error(err);
        }
        else {
            console.log('file has been deleted');
        }
    });
    return uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
});
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/uploads`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
exports.default = sendImageToCloudinary;
