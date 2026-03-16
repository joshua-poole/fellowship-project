"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import type { TableQueryInput } from "~/types/Props";

const BATCH_SIZE = 10000;

export function BulkCreateInput({ queryInput }: { queryInput: TableQueryInput }) {
  const [count, setCount] = useState(100000);
  const [progress, setProgress] = useState(0);
  const [isInserting, setIsInserting] = useState(false);
  const utils = api.useUtils();

  const bulkCreate = api.row.bulkCreate.useMutation({
    onSuccess: (_data, vars) => {
      utils.table.getById.setData({ id: vars.tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) + vars.count };
      });
    },
  });

  const handleBulkInsert = async () => {
    setIsInserting(true);
    setProgress(0);
    let inserted = 0;
    const start = performance.now();

    while (inserted < count) {
      const batch = Math.min(BATCH_SIZE, count - inserted);
      const batchStart = performance.now();

      await bulkCreate.mutateAsync({
        tableId: queryInput.tableId,
        count: batch
      });

      inserted += batch;
      setProgress(Math.round((inserted / count) * 100));
      console.log(`Batch ${batch} rows: ${(performance.now() - batchStart).toFixed(0)}ms`);
    }

    console.log(`Insert total: ${(performance.now() - start).toFixed(0)}ms`);
    const refetchStart = performance.now();
    await utils.row.getByTable.invalidate();
    console.log(`Refetch: ${(performance.now() - refetchStart).toFixed(0)}ms`);
    console.log(`Total: ${(performance.now() - start).toFixed(0)}ms`);
    setIsInserting(false);
  };

  return (
    <div className="flex items-center gap-1 px-2 ml-auto">
      <input
        type="number"
        min={1}
        max={100000}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-20 px-2 py-0.5 text-xs border border-(--colors-border-default) rounded-sm outline-none"
        disabled={isInserting}
      />
      <button
        className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors whitespace-nowrap rounded-sm"
        onClick={handleBulkInsert}
        disabled={isInserting || count < 1}
      >
        {isInserting ? `Inserting rows... ${progress}%` : `+ Add rows`}
      </button>
    </div>
  );
}
