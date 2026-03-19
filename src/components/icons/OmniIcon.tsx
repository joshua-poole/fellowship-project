import type React from "react";

interface OmniIconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  innerOpacity?: number;
}

export function OmniIcon({
  className,
  style,
  size = 20,
  innerRadius = 50,
  outerRadius = 65,
  innerOpacity = 1,
}: OmniIconProps = {}) {
  const bit =
    "M0 7.68C0 4.99175 2.38419e-07 3.64762 0.523169 2.62085C0.983361 1.71767 1.71767 0.983361 2.62085 0.523169C3.64762 0 4.99175 0 7.68 0H8.32C11.0083 0 12.3524 0 13.3792 0.523169C14.2823 0.983361 15.0166 1.71767 15.4768 2.62085C16 3.64762 16 4.99175 16 7.68V8.32C16 11.0083 16 12.3524 15.4768 13.3792C15.0166 14.2823 14.2823 15.0166 13.3792 15.4768C12.3524 16 11.0083 16 8.32 16H7.68C4.99175 16 3.64762 16 2.62085 15.4768C1.71767 15.0166 0.983361 14.2823 0.523169 13.3792C2.38419e-07 12.3524 0 11.0083 0 8.32V7.68Z";

  const spokeAngles = [
    0, 32.72727272727273, 65.45454545454545, 98.18181818181819,
    130.9090909090909, 163.63636363636363, 196.36363636363637,
    229.0909090909091, 261.8181818181818, 294.54545454545456,
    327.27272727272725,
  ];

  const globalRotation = -106.36;

  const renderRing = (ringClass: string, radius: number, offset: number, opacity = 1) => (
    <g className={`ring ${ringClass}`} opacity={opacity}>
      {spokeAngles.map((angle) => {
        const a = angle + offset;
        const counterRotate = -(a + globalRotation);
        return (
          <g key={angle} className="spoke" transform={`rotate(${a})`}>
            <g className="bit-container" transform={`translate(${radius}, -8) rotate(${counterRotate}, 8, 8)`}>
              <path className="bit" d={bit} fill="currentColor" />
            </g>
          </g>
        );
      })}
    </g>
  );

  return (
    <svg
      className={className ?? "staticSimple"}
      height={size}
      viewBox="0 0 160 160"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      style={style ?? { color: "var(--colors-hyperlink-primary)" }}
    >
      <g
        transform="scale(0.9090909090909091)"
        style={{ transformOrigin: "center center" }}
      >
        <g transform="translate(80, 80) rotate(-106.36)">
          {renderRing("middle", innerRadius, 0, innerOpacity)}
          {renderRing("outer", outerRadius, 16.36)}
        </g>
      </g>
    </svg>
  );
}
