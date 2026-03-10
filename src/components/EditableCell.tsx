"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "~/trpc/react";

// Survives component remounts — stores edited values until server data catches up
const pendingEdits = new Map<string, string>();

const BORDER_COLOR = "rgb(22, 110, 225)";

interface EditableCellProps {
  tableId: string;
  rowId: string;
  columnId: string;
  initialValue: string;
  isFirstRow?: boolean;
  isFirstCol?: boolean;
  isLastCol?: boolean;
}

export function EditableCell({
  tableId,
  rowId,
  columnId,
  initialValue,
  isFirstRow,
  isFirstCol,
  isLastCol,
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
    <>
      {focused && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: isFirstRow ? 0 : -2,
            bottom: -2,
            left: isFirstCol ? 0 : -2,
            right: isLastCol ? 0 : -2,
            borderTop: isFirstRow ? "none" : `2px solid ${BORDER_COLOR}`,
            borderBottom: `2px solid ${BORDER_COLOR}`,
            borderLeft: isFirstCol ? "none" : `2px solid ${BORDER_COLOR}`,
            borderRight: `2px solid ${BORDER_COLOR}`,
            zIndex: 10,
          }}
        />
      )}
      <input
        data-col-id={columnId}
        className={`w-full bg-transparent outline-none truncate ${focused ? "text-[rgb(22,110,225)]" : ""}`}
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
    </>
  );
}
