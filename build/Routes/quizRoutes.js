"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../Controllers/quizController");
const router = express_1.default.Router();
router.get("/:quizId", quizController_1.getQuiz);
router.get("/all", quizController_1.getAllQuizes);
router.post("/start", quizController_1.startQuiz);
router.post("/:quizId/answer", quizController_1.saveQuestionWithAnswer);
router.post("/:quizId/finish", quizController_1.finishQuiz);
router.post("/:quizId/report", quizController_1.getReport);
exports.default = router;
