import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { faker } from "@faker-js/faker";
import { baseId, tableId, columnId, rowId, viewId } from "../src/lib/ids";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is required");

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

const SEED_USER_ID = "odi6Og2ubUlmyvTRw095SKNTxbxXXTQY";
const NUM_ROWS = 100;

async function main() {
  console.log("Seeding database...");

  const user = await db.user.findUniqueOrThrow({
    where: { id: SEED_USER_ID },
  });

  // Create a base
  const base = await db.base.create({
    data: {
      id: baseId(),
      name: "Employee Directory",
      userId: user.id,
    },
  });

  // --- Table 1: People ---
  const peopleTable = await db.table.create({
    data: {
      id: tableId(),
      name: "People",
      order: 0,
      baseId: base.id,
    },
  });

  const peopleColumns = await Promise.all([
    db.column.create({
      data: {
        id: columnId(),
        name: "Full Name",
        type: "TEXT",
        order: 0,
        tableId: peopleTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Email",
        type: "TEXT",
        order: 1,
        tableId: peopleTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Department",
        type: "TEXT",
        order: 2,
        tableId: peopleTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Salary",
        type: "NUMBER",
        order: 3,
        tableId: peopleTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Phone",
        type: "TEXT",
        order: 4,
        tableId: peopleTable.id,
      },
    }),
  ]);

  const peopleRows = Array.from({ length: NUM_ROWS }, (_, i) => ({
    id: rowId(),
    order: i,
    tableId: peopleTable.id,
    values: {
      [peopleColumns[0].id]: faker.person.fullName(),
      [peopleColumns[1].id]: faker.internet.email(),
      [peopleColumns[2].id]: faker.helpers.arrayElement([
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
        "Design",
        "Product",
      ]),
      [peopleColumns[3].id]: faker.number.int({ min: 50000, max: 200000 }),
      [peopleColumns[4].id]: faker.phone.number(),
    },
  }));

  await db.row.createMany({ data: peopleRows });

  await db.view.create({
    data: {
      id: viewId(),
      name: "Grid view",
      type: "grid",
      order: 0,
      tableId: peopleTable.id,
    },
  });

  console.log(
    `  Created "People" table with ${peopleColumns.length} columns and ${NUM_ROWS} rows`,
  );

  // --- Table 2: Projects ---
  const projectsTable = await db.table.create({
    data: {
      id: tableId(),
      name: "Projects",
      order: 1,
      baseId: base.id,
    },
  });

  const projectColumns = await Promise.all([
    db.column.create({
      data: {
        id: columnId(),
        name: "Project Name",
        type: "TEXT",
        order: 0,
        tableId: projectsTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Description",
        type: "TEXT",
        order: 1,
        tableId: projectsTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Status",
        type: "TEXT",
        order: 2,
        tableId: projectsTable.id,
      },
    }),
    db.column.create({
      data: {
        id: columnId(),
        name: "Budget",
        type: "NUMBER",
        order: 3,
        tableId: projectsTable.id,
      },
    }),
  ]);

  const projectRows = Array.from({ length: 50 }, (_, i) => ({
    id: rowId(),
    order: i,
    tableId: projectsTable.id,
    values: {
      [projectColumns[0].id]: faker.company.catchPhrase(),
      [projectColumns[1].id]: faker.lorem.sentence(),
      [projectColumns[2].id]: faker.helpers.arrayElement([
        "Not Started",
        "In Progress",
        "Review",
        "Complete",
      ]),
      [projectColumns[3].id]: faker.number.int({ min: 10000, max: 500000 }),
    },
  }));

  await db.row.createMany({ data: projectRows });

  await db.view.create({
    data: {
      id: viewId(),
      name: "Grid view",
      type: "grid",
      order: 0,
      tableId: projectsTable.id,
    },
  });

  console.log(
    `  Created "Projects" table with ${projectColumns.length} columns and 50 rows`,
  );

  console.log("Seeding complete!");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
