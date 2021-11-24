import { useColorMode } from "@theme-ui/color-modes";
import { IIconProps } from "./types";

export const LogoIcon: React.FC<IIconProps> = ({ size = 32 }) => {
  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#ffffff" : "#000000";
  return (
    <svg
      width={size}
      height={size / 1.23}
      viewBox="0 0 256 256"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="256" height="256" fill="none"></rect>
      <rect
        x="16"
        y="64"
        width="224"
        height="128"
        rx="8"
        strokeWidth="16"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      ></rect>
      <circle
        cx="128"
        cy="128"
        r="32"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></circle>
      <line
        x1="176"
        y1="64"
        x2="240"
        y2="120"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="176"
        y1="192"
        x2="240"
        y2="136"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="80"
        y1="64"
        x2="16"
        y2="120"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="80"
        y1="192"
        x2="16"
        y2="136"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
    </svg>
  );
};
