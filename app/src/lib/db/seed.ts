import { fakerJA } from "@faker-js/faker";
import { reset } from "drizzle-seed";
import { ulid } from "ulid";

import { categories as baseCategories } from "@/lib/db/categories";
import { db } from "@/lib/db/drizzle";
import * as schema from "@/lib/db/schema";
import { CategoryType, UserType } from "@/lib/db/type";

const fakerJa = fakerJA;
// const fakerEn = fakerEN;

const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";
// const categoryLength = baseCategories.length;

const users: UserType[] = Array.from({ length: 3 }, (_, i) => ({
  id: i === 0 ? userId : ulid(),
  name: fakerJa.person.fullName(),
  email: fakerJa.internet.email(),
  imageUrl: fakerJa.image.avatar(),
}));

const categories: CategoryType[] = baseCategories.map((v) => ({
  ...v,
  id: ulid(),
}));

async function main() {
  await reset(db, schema);

  await db.insert(schema.usersTable).values(users);
  await db.insert(schema.categoriesTable).values(categories);
}

main();
