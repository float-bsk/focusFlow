import React from "react";

const StopCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="256"
    height="256"
    fill="currentColor"
    {...props}
  >
    <g transform="translate(1.4 1.4) scale(2.81)">
      <path
        d="M45 32c-1.104 0-2-.896-2-2V18.595c0-1.104.896-2 2-2s2 .896 2 2V30c0 1.104-.896 2-2 2z"
        fill="currentColor"
      />
      <path
        d="M45 71c-14.336 0-26-11.663-26-26 0-9.587 5.251-18.366 13.704-22.912.973-.525 2.186-.158 2.708.814.523.973.159 2.186-.814 2.708C27.444 29.458 23 36.888 23 45c0 12.131 9.869 22 22 22s22-9.869 22-22c0-8.112-4.444-15.542-11.599-19.389-.973-.523-1.337-1.736-.814-2.708.522-.972 1.733-1.339 2.709-.814C65.749 26.634 71 35.414 71 45c0 14.337-11.663 26-26 26z"
        fill="currentColor"
      />
      <path
        d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45S69.813 90 45 90zM45 4C22.393 4 4 22.393 4 45s18.393 41 41 41 41-18.393 41-41S67.607 4 45 4z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default StopCircleIcon;
