const BIT = "M0 7.68C0 4.99175 0 3.64762 0.523169 2.62085C0.983361 1.71767 1.71767 0.983361 2.62085 0.523169C3.64762 0 4.99175 0 7.68 0H8.32C11.0083 0 12.3524 0 13.3792 0.523169C14.2823 0.983361 15.0166 1.71767 15.4768 2.62085C16 3.64762 16 4.99175 16 7.68V8.32C16 11.0083 16 12.3524 15.4768 13.3792C15.0166 14.2823 14.2823 15.0166 13.3792 15.4768C12.3524 16 11.0083 16 8.32 16H7.68C4.99175 16 3.64762 16 2.62085 15.4768C1.71767 15.0166 0.983361 14.2823 0.523169 13.3792C0 12.3524 0 11.0083 0 8.32V7.68Z";

const STEP = 360 / 11;
const ANGLES = Array.from({ length: 11 }, (_, i) => i * STEP);
const HALF_STEP = STEP / 2;

const BIT_SCALE = 1.375; // 16 * 1.375 = 22
const BIT_OFFSET = (16 * BIT_SCALE) / 2; // center the scaled bit on the ring

function Ring({ scale, opacity, offset = 0 }: { scale: number; opacity: number; offset?: number }) {
  return (
    <g style={{ transformOrigin: "80px 80px", transform: `scale(${scale})`, opacity }}>
      {ANGLES.map((angle, i) => (
        <g key={i} transform={`rotate(${angle + offset} 80 80)`}>
          <g transform={`translate(${80 - BIT_OFFSET}, -12) scale(${BIT_SCALE})`}>
            <path d={BIT} fill="currentColor" />
          </g>
        </g>
      ))}
    </g>
  );
}

export function OmniBaseView() {
  return (
    <svg
      height="24"
      width="24"
      viewBox="-16 -16 192 192"
      xmlns="http://www.w3.org/2000/svg"
      className="group/omni"
    >
      <Ring scale={0.72} opacity={0.25} offset={HALF_STEP} />
      <Ring scale={1} opacity={1} />
      {/* Eyes — visible on hover */}
      <g className="opacity-0 group-hover/omni:opacity-100 transition-opacity">
        <g transform={`translate(${48 - 3}, ${72 - 3}) scale(${BIT_SCALE})`}>
          <path d={BIT} fill="currentColor" />
        </g>
        <g transform={`translate(${96 - 3}, ${72 - 3}) scale(${BIT_SCALE})`}>
          <path d={BIT} fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
