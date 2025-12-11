

export const HamburgerIcon = ({
  width = 24,
  height = 24,
  fill = "rgb(0,25,255)",
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={height}
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(1.4066 1.4066) scale(2.81 2.81)"
      >
        <path
          d="M86 21.571H4c-2.209 0-4-1.791-4-4s1.791-4 4-4h82c2.209 0 4 1.791 4 4s-1.791 4-4 4z"
          style={{
            fill,
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "round",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
        />
        <path
          d="M86 49H4c-2.209 0-4-1.791-4-4s1.791-4 4-4h82c2.209 0 4 1.791 4 4s-1.791 4-4 4z"
          style={{
            fill,
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "round",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
        />
        <path
          d="M86 76.429H4c-2.209 0-4-1.791-4-4s1.791-4 4-4h82c2.209 0 4 1.791 4 4s-1.791 4-4 4z"
          style={{
            fill,
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "round",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fillRule: "nonzero",
            opacity: 1,
          }}
        />
      </g>
    </svg>
  );
};
