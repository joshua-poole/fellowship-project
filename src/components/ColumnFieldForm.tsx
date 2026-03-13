"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { ALargeSmall, Hash } from "lucide-react";

const COLUMN_TYPES = [
  { value: "TEXT", label: "Text", icon: ALargeSmall },
  { value: "NUMBER", label: "Number", icon: Hash },
] as const;

export type ColumnTypeValue = typeof COLUMN_TYPES[number]["value"];

export function ColumnFieldForm({
  defaultName,
  defaultType,
  onSave,
  onCancel,
}: {
  defaultName: string;
  defaultType?: ColumnTypeValue;
  onSave: (name: string, type: ColumnTypeValue) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(defaultName);
  const [type, setType] = useState<ColumnTypeValue>(defaultType ?? "TEXT");

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), type);
  };

  return (
    <>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") onCancel();
        }}
        placeholder="Field name"
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <Select value={type} onValueChange={(v) => setType(v as ColumnTypeValue)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COLUMN_TYPES.map((ct) => (
            <SelectItem key={ct.value} value={ct.value}>
              <ct.icon className="h-3.5 w-3.5 inline-block mr-2 text-gray-500" />
              {ct.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
}
