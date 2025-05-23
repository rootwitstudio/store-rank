import { Router } from "express";
// import { PrismaClient } from "@prisma/client"; // Removed direct import
// import { auth, isAdmin, isBusiness } from "../middleware/auth"; // Temporarily disabled auth middleware
import prisma from "../lib/prisma"; // Import the single Prisma client instance

const router = Router();
// const prisma = new PrismaClient(); // Removed direct instantiation

// Get all stores with filtering and sorting
router.get("/", async (req, res) => {
  try {
    const {
      category,
      minRating,
      verified,
      claimed,
      country,
      tags,
      sortBy,
      sortOrder = "desc",
    } = req.query;

    const where: any = {};
    if (category) where.category = category;
    if (minRating) where.rating = { gte: Number(minRating) };
    if (verified) where.verified = verified === "true";
    if (claimed) where.claimed = claimed === "true";
    if (country) where.country = country;
    if (tags) {
      const tagArray = (tags as string).split(",");
      where.tags = { hasEvery: tagArray };
    }

    const orderBy: any = {};
    if (sortBy) {
      orderBy[sortBy as string] = sortOrder;
    }

    const stores = await prisma.store.findMany({
      where,
      orderBy,
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

// Get store by ID
router.get("/:id", async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: req.params.id },
    });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch store" });
  }
});

// Create store (protected, business users only) - Temporarily unprotected
router.post(
  "/",
  /* auth, isBusiness, */ async (req, res) => {
    try {
      const store = await prisma.store.create({
        data: {
          ...req.body,
          // claimed: true, // Consider how to handle claimed status without auth
        },
      });
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to create store" });
    }
  }
);

// Update store (protected, business users or admin) - Temporarily unprotected
router.patch(
  "/:id",
  /* auth, */ async (req, res) => {
    try {
      const store = await prisma.store.findUnique({
        where: { id: req.params.id },
      });

      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }

      // Only allow business users to update their own stores (this logic requires auth, will need to be re-evaluated later)
      // if (req.user?.role === "BUSINESS" && store.claimed === false) {
      //   return res.status(403).json({ error: "Access denied" });
      // }

      const updatedStore = await prisma.store.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json(updatedStore);
    } catch (error) {
      res.status(500).json({ error: "Failed to update store" });
    }
  }
);

// Delete store (protected, admin only) - Temporarily unprotected
router.delete(
  "/:id",
  /* auth, isAdmin, */ async (req, res) => {
    try {
      await prisma.store.delete({
        where: { id: req.params.id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete store" });
    }
  }
);

export default router;
