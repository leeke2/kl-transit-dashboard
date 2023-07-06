import RouteIcon from "./RouteIcon";

import { RouteProperties } from "@/common-types";

type RouteHeaderProps = RouteProperties & {
  large?: boolean;
};

export default function RouteHeader(props: RouteHeaderProps) {
  const large = props.large ?? false;
  const sizeClassNames = large
    ? "h-10 text-2xl leading-10 font-bold"
    : "h-8 text-base leading-8 font-medium";

  return (
    <div className={`flex w-full items-center gap-3`}>
      <RouteIcon {...props} />
      <span className={`w-full overflow-hidden ${sizeClassNames}`}>
        {props.name}
      </span>
    </div>
  );
}
