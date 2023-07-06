import StopIcon from "./StopIcon";

import { StopProperties } from "@/common-types";

type StopHeaderProps = StopProperties;

export default function StopHeader(props: StopHeaderProps) {
  return (
    <div className={`flex w-full flex-col items-center font-bold`}>
      {/* <StopIcon {...props} /> */}
      <span className="flex w-full text-gray-400">
        <span className="font-mono text-xs font-normal">{props.code}</span>
        <span className="font-mono text-xs font-normal">&nbsp;</span>
        <span className="text-xs font-normal">{props.street}</span>
      </span>
      {/* <span className="w-full font-mono text-xs font-normal">{props.code}</span> */}
      <span className="w-full overflow-hidden">{props.name}</span>
      {/* <span className="flex w-full">
        <span className="text-xs font-normal">{props.street}</span>
        <span className="font-mono text-xs font-normal">&nbsp;·&nbsp;</span>
        <span className="font-mono text-xs font-normal">{props.code}</span>
      </span> */}
    </div>
  );
}
