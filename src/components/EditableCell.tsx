"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "~/trpc/react";

// Survives component remounts — stores edited values until server data catches up
const pendingEdits = new Map<string, string>();

interface EditableCellProps {
  tableId: string;
  rowId: string;
  columnId: string;
  initialValue: string;
}

export function EditableCell({
  tableId,
  rowId,
  columnId,
  initialValue,
}: EditableCellProps) {
  const cellKey = `${rowId}:${columnId}`;

  const [value, setValue] = useState(
    () => pendingEdits.get(cellKey) ?? initialValue,
  );
  const [focused, setFocused] = useState(false);
  const navigatingRef = useRef(false);
  const utils = api.useUtils();

  // Sync value from pending edits or server data when not focused
  useEffect(() => {
    if (!focused) {
      const pending = pendingEdits.get(cellKey);
      setValue(pending ?? initialValue);
    }
  }, [initialValue, focused, cellKey]);

  // Clear pending edit when server data catches up
  useEffect(() => {
    const pending = pendingEdits.get(cellKey);
    if (pending !== undefined && initialValue === pending) {
      pendingEdits.delete(cellKey);
    }
  }, [initialValue, cellKey]);

  const updateCell = api.row.updateCell.useMutation();

  const save = () => {
    if (value !== initialValue) {
      pendingEdits.set(cellKey, value);
      updateCell.mutate({ rowId, columnId, value });
    }
  };

  const focusAdjacentCell = (
    current: HTMLInputElement,
    direction: "up" | "down" | "left" | "right",
  ) => {
    const td = current.closest("td");
    const row = current.closest("tr");
    if (!td || !row) return false;

    if (direction === "left" || direction === "right") {
      const sibling =
        direction === "left"
          ? td.previousElementSibling
          : td.nextElementSibling;
      const nextInput = sibling?.querySelector<HTMLInputElement>(
        "input[data-col-id]",
      );
      if (nextInput) {
        nextInput.focus();
        return true;
      }
      return false;
    }

    const currentIndex = Number(row.getAttribute("data-index"));
    const container = row.closest("tbody");
    if (!container) return false;

    const targetIndex =
      direction === "down" ? currentIndex + 1 : currentIndex - 1;
    const targetRow = container.querySelector<HTMLElement>(
      `tr[data-index="${targetIndex}"]`,
    );
    const nextInput = targetRow?.querySelector<HTMLInputElement>(
      `input[data-col-id="${columnId}"]`,
    );
    if (nextInput) {
      nextInput.focus();
      return true;
    }
    return false;
  };

  const navigate = (
    input: HTMLInputElement,
    direction: "up" | "down" | "left" | "right",
  ) => {
    navigatingRef.current = true;
    if (!focusAdjacentCell(input, direction)) {
      navigatingRef.current = false;
      input.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const directionMap: Record<string, "up" | "down" | "left" | "right"> = {
      Enter: "down",
      ArrowDown: "down",
      ArrowUp: "up",
      ArrowLeft: "left",
      ArrowRight: "right",
      Tab: "right",
    };

    const direction = directionMap[e.key];
    if (direction) {
      e.preventDefault();
      navigate(e.currentTarget, direction);
      return;
    }

    if (e.key === "Escape") {
      setValue(initialValue);
      e.currentTarget.blur();
    }
  };

  return (
    <input
      data-col-id={columnId}
      className={`w-full bg-transparent outline-none truncate ${
        focused ? "ring-1 ring-blue-500 rounded-sm px-0.5 -mx-0.5" : ""
      }`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        if (navigatingRef.current) {
          navigatingRef.current = false;
          save();
          return;
        }
        save();
        setTimeout(() => {
          void utils.row.getByTable.invalidate({ tableId });
        }, 300);
      }}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
}
