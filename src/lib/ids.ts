import { createId } from "@paralleldrive/cuid2";
import { randomUUID } from "crypto";

export const baseId = () => `app${createId()}`;
export const tableId = () => `tbl${createId()}`;
export const columnId = () => `fld${createId()}`;
export const rowId = () => `rec${createId()}`;
export const viewId = () => `viw${createId()}`;
export const viewFilterId = () => `vfl${createId()}`;
export const viewSortId = () => `vsr${createId()}`;
export const viewHiddenColumnId = () => `vhc${createId()}`;

/** Fast ID for bulk inserts where cuid2's collision resistance isn't needed */
export const rowIdFast = () => `rec${randomUUID().replace(/-/g, "")}`;
