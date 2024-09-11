"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const routes_1 = __importDefault(require("./routes"));
// initialize express
const app = (0, express_1.default)();
// basic usages
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'] }));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
