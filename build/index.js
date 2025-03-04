"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./Models/Database"));
const quizRoutes_1 = __importDefault(require("./Routes/quizRoutes"));
const Logger_1 = __importDefault(require("./Utils/Logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
Database_1.default.init();
app.listen(8000, () => {
    Logger_1.default.info("Server is running on port 8000");
});
app.use("/api/quiz", quizRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Server is running");
});
