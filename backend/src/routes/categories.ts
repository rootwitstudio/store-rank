import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Define a type for the category result including the selected children relation
type CategoryWithChildren = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    icon: true;
    createdAt: true;
    updatedAt: true;
    children: {
      select: {
        id: true;
        name: true;
        description: true;
        icon: true;
        createdAt: true;
        updatedAt: true;
      };
    };
  };
}>;

// Get all categories with their subcategories
router.get("/", async (req, res) => {
  try {
    // Explicitly type the result of findMany
    const categories: CategoryWithChildren[] = await prisma.category.findMany({
      where: {
        parentId: null, // Only get main categories
      },
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        createdAt: true,
        updatedAt: true,
        children: {
          select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    // Transform the response to match the desired format
    const formattedCategories = categories.map((category) => ({
      ...category,
      subcategories: category.children,
      children: undefined, // Remove the children field
    }));

    res.json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific category with its subcategories
router.get("/:id", async (req, res) => {
  try {
    // Explicitly type the result of findUnique
    const category: CategoryWithChildren | null =
      await prisma.category.findUnique({
        where: {
          id: req.params.id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          icon: true,
          createdAt: true,
          updatedAt: true,
          children: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Transform the response to match the desired format
    const formattedCategory = {
      ...category,
      subcategories: category.children,
      children: undefined, // Remove the children field
    };

    res.json(formattedCategory);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
