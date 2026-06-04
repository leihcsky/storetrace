import { seedCatalog } from "../src/lib/db/seed-catalog";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }
  await seedCatalog();
  console.log("Catalog seeded successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
