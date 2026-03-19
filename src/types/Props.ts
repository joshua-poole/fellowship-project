import type React from "react";
import type z from "zod";
import type { RowGetByTableInputSchema } from "./schemas/row";

export interface AppSidebarProps {
  session: { user?: { id?: string; name?: string | null; email?: string | null } } | null | undefined;
  onSignOut: () => void;
}

export interface BaseNavbarProps {
  base: { name: string };
  baseId: string;
  baseColor: string | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRenameBase: (name: string) => void;
  onColorChange: (color: string) => void;
  onDeleteBase: () => void;
}

export interface BasePopoverPanelProps {
  base: { name: string };
  selectedColor: string | null;
  onRename: (name: string) => void;
  onColorChange: (color: string) => void;
  onDelete: () => void;
}


export interface TableTabsBarProps {
  tables: { id: string; name: string; order: number }[];
  activeTableId: string | undefined;
  baseColor: string | null;
  onSelectTable: (id: string) => void;
  onCreateTable: () => void;
  onDeleteTable: (id: string, name: string) => void;
  isCreating: boolean;
}

interface ViewFilter {
  columnId: string;
  operator: string;
  value?: string | number | null;
  conjunction?: "and" | "or";
}

interface ViewSort {
  columnId: string;
  direction: "asc" | "desc";
}

export type ColDef = { id: string; name: string; type: string; order: number };

export interface VirtualizedTableProps {
  tableId: string;
  columns: ColDef[];
  rowCount: number;
  search?: string;
  searchMatchIndex?: number;
  onSearchMatchCountChange?: (total: number) => void;
  filters?: ViewFilter[];
  sorts?: ViewSort[];
  onAddSort?: (columnId: string, direction: "asc" | "desc") => void;
  onAddFilter?: (columnId: string) => void;
  onHideColumn?: (columnId: string) => void;
}

export type TableQueryInput = z.infer<typeof RowGetByTableInputSchema>;

export interface TableVirtualizerContextValue {
  scrollToIndex: (index: number) => void;
  navigateToCell: (rowIndex: number, columnId: string) => void;
  rowCount: number;
  queryInput: TableQueryInput;
}

type ViewItem = {
  id: string;
  name: string;
  type: string;
  order: number;
};

export interface ViewsSidebarProps {
  views: ViewItem[];
  activeViewId: string | undefined;
  onSelectView: (id: string) => void;
  onCreateView: () => void;
  onRenameView: (id: string, name: string) => void;
  onDeleteView: (id: string) => void;
  isCreating: boolean;
}

export type RowData = { id: string; order: number; values: Record<string, string | number> };

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
}

export interface VirtualizerReturn {
  getVirtualItems: () => VirtualItem[];
  getTotalSize: () => number;
  scrollToIndex: (index: number, opts?: { align?: "auto" | "center" | "start" | "end" }) => void;
  /** If true, items are positioned relative to firstItemStart and a wrapper transform is used */
  needsWrapperTransform: boolean;
  /** Ref for the row wrapper div — scaled modes set its transform via DOM */
  rowContainerRef: React.RefObject<HTMLDivElement | null>;
  /** Virtual start of the first rendered item */
  firstItemStart: number;
}

export type QueryInput = { tableId: string; limit?: number; [key: string]: unknown };

export type ViewData = {
  id: string;
  search: string | null;
  filters: { columnId: string; operator: string; value: string | null; conjunction?: string | null }[];
  sorts: { columnId: string; direction: string }[];
  hiddenColumns: { columnId: string }[];
};

export type ViewUpdatePayload = {
  id: string;
  search?: string | null;
  name?: string;
  order?: number;
  filters?: { columnId: string; operator: "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt"; value?: string | null; conjunction?: "and" | "or" }[];
  sorts?: { columnId: string; direction: "asc" | "desc"; order?: number }[];
  hiddenColumns?: string[];
};

export type RowFilter = {
  columnId: string;
  operator: string;
  value?: string | number;
  conjunction?: "and" | "or";
};

export interface EditableCellProps {
  rowId: string;
  columnId: string;
  columnType: string;
  initialValue: string;
  isFirstRow: boolean;
  isFirstCol: boolean;
  isLastCol: boolean;
  search: string | undefined;
  isActiveSearchMatch: boolean;
  isFiltered: boolean;
  isSorted: boolean;
  isColumnSelected?: boolean;
  rowIndex: number;
  rowCount: number;
  onSaveCell: (rowId: string, columnId: string, value: string | number) => void;
  onNavigateToCell: (rowIndex: number, columnId: string) => void;
  onClearColumnSelection?: () => void;
}

export interface ColumnHeaderCellProps {
  col: ColDef;
  columns: ColDef[];
  tableId: string;
  isFirstCol: boolean;
  editingColumnId: string | null;
  setEditingColumnId: (id: string | null) => void;
  onCreateColumn: (input: { tableId: string; name: string; type: "TEXT" | "NUMBER"; order?: number }) => void;
  onUpdateColumn: (input: { id: string; name: string; type: "TEXT" | "NUMBER" }) => void;
  onDeleteColumn: (input: { id: string }) => void;
  onAddSort?: (columnId: string, direction: "asc" | "desc") => void;
  onAddFilter?: (columnId: string) => void;
  onHideColumn?: (columnId: string) => void;
  onSelectColumn?: (columnId: string) => void;
  search?: string;
  isActiveSearchMatch?: boolean;
}