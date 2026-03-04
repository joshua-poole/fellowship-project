import { createId } from "@paralleldrive/cuid2";

export const baseId = () => `app${createId()}`;
export const tableId = () => `tbl${createId()}`;
export const columnId = () => `fld${createId()}`;
export const rowId = () => `rec${createId()}`;
export const viewId = () => `viw${createId()}`;
export const viewFilterId = () => `vfl${createId()}`;
export const viewSortId = () => `vsr${createId()}`;
export const viewHiddenColumnId = () => `vhc${createId()}`;
