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

export interface EditableCellProps {
  tableId: string;
  rowId: string;
  columnId: string;
  columnType: string;
  initialValue: string;
  isFirstRow?: boolean;
  isFirstCol?: boolean;
  isLastCol?: boolean;
  search?: string;
  isActiveSearchMatch?: boolean;
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

export type QueryInput = { tableId: string; limit?: number; [key: string]: unknown };

export type ViewData = {
  id: string;
  search: string | null;
  filters: { columnId: string; operator: string; value: string | null }[];
  sorts: { columnId: string; direction: string }[];
  hiddenColumns: { columnId: string }[];
};

export type ViewUpdatePayload = {
  id: string;
  search?: string | null;
  name?: string;
  order?: number;
  filters?: { columnId: string; operator: "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt"; value?: string | null }[];
  sorts?: { columnId: string; direction: "asc" | "desc"; order?: number }[];
  hiddenColumns?: string[];
};

export type RowFilter = {
  columnId: string;
  operator: string;
  value?: string | number;
};