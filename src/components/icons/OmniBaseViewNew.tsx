const BIT_PATH = "M0 7.68C0 4.99175 2.38419e-07 3.64762 0.523169 2.62085C0.983361 1.71767 1.71767 0.983361 2.62085 0.523169C3.64762 0 4.99175 0 7.68 0H8.32C11.0083 0 12.3524 0 13.3792 0.523169C14.2823 0.983361 15.0166 1.71767 15.4768 2.62085C16 3.64762 16 4.99175 16 7.68V8.32C16 11.0083 16 12.3524 15.4768 13.3792C15.0166 14.2823 14.2823 15.0166 13.3792 15.4768C12.3524 16 11.0083 16 8.32 16H7.68C4.99175 16 3.64762 16 2.62085 15.4768C1.71767 15.0166 0.983361 14.2823 0.523169 13.3792C2.38419e-07 12.3524 0 11.0083 0 8.32V7.68Z";

const STEP = 360 / 11;
const ANGLES = Array.from({ length: 11 }, (_, i) => i * STEP);

const TRANSITION = "color 0.2s ease-in-out, opacity 0.2s ease-in-out, rotate 0.2s ease-in-out, scale 0.2s ease-in-out, transform 0.2s ease-in-out, translate 0.2s ease-in-out, border-radius 0.2s ease-in-out";

const OMNI_CSS = `
  .omni-icon .ring,
  .omni-icon .bit,
  .omni-icon .eye-container,
  .omni-icon .eye {
    transition: ${TRANSITION};
  }
  .omni-icon .ring {
    transform-origin: 80px 80px;
  }
  .omni-icon .ring.inner {
    transform: rotate(0deg);
  }
  .omni-icon .ring.middle {
    transform: rotate(16.3636deg);
  }
  .omni-icon .ring.outer {
    transform: rotate(32.7273deg);
  }
  .omni-icon .spoke {
    transform-origin: 80px 80px;
  }
  .omni-icon .bit {
    transform-origin: 8px 8px;
    color: inherit;
    opacity: 0.2;
    transform: scale(0) translate(0px, 32px);
  }
  .omni-icon .ring.inner .bit {
    opacity: 0.2;
    transform: scale(1) translate(0px, 32px);
  }
  .omni-icon .ring.middle .bit {
    opacity: 0.4;
    transform: scale(1) translate(0px, 32px);
  }
  .omni-icon .ring.outer .bit {
    opacity: 1;
    transform: scale(1) translate(0px, 32px);
  }
  .omni-icon .eye {
    color: inherit;
    opacity: 1;
    transform: scale(1, 0);
    transform-origin: 8px 8px;
  }
`;

function Ring({ ring }: { ring: "inner" | "middle" | "outer" }) {
  return (
    <g className={`ring ${ring}`}>
      {ANGLES.map((angle, i) => (
        <g key={i} className="spoke" transform={`rotate(${angle})`}>
          <g className="bit-container" transform="translate(72, 0)">
            <path className="bit" d={BIT_PATH} fill="currentColor" />
          </g>
        </g>
      ))}
    </g>
  );
}

export function OmniBaseViewNew() {
  return (
    <div
      className="flex h-full items-center justify-center rounded-full"
      style={{ backgroundColor: "transparent", opacity: 1, width: 28 }}
    >
      <svg
        className="omni-icon static"
        height="36"
        viewBox="0 0 160 160"
        width="36"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "var(--colors-foreground-default)" }}
      >
        <style>{OMNI_CSS}</style>
        <g transform="scale(0.9090909090909091)" style={{ transformOrigin: "center center" }}>
          <Ring ring="inner" />
          <Ring ring="middle" />
          <Ring ring="outer" />
          <g className="eyes">
            <g className="eye-container" transform="translate(48, 72)">
              <path className="eye" d={BIT_PATH} fill="currentColor" />
            </g>
            <g className="eye-container" transform="translate(96, 72)">
              <path className="eye" d={BIT_PATH} fill="currentColor" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
