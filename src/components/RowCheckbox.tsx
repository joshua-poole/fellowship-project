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
        border: `1px solid ${checked ? ACTIVE_COLOR : "#d0d0d0"}`,
        boxSizing: "content-box",
      }}
    >
      {checked && (
        <div className="checkbox flex items-center justify-center text-white">
          <svg width="9" height="9" viewBox="0 0 16 16" style={{ shapeRendering: "geometricPrecision" }} className="flex-none" aria-hidden="true">
            <use fill="currentColor" href="/icons/icon_definitions.svg#CheckBold" />
          </svg>
        </div>
      )}
    </div>
  );
}
