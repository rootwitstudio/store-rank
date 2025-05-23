"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { PrismaClient } from "@prisma/client"; // Removed direct import
const stores_1 = __importDefault(require("./routes/stores"));
// import authRoutes from "./routes/auth"; // Temporarily disabled auth routes
const categories_1 = __importDefault(require("./routes/categories")); // Import categories routes
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
// const prisma = new PrismaClient(); // Removed direct instantiation
const port = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/stores", stores_1.default);
// app.use("/api/auth", authRoutes); // Temporarily disabled auth routes
app.use("/api/categories", categories_1.default); // Use categories routes
// Routes (These can be removed later as they are now in storeRoutes and categories.ts)
// app.get("/api/stores", async (req, res) => {
//   try {
//     const stores = await prisma.store.findMany();
//     res.json(stores);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch stores" });
//   }
// });
// app.get("/api/stores/:category", async (req, res) => {
//   try {
//     const { category } = req.params;
//     const stores = await prisma.store.findMany({
//       where: { category },
//     });
//     res.json(stores);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch stores" });
//   }
// });
// app.get("/api/categories", async (req, res) => {
//   try {
//     const categories = await prisma.category.findMany();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch categories" });
//   }
// });
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
