"use client";

import { use } from "react";
import { BaseView } from "~/components/BaseView";

export default function TablePage({
  params,
}: {
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  const { baseId, tableId } = use(params);

  return <BaseView baseId={baseId} tableId={tableId} />;
}
