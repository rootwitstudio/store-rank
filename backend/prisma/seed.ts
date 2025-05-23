import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Fashion",
    description: "Explore the latest trends and timeless styles.",
    icon: null,
    subcategories: [
      {
        name: "Men's Clothing",
        description: "Clothing and accessories for men",
        icon: null,
      },
      {
        name: "Women's Clothing",
        description: "Clothing and accessories for women",
        icon: null,
      },
      {
        name: "Kids' Clothing",
        description: "Clothing and accessories for children",
        icon: null,
      },
      {
        name: "Shoes",
        description: "Footwear for every occasion.",
        icon: null,
      },
      {
        name: "Accessories",
        description: "Jewelry, bags, and other fashion accessories",
        icon: null,
      },
    ],
  },
  {
    name: "Electronics",
    description: "Gadgets, devices, and tech accessories",
    icon: "Monitor",
    subcategories: [
      {
        name: "Smartphones",
        description: "Mobile phones and accessories",
        icon: null,
      },
      {
        name: "Computers",
        description: "Laptops, desktops, and accessories",
        icon: null,
      },
      {
        name: "Audio",
        description: "Headphones, speakers, and audio equipment",
        icon: null,
      },
      {
        name: "Gaming",
        description: "Gaming consoles, games, and accessories",
        icon: null,
      },
    ],
  },
  {
    name: "Home & Living",
    description: "Furniture, decor, and home essentials",
    icon: "Sofa",
    subcategories: [
      {
        name: "Furniture",
        description: "Tables, chairs, and other furniture",
        icon: null,
      },
      {
        name: "Decor",
        description: "Wall art, vases, and decorative items",
        icon: null,
      },
      {
        name: "Kitchen",
        description: "Kitchen appliances and utensils",
        icon: null,
      },
      {
        name: "Bedding",
        description: "Bed sheets, pillows, and comforters",
        icon: null,
      },
    ],
  },
  {
    name: "Food & Beverages",
    description: "Groceries, snacks, and beverages",
    icon: "Utensils",
    subcategories: [
      {
        name: "Groceries",
        description: "Fresh produce, dairy, and pantry items",
        icon: null,
      },
      {
        name: "Beverages",
        description: "Drinks, juices, and bottled water",
        icon: null,
      },
      {
        name: "Snacks",
        description: "Chips, cookies, and other snacks",
        icon: null,
      },
    ],
  },
  {
    name: "Books",
    description: "Books, e-books, and educational materials",
    icon: "BookOpen",
    subcategories: [
      {
        name: "Fiction",
        description: "Novels, short stories, and literary works",
        icon: null,
      },
      {
        name: "Non-Fiction",
        description: "Educational and informative books",
        icon: null,
      },
      {
        name: "Textbooks",
        description: "Academic and educational materials",
        icon: null,
      },
    ],
  },
  {
    name: "Beauty & Personal Care",
    description: "Cosmetics, skincare, and personal hygiene products",
    icon: "Sparkles",
    subcategories: [
      {
        name: "Skincare",
        description: "Facial care and body care products",
        icon: null,
      },
      {
        name: "Makeup",
        description: "Cosmetics and beauty products",
        icon: null,
      },
      {
        name: "Hair Care",
        description: "Shampoo, conditioner, and styling products",
        icon: null,
      },
    ],
  },
  {
    name: "Sports & Outdoors",
    description: "Sports equipment, outdoor gear, and fitness accessories",
    icon: "Dumbbell",
    subcategories: [
      {
        name: "Fitness",
        description: "Exercise equipment and accessories",
        icon: null,
      },
      {
        name: "Outdoor Sports",
        description: "Camping, hiking, and outdoor gear",
        icon: null,
      },
      {
        name: "Team Sports",
        description: "Equipment for team sports",
        icon: null,
      },
    ],
  },
  {
    name: "Toys & Games",
    description: "Toys, games, and entertainment products",
    icon: "Gamepad2",
    subcategories: [
      {
        name: "Board Games",
        description: "Traditional and modern board games",
        icon: null,
      },
      {
        name: "Toys",
        description: "Children's toys and playthings",
        icon: null,
      },
      {
        name: "Video Games",
        description: "Digital games and gaming accessories",
        icon: null,
      },
    ],
  },
  {
    name: "Health & Wellness",
    description: "Health supplements, wellness products, and medical supplies",
    icon: "Heart",
    subcategories: [
      {
        name: "Supplements",
        description: "Vitamins and nutritional supplements",
        icon: null,
      },
      {
        name: "Medical Supplies",
        description: "First aid and medical equipment",
        icon: null,
      },
      {
        name: "Fitness Trackers",
        description: "Health monitoring devices",
        icon: null,
      },
    ],
  },
  {
    name: "Automotive",
    description: "Car parts, accessories, and automotive services",
    icon: "Car",
    subcategories: [
      {
        name: "Car Parts",
        description: "Replacement parts and components",
        icon: null,
      },
      {
        name: "Accessories",
        description: "Car care and enhancement products",
        icon: null,
      },
      {
        name: "Tools",
        description: "Automotive tools and equipment",
        icon: null,
      },
    ],
  },
];

async function main() {
  console.log("Start seeding...");

  for (const category of categories) {
    // Create main category
    const mainCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {
        description: category.description,
        icon: category.icon,
      },
      create: {
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
    });
    console.log(
      `Created main category: ${mainCategory.name} with icon: ${mainCategory.icon}`
    );

    // Create subcategories
    for (const subcategory of category.subcategories) {
      const sub = await prisma.category.upsert({
        where: { name: subcategory.name },
        update: {
          description: subcategory.description,
          icon: subcategory.icon,
          parentId: mainCategory.id,
        },
        create: {
          name: subcategory.name,
          description: subcategory.description,
          icon: subcategory.icon,
          parentId: mainCategory.id,
        },
      });
      console.log(
        `Created subcategory: ${sub.name} under ${mainCategory.name}`
      );
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
