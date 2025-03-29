import { fakerJA } from "@faker-js/faker";
import { reset, seed } from "drizzle-seed";
import { ulid } from "ulid";

import * as schema from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";

const faker = fakerJA;

async function main() {
  await reset(db, schema);
  await seed(db, schema).refine((f) => {
    const id = ulid();
    return {
      usersTable: {
        count: 1,
        columns: {
          id: f.default({ defaultValue: id }),
          name: f.default({ defaultValue: faker.book.author() }),
          imageUrl: f.default({
            defaultValue: "https://placehold.co/100x150",
          }),
        },
      },
      booksTable: {
        count: 10,
        columns: {
          title: f.default({ defaultValue: faker.book.title() }),
          description: f.default({
            defaultValue: faker.lorem.lines({ min: 1, max: 1 }),
          }),
          user_id: f.default({ defaultValue: id }),
          cover: f.default({ defaultValue: "https://placehold.co/100x150" }),
          content: f.default({
            defaultValue: faker.lorem.lines({ min: 1, max: 1 }),
          }),
        },
      },
    };
  });
}

main();
