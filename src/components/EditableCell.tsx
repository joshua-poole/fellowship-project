"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import type { EditableCellProps } from "~/types/Props";

// Survives component remounts — stores edited values until server data catches up
const pendingEdits = new Map<string, string>();

// Module-level active cell position — survives unmount/remount from virtualization
let activeCell: { rowIndex: number; columnId: string } | null = null;
export function setActiveCell(rowIndex: number, columnId: string) {
  activeCell = { rowIndex, columnId };
}
export function clearActiveCell() {
  activeCell = null;
}

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


export const EditableCell = React.memo(function EditableCell({
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
  rowIndex: _rowIndex,
  rowCount,
  onSaveCell,
  onNavigateToCell,
  onClearColumnSelection,
}: EditableCellProps) {
  const cellKey = `${rowId}:${columnId}`;

  const [value, setValue] = useState(
    () => pendingEdits.get(cellKey) ?? initialValue,
  );
  const [focused, setFocused] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasFocusedRef = useRef(false);

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

  // Restore focus when this cell mounts as the active cell
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    if (!activeCell) return;
    const row = inputRef.current?.closest("[data-index]");
    const idx = row ? Number(row.getAttribute("data-index")) : -1;
    if (activeCell.columnId === columnId && idx === activeCell.rowIndex) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus({ preventScroll: true });
      }
    }
  });

  const save = () => {
    if (value !== initialValue) {
      pendingEdits.set(cellKey, value);
      const coerced = columnType === "NUMBER" && value !== "" ? Number(value) : value;
      onSaveCell(rowId, columnId, coerced);
    }
  };

  const focusAdjacentCell = (
    current: HTMLInputElement,
    direction: "up" | "down" | "left" | "right",
  ) => {
    const cell = current.closest("[data-col]");
    const row = current.closest("[data-index]");
    if (!cell || !row) return false;

    if (direction === "left" || direction === "right") {
      const sibling =
        direction === "left"
          ? cell.previousElementSibling
          : cell.nextElementSibling;
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
    const targetIndex =
      direction === "down" ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex < 0 || targetIndex >= rowCount) {
      return false;
    }

    // Try direct DOM focus first (target is likely within overscan)
    const container = row.parentElement;
    if (container) {
      const targetRow = container.querySelector<HTMLElement>(`[data-index="${targetIndex}"]`);
      const nextInput = targetRow?.querySelector<HTMLInputElement>(`input[data-col-id="${columnId}"]`);
      if (nextInput && targetRow) {
        nextInput.focus({ preventScroll: true });
        targetRow.scrollIntoView({ block: "nearest" });
        return true;
      }
    }

    // Target not in DOM — set activeCell and scroll
    onNavigateToCell(targetIndex, columnId);
    return true;
  };

  const navigate = (
    input: HTMLInputElement,
    direction: "up" | "down" | "left" | "right",
  ) => {
    onClearColumnSelection?.();
    focusAdjacentCell(input, direction);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (editing) {
        setEditing(false);
      } else {
        setValue(initialValue);
        clearActiveCell();
        e.currentTarget.blur();
      }
      e.preventDefault();
      return;
    }

    if (!editing && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setEditing(true);
      setValue(e.key);
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      navigate(e.currentTarget, "down");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      navigate(e.currentTarget, e.shiftKey ? "left" : "right");
      return;
    }

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
          style={{ backgroundColor: isActiveSearchMatch
            ? (isFiltered ? "#ebd978" : isSorted ? "#ffd177" : "var(--cell-background-foundCursor)")
            : (isFiltered ? "#ebe6a7" : isSorted ? "#ffdea5" : "var(--cell-background-found)")
          }}
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
        ref={inputRef}
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
        onFocus={() => {
          setFocused(true);
          const row = inputRef.current?.closest("[data-index]");
          if (row) {
            activeCell = { rowIndex: Number(row.getAttribute("data-index")), columnId };
          }
        }}
        onClick={() => { if (wasFocusedRef.current && !editing) setEditing(true); wasFocusedRef.current = true; }}
        onDoubleClick={() => setEditing(true)}
        onBlur={(e) => {
          setFocused(false);
          setEditing(false);
          wasFocusedRef.current = false;
          save();
          const related = e.relatedTarget as HTMLElement | null;
          if (related !== null) {
            activeCell = null;
          }
        }}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </>
  );
});
