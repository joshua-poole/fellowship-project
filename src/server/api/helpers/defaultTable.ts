import { faker } from "@faker-js/faker";
import { columnId, rowId } from "~/lib/ids";

const DEFAULT_ROW_COUNT = 4;

type DefaultColumn = { id: string; name: string; type: "TEXT" | "NUMBER"; order: number };
type DefaultRow = { id: string; order: number; values: Record<string, string | number> };

export function createDefaultColumnsAndRows() {
  const nameColId = columnId();
  const notesColId = columnId();
  const statusColId = columnId();

  const columns: DefaultColumn[] = [
    { id: nameColId, name: "Name", type: "TEXT", order: 0 },
    { id: notesColId, name: "Notes", type: "TEXT", order: 1 },
    { id: statusColId, name: "Status", type: "NUMBER", order: 2 },
  ];

  const rows: DefaultRow[] = Array.from({ length: DEFAULT_ROW_COUNT }, (_, i) => ({
    id: rowId(),
    order: i,
    values: {
      [nameColId]: faker.person.fullName(),
      [notesColId]: faker.lorem.words({ min: 2, max: 5 }),
      [statusColId]: faker.number.int({ min: 1, max: 100 }),
    },
  }));

  return { columns, rows, rowCount: DEFAULT_ROW_COUNT };
}
