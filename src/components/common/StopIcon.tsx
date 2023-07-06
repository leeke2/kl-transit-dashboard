import fontColorContrast from "font-color-contrast";

import { _ } from "@/constants";
import { HEXColor, StopProperties } from "@/common-types";

type StopIconProps = Omit<StopProperties, "name"> & {
  large?: boolean;
  className?: string;
};

function getContrastingTextColor(bgColor: HEXColor): string {
  switch (fontColorContrast(bgColor)) {
    case "#ffffff":
      return _.ROUTE_ICON_BRIGHT_TEXT_COLOR;
      break;

    case "#000000":
      return _.ROUTE_ICON_DARK_TEXT_COLOR;
  }
}

export default function StopIcon(props: StopIconProps) {
  const large = props.large ?? false;
  const bgColor = _.ROUTE_ICON_BG_COLOR;
  const textColor = getContrastingTextColor(bgColor);

  const style = {
    backgroundColor: bgColor,
    color: `${textColor}`,
  };

  const sizeClassNames = large
    ? "h-10 text-2xl leading-10"
    : "h-8 text-base leading-8";

  const shapeClassNames = large ? "w-[4.5rem] px-2" : "w-14 px-2";
  return (
    <span
      className={`block w-full overflow-hidden font-mono text-xs font-normal`}
    >
      {props.code}
    </span>
    // <span
    //   className={`block flex-none overflow-hidden px-1 ${sizeClassNames} ${shapeClassNames} ${props.className}`}
    //   style={style}
    // >
    //   <span
    //     className={`block w-full overflow-hidden font-mono text-sm font-bold slashed-zero oldstyle-nums proportional-nums ${sizeClassNames}`}
    //   >
    //     {props.code}
    //   </span>
    // </span>
  );
}
