"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "~/trpc/react";
import { useTableVirtualizer } from "~/components/VirtualizedTable";
import type { EditableCellProps } from "~/types/Props";

// Survives component remounts — stores edited values until server data catches up
const pendingEdits = new Map<string, string>();

const BORDER_COLOR = "rgb(22, 110, 225)";

function HighlightedText({ text, search }: { text: string; search: string }) {
  if (!search) return <>{text}</>;
  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="text-inherit rounded-sm" style={{ backgroundColor: "var(--cell-background-searchMatch)" }}>{part}</mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function EditableCell({
  tableId,
  rowId,
  columnId,
  columnType,
  initialValue,
  isFirstRow,
  isFirstCol,
  isLastCol,
  search,
  isActiveSearchMatch,
  isFiltered,
  isSorted,
}: EditableCellProps) {
  const cellKey = `${rowId}:${columnId}`;

  const [value, setValue] = useState(
    () => pendingEdits.get(cellKey) ?? initialValue,
  );
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigatingRef = useRef(false);
  const wasFocusedRef = useRef(false);
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

  const virtualizer = useTableVirtualizer();
  const updateCell = api.row.updateCell.useMutation({
    onSettled: () => {
      void utils.row.getByTable.invalidate({ tableId });
    },
  });

  const save = () => {
    if (value !== initialValue) {
      pendingEdits.set(cellKey, value);
      const coerced = columnType === "NUMBER" && value !== "" ? Number(value) : value;
      updateCell.mutate({ rowId, columnId, value: coerced });
    }
  };

  const focusCellAtIndex = useCallback((container: Element, targetIndex: number) => {
    const targetRow = container.querySelector<HTMLElement>(`tr[data-index="${targetIndex}"]`);
    const nextInput = targetRow?.querySelector<HTMLInputElement>(`input[data-col-id="${columnId}"]`);
    if (nextInput) {
      nextInput.focus();
      return true;
    }
    return false;
  }, [columnId]);

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

    if (targetIndex < 0 || (virtualizer && targetIndex >= virtualizer.rowCount)) {
      return false;
    }

    // Try to focus directly if the row is already rendered
    if (focusCellAtIndex(container, targetIndex)) {
      return true;
    }

    // Row isn't rendered — scroll to it and retry after render
    if (virtualizer) {
      virtualizer.scrollToIndex(targetIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          focusCellAtIndex(container, targetIndex);
        });
      });
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
    if (e.key === "Escape") {
      if (editing) {
        // Exit editing mode but stay focused/selected
        setEditing(false);
      } else {
        // Exit cell entirely
        setValue(initialValue);
        e.currentTarget.blur();
      }
      e.preventDefault();
      return;
    }

    // Enter editing mode on any printable key when selected but not editing
    if (!editing && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setEditing(true);
      setValue(e.key);
      e.preventDefault();
      return;
    }

    // Enter starts editing if not already, otherwise navigates down
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(e.currentTarget, "down");
      return;
    }

    // Tab always navigates
    if (e.key === "Tab") {
      e.preventDefault();
      navigate(e.currentTarget, e.shiftKey ? "left" : "right");
      return;
    }

    // Arrow keys only navigate when not editing
    if (!editing) {
      const arrowMap: Record<string, "up" | "down" | "left" | "right"> = {
        ArrowDown: "down",
        ArrowUp: "up",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      const direction = arrowMap[e.key];
      if (direction) {
        e.preventDefault();
        navigate(e.currentTarget, direction);
      }
    }
  };

  const isSearchMatch = !focused && !!search && !!value && value.toLowerCase().includes(search.toLowerCase());

  const cellBg = isFiltered ? "#ebfbec" : isSorted ? "#fff2ea" : undefined;

  return (
    <>
      {cellBg && !focused && (
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: cellBg }} />
      )}
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
      {isSearchMatch && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: isActiveSearchMatch ? "var(--cell-background-foundCursor)" : "var(--cell-background-found)" }}
        />
      )}
      {!focused && search && value ? (
        <div className="absolute inset-0 flex items-center px-1.5 pointer-events-none truncate text-sm">
          <span className="truncate">
            <HighlightedText text={value} search={search} />
          </span>
        </div>
      ) : null}
      <input
        data-col-id={columnId}
        className={`relative w-full bg-transparent outline-none truncate ${isFirstCol && focused ? "text-[rgb(22,110,225)]" : ""} ${!focused && search && value ? "text-transparent" : ""}`}
        style={focused && !editing ? { caretColor: "transparent" } : undefined}
        readOnly={!editing}
        inputMode={columnType === "NUMBER" ? "decimal" : "text"}
        value={value}
        onChange={(e) => {
          if (!editing) return;
          const v = e.target.value;
          if (columnType === "NUMBER" && v !== "" && !/^-?\d*\.?\d*$/.test(v)) return;
          setValue(v);
        }}
        onFocus={() => setFocused(true)}
        onClick={() => { if (wasFocusedRef.current && !editing) setEditing(true); wasFocusedRef.current = true; }}
        onDoubleClick={() => setEditing(true)}
        onBlur={() => {
          setFocused(false);
          setEditing(false);
          wasFocusedRef.current = false;
          if (navigatingRef.current) {
            navigatingRef.current = false;
            save();
            return;
          }
          save();
        }}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </>
  );
}
