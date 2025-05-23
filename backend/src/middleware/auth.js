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
exports.isBusiness = exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-secret-key");
        const user = yield prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            throw new Error();
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Please authenticate" });
    }
});
exports.auth = auth;
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "ADMIN") {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};
exports.isAdmin = isAdmin;
const isBusiness = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "BUSINESS") {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};
exports.isBusiness = isBusiness;
