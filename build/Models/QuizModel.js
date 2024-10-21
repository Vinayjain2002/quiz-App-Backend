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
exports.setConnection = exports.saveQuestionsWithAnswers = exports.update = exports.create = exports.getAll = exports.get = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("../Utils/Logger"));
// Define the question schema
const questionSchemaDefinition = {
    question: { type: String, required: true },
    questionImg: { type: String },
    difficulty: { type: String },
    score: { type: Number },
    answers: { type: [String] },
    correct_answers: { type: [String] },
    incorrect_answers: { type: [String] },
    type: { type: String },
    timeTaken: { type: Number },
};
// Define the quiz schema
const schemaDefinition = {
    totalScore: { type: Number, default: 0 },
    obtained: { type: Number, default: 0 },
    questions: [questionSchemaDefinition],
    status: { type: String, enum: ["in-progress", "finished"] },
};
// Variable to hold the model
let QuizModel;
// Function to set the database connection and create the model
const setConnection = (connection) => {
    const quizSchema = new mongoose_1.default.Schema(schemaDefinition);
    quizSchema.set("timestamps", true);
    QuizModel = connection.model("Quiz", quizSchema);
};
exports.setConnection = setConnection;
// Helper function to validate ObjectId
const validateObjectId = (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
    }
};
// Define model methods
const get = ({ id, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    validateObjectId(id);
    try {
        const quiz = yield QuizModel.findOne({ _id: id }, fields).lean();
        if (!quiz)
            throw new Error("Quiz not found");
        return quiz;
    }
    catch (error) {
        Logger_1.default.error("QuizModel: get", error);
        throw error;
    }
});
exports.get = get;
const getAll = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield QuizModel.find({}, fields).lean();
        return quizzes;
    }
    catch (error) {
        Logger_1.default.error("QuizModel: getAll", error);
        throw error;
    }
});
exports.getAll = getAll;
// partial need to be used as all prop may not be present
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield QuizModel.create(data);
        return quiz;
    }
    catch (error) {
        Logger_1.default.error("QuizModel: create", error);
        throw error;
    }
});
exports.create = create;
const update = ({ id, data }) => __awaiter(void 0, void 0, void 0, function* () {
    validateObjectId(id);
    try {
        const quiz = yield QuizModel.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, data) }, { new: true }).lean();
        if (!quiz)
            throw new Error("Quiz not found");
        return quiz;
    }
    catch (error) {
        Logger_1.default.error("QuizModel: update", error);
        throw error;
    }
});
exports.update = update;
const saveQuestionsWithAnswers = ({ id, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    validateObjectId(id);
    try {
        const questionId = new mongoose_1.default.Types.ObjectId(data.questionId);
        const quiz = yield QuizModel.findOneAndUpdate({ _id: id, "questions._id": questionId }, {
            $set: {
                "questions.$.answers": data.answers,
                "questions.$.score": data.score,
                "questions.$.timeTaken": data.timeTaken,
            },
        }, { new: true }).lean();
        if (!quiz)
            throw new Error("Quiz not found or question ID is invalid");
        return quiz;
    }
    catch (error) {
        Logger_1.default.error("QuizModel: saveQuestionsWithAnswers", error);
        throw error;
    }
});
exports.saveQuestionsWithAnswers = saveQuestionsWithAnswers;
