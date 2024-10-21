"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose")); // Importing Connection type
const Logger_1 = __importDefault(require("../Utils/Logger"));
const QuizModel = __importStar(require("./QuizModel")); // Importing all exports
const QuestionModel = __importStar(require("./QuestionModel")); // Importing all exports
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createDatabase = () => {
    let connection; // Explicitly typing the connection variable
    const authenticate = () => __awaiter(void 0, void 0, void 0, function* () {
        Logger_1.default.info("Authenticating to the database.");
        try {
            connection = yield mongoose_1.default.createConnection(process.env.MONGO_URI);
            Logger_1.default.info("DB connected");
        }
        catch (err) {
            Logger_1.default.error(`Failed connection to the DB: ${err.message}`);
            Logger_1.default.error(err);
            yield new Promise((resolve) => setTimeout(resolve, 5000));
            yield authenticate();
        }
    });
    const init = () => __awaiter(void 0, void 0, void 0, function* () {
        yield authenticate();
        // Set the connection for both models
        if (connection) {
            QuizModel.setConnection(connection); // Set the connection for QuizModel
            QuestionModel.setConnection(connection); // Set the connection for QuestionModel
        }
    });
    const getConnection = () => connection;
    return {
        init,
        getConnection,
        Quiz: QuizModel,
        Question: QuestionModel // Returning the Question functions directly
    };
};
exports.default = createDatabase();
