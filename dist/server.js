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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = require("mongoose");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { database_url, port } = config_1.default;
    try {
        yield (0, mongoose_1.connect)(database_url);
        app_1.default.listen(port, () => {
            console.log(`Example app listening on port ${port} `);
        });
    }
    catch (error) {
        app_1.default.listen(5002, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
});
main();
