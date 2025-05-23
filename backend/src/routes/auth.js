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
const express_1 = require("express");
// import { PrismaClient } from "@prisma/client"; // Removed direct import
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma")); // Import the single Prisma client instance
const router = (0, express_1.Router)();
// const prisma = new PrismaClient(); // Removed direct instantiation
// Register new user
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, role } = req.body;
        // Check if user already exists
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || "USER",
            },
        });
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "7d" });
        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
}));
// Login user
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Check password
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "7d" });
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
}));
exports.default = router;
