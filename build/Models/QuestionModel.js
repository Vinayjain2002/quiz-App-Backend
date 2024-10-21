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
exports.setConnection = exports.getAll = exports.get = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("../Utils/Logger"));
// Define the schema
const schemaDef = {
    question: { type: String },
    difficulty: { type: String },
    score: { type: Number },
    answers: { type: [String] },
    correct_answers: { type: [String] },
    incorrect_answers: { type: [String] },
    type: { type: String },
    questionImg: { type: String },
    timeTaken: { type: Number },
};
// Variable to hold the model
let QuestionModel;
// Function to set the database connection and create the model
const setConnection = (connection) => {
    const questionSchema = new mongoose_1.default.Schema(schemaDef);
    questionSchema.set("timestamps", true);
    QuestionModel = connection.model("Questions", questionSchema);
};
exports.setConnection = setConnection;
// Define model methods
const get = ({ id, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield QuestionModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, fields).lean();
        return question;
    }
    catch (error) {
        Logger_1.default.error("QuestionModel: get", error);
        throw error;
    }
});
exports.get = get;
const getAll = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield QuestionModel.find({}, fields).lean();
        return questions;
    }
    catch (error) {
        Logger_1.default.error("QuestionModel: getAll", error);
        throw error;
    }
});
exports.getAll = getAll;
