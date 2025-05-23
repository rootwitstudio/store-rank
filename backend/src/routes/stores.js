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
// import { auth, isAdmin, isBusiness } from "../middleware/auth"; // Temporarily disabled auth middleware
const prisma_1 = __importDefault(require("../lib/prisma")); // Import the single Prisma client instance
const router = (0, express_1.Router)();
// const prisma = new PrismaClient(); // Removed direct instantiation
// Get all stores with filtering and sorting
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, minRating, verified, claimed, country, tags, sortBy, sortOrder = "desc", } = req.query;
        const where = {};
        if (category)
            where.category = category;
        if (minRating)
            where.rating = { gte: Number(minRating) };
        if (verified)
            where.verified = verified === "true";
        if (claimed)
            where.claimed = claimed === "true";
        if (country)
            where.country = country;
        if (tags) {
            const tagArray = tags.split(",");
            where.tags = { hasEvery: tagArray };
        }
        const orderBy = {};
        if (sortBy) {
            orderBy[sortBy] = sortOrder;
        }
        const stores = yield prisma_1.default.store.findMany({
            where,
            orderBy,
        });
        res.json(stores);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch stores" });
    }
}));
// Get store by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield prisma_1.default.store.findUnique({
            where: { id: req.params.id },
        });
        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }
        res.json(store);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch store" });
    }
}));
// Create store (protected, business users only) - Temporarily unprotected
router.post("/", 
/* auth, isBusiness, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield prisma_1.default.store.create({
            data: Object.assign({}, req.body),
        });
        res.status(201).json(store);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create store" });
    }
}));
// Update store (protected, business users or admin) - Temporarily unprotected
router.patch("/:id", 
/* auth, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield prisma_1.default.store.findUnique({
            where: { id: req.params.id },
        });
        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }
        // Only allow business users to update their own stores (this logic requires auth, will need to be re-evaluated later)
        // if (req.user?.role === "BUSINESS" && store.claimed === false) {
        //   return res.status(403).json({ error: "Access denied" });
        // }
        const updatedStore = yield prisma_1.default.store.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(updatedStore);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update store" });
    }
}));
// Delete store (protected, admin only) - Temporarily unprotected
router.delete("/:id", 
/* auth, isAdmin, */ (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.store.delete({
            where: { id: req.params.id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete store" });
    }
}));
exports.default = router;
