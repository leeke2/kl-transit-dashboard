import fontColorContrast from "font-color-contrast";

import { _ } from "@/constants";
import { RouteKind } from "@/enums";
import { HEXColor, RouteProperties } from "@/common-types";

type RouteIconProps = Omit<RouteProperties, "name"> & {
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

export default function RouteIcon(props: RouteIconProps) {
  const large = props.large ?? false;
  const bgColor = props.bgColor ?? _.ROUTE_ICON_BG_COLOR;
  const textColor = props.textColor ?? getContrastingTextColor(bgColor);

  const style = {
    backgroundColor: bgColor,
    color: `${textColor}`,
  };

  const sizeClassNames = large
    ? "h-10 text-2xl leading-10"
    : "h-8 text-base leading-8";

  const shapeClassNames =
    props.kind == RouteKind.Bus
      ? large
        ? "w-[4.5rem] px-2"
        : "w-14 px-2"
      : large
      ? "w-10 rounded-full"
      : "w-8 rounded-full";

  return (
    <span
      className={`block flex-none overflow-hidden px-1 text-center ${sizeClassNames} ${shapeClassNames} ${props.className}`}
      style={style}
    >
      <span
        className={`block w-full overflow-hidden font-mono font-bold slashed-zero oldstyle-nums proportional-nums ${sizeClassNames}`}
      >
        {props.code}
      </span>
    </span>
  );
}
