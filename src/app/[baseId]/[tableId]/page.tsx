"use client";

import { use } from "react";
import { TableView } from "~/components/TableView";

export default function TablePage({
  params,
}: {
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  const { baseId, tableId } = use(params);

  return <TableView baseId={baseId} tableId={tableId} />;
}
