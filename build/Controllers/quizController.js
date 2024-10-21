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
exports.getReport = exports.finishQuiz = exports.saveQuestionWithAnswer = exports.startQuiz = exports.getAllQuizes = exports.getQuiz = void 0;
const Database_1 = __importDefault(require("../Models/Database"));
const Logger_1 = __importDefault(require("../Utils/Logger"));
const scoringHelper_1 = require("../Utils/scoringHelper");
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.quizId;
        const result = yield Database_1.default.Quiz.get({ id });
        res.status(200).json({
            success: true,
            result,
        });
    }
    catch (err) {
        Logger_1.default.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.getQuiz = getQuiz;
const getAllQuizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Database_1.default.Quiz.getAll();
        res.status(200).json({
            success: true,
            result,
        });
    }
    catch (err) {
        Logger_1.default.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.getAllQuizes = getAllQuizes;
const startQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // getting all teh details 
        /*
          totalScore: number;
          obtained: number;
          username: string;
          questions: IQuestion[];
          status: "in-progress" | "finished";
        */
        const data = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        data.status = "in-progress";
        data.questions = yield Database_1.default.Question.getAll();
        const result = yield Database_1.default.Quiz.create(data);
        Logger_1.default.info("Quiz started");
        res.status(200).json({
            success: true,
            result,
        });
    }
    catch (err) {
        Logger_1.default.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.startQuiz = startQuiz;
const saveQuestionWithAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const id = req.params.quizId;
        const data = (_b = req.body) !== null && _b !== void 0 ? _b : {};
        const question = yield Database_1.default.Question.get({
            id: data.questionId,
        });
        if (!question) {
            throw new Error("Question not found.");
        }
        const payload = Object.assign({}, data);
        // Getting score obtained for the answer
        payload.score = (0, scoringHelper_1.getScoreForAnswer)({
            question,
            answers: (_c = data === null || data === void 0 ? void 0 : data.answers) !== null && _c !== void 0 ? _c : [],
        });
        const result = yield Database_1.default.Quiz.saveQuestionsWithAnswers({
            id,
            data: payload,
        });
        Logger_1.default.info("Saved question with answer.");
        res.status(200).json({
            success: true,
            result: result,
        });
    }
    catch (err) {
        Logger_1.default.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.saveQuestionWithAnswer = saveQuestionWithAnswer;
const finishQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = req.params.quizId;
        const quiz = yield Database_1.default.Quiz.get({
            id,
            fields: {
                questions: 1,
            },
        });
        if (!((_d = quiz === null || quiz === void 0 ? void 0 : quiz.questions) === null || _d === void 0 ? void 0 : _d.length)) {
            throw new Error("No questions found for the quiz");
        }
        // Getting total score and score obtained
        const score = (0, scoringHelper_1.getQuizScore)(quiz.questions);
        // Updating the quiz with score data and status
        const result = yield Database_1.default.Quiz.update({
            id,
            data: {
                totalScore: score.totalPoints,
                obtained: score.obtained,
                status: "finished",
            },
        });
        Logger_1.default.info("Quiz report generated");
        res.status(200).json({
            success: true,
            result,
        });
    }
    catch (err) {
        Logger_1.default.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.finishQuiz = finishQuiz;
const getReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const id = req.params.quizId;
        // Getting quiz data
        const quiz = yield Database_1.default.Quiz.get({
            id,
            fields: {
                questions: 1,
                totalScore: 1,
                obtained: 1,
                status: 1,
            },
        });
        // If quiz is not finished then there is not report
        if ((quiz === null || quiz === void 0 ? void 0 : quiz.status) !== "finished") {
            throw new Error("Couldn't find report. Quiz is not finished yet.");
        }
        // Set default values for report
        const result = {
            correct: 0,
            partiallyCorrect: 0,
            inCorrect: 0,
            percentage: 0,
            totalScore: quiz.totalScore,
            obtained: quiz.obtained,
            totalTime: 0,
        };
        // Getting percentage marks
        result.percentage = Math.floor((quiz.obtained / quiz.totalScore) * 100);
        // Getting number of correct, incorrect and partially correct qna
        for (let _question of quiz.questions) {
            const isCorrect = _question.correct_answers.every((_ans) => { var _a; return (_a = _question.answers) === null || _a === void 0 ? void 0 : _a.includes(_ans); }) && ((_e = _question.answers) === null || _e === void 0 ? void 0 : _e.every((_ans) => _question.correct_answers.includes(_ans)));
            const isPartiallyCorrect = (_f = _question.answers) === null || _f === void 0 ? void 0 : _f.every((_ans) => _question.correct_answers.includes(_ans));
            if (isCorrect) {
                result.correct += 1;
            }
            else if (isPartiallyCorrect) {
                result.partiallyCorrect += 1;
            }
            else {
                result.inCorrect += 1;
            }
        }
        // Getting total time to complete the quiz
        result.totalTime = quiz.questions.reduce((prev, cur) => { var _a; return ((_a = cur.timeTaken) !== null && _a !== void 0 ? _a : 0) + prev; }, 0);
        res.status(200).json({
            success: true,
            result,
        });
    }
    catch (err) {
        Logger_1.default.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.getReport = getReport;
