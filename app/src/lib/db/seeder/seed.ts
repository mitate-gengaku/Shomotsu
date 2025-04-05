import { fakerJA, fakerEN } from "@faker-js/faker";
import { reset } from "drizzle-seed";
import { ulid } from "ulid";

import * as schema from "@/lib/db/schema/schema";
import { db } from "@/lib/db/setup/drizzle";
import { BookType, CategoryType, UserType } from "@/lib/db/types/type";

const fakerJa = fakerJA;
const fakerEn = fakerEN;

const userId = "01JQH2NCNS83JKMSCCWE4TGK5T";
const categoryLength = 3;

const users: UserType[] = Array.from({ length: 3 }, (_, i) => ({
  id: i === 0 ? userId : ulid(),
  name: fakerJa.person.fullName(),
  email: fakerJa.internet.email(),
  imageUrl: fakerJa.image.avatar(),
}));

const categories: CategoryType[] = Array.from(
  { length: categoryLength },
  () => ({
    id: ulid(),
    category: fakerEn.word.noun(),
    label: fakerJa.lorem.word(),
  }),
);

const randomCategoryId = Math.floor(Math.random() * categoryLength);

const books: BookType[] = users
  .map(({ id }) => {
    return [
      ...Array.from({ length: 10 }, () => ({
        id: ulid(),
        userId: id,
        categoryId: categories[randomCategoryId].id,
        title: fakerJa.lorem.word(16),
        description: fakerJa.lorem.paragraph(5),
        slug: fakerEn.lorem.slug(),
        content: fakerJa.lorem.paragraph(),
        toc: [
          "AI技術の現状と展望",
          "教育分野におけるAI活用",
          "医療・ヘルスケアの革新",
          "スマートシティと交通システム",
          "環境問題とAIソリューション",
          "倫理的な課題と対応",
        ],
        cover: fakerJA.image.url({ width: 100, height: 150 }),
        publish: fakerJa.datatype.boolean(),
      })),
    ];
  })
  .flat();

async function main() {
  await reset(db, schema);

  // await db.insert(schema.usersTable).values(users);
  // await db.insert(schema.categoriesTable).values(categories);
  // await db.insert(schema.booksTable).values(books)
}

main();
