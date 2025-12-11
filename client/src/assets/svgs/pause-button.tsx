import React from "react";

const PauseCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="256"
    height="256"
    {...props}
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
        d="M38.899 67.5H25.523c-1.104 0-2-0.896-2-2v-41c0-1.104 0.896-2 2-2h13.376c1.104 0 2 0.896 2 2v41C40.899 66.604 40.004 67.5 38.899 67.5zM27.523 63.5h9.376v-37h-9.376V63.5z"
        fill="currentColor"
      />
      <path
        d="M64.477 67.5H51.101c-1.104 0-2-0.896-2-2v-41c0-1.104 0.896-2 2-2h13.376c1.104 0 2 0.896 2 2v41C66.477 66.604 65.581 67.5 64.477 67.5zM53.101 63.5h9.376v-37h-9.376V63.5z"
        fill="currentColor"
      />
      <path
        d="M45 90C20.187 90 0 69.813 0 45C0 20.187 20.187 0 45 0c24.813 0 45 20.187 45 45C90 69.813 69.813 90 45 90zM45 4C22.393 4 4 22.393 4 45s18.393 41 41 41s41-18.393 41-41S67.607 4 45 4z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default PauseCircleIcon;
