import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client"; // Removed direct import
import storeRoutes from "./routes/stores";
// import authRoutes from "./routes/auth"; // Temporarily disabled auth routes
import categoriesRoutes from "./routes/categories"; // Import categories routes
import prisma from "./lib/prisma"; // Import the single Prisma client instance

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
// const prisma = new PrismaClient(); // Removed direct instantiation
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/stores", storeRoutes);
// app.use("/api/auth", authRoutes); // Temporarily disabled auth routes
app.use("/api/categories", categoriesRoutes); // Use categories routes

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
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
