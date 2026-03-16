import { Check } from "lucide-react";

const ACTIVE_COLOR = "rgb(22, 110, 225)";

export function RowCheckbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer flex items-center justify-center"
      onClick={onClick}
      style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        backgroundColor: checked ? ACTIVE_COLOR : "white",
        border: `1.5px solid ${checked ? ACTIVE_COLOR : "#d1d5db"}`,
        boxSizing: "content-box",
      }}
    >
      {checked && <Check style={{ width: 9, height: 9, color: "white", strokeWidth: 3 }} />}
    </div>
  );
}
