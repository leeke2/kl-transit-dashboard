import { ResultKind } from "@/enums";
import { Result, RouteResult } from "@/common-types";

import RouteHeader from "../common/RouteHeader";
import RouteIcon from "../common/RouteIcon";
import StopHeader from "../common/StopHeader";

type ResultRowProps = {
  result: Result | RouteResult[];
  onClick?: (result: Result) => void;
};

export default function ResultRow(props: ResultRowProps) {
  const highlightOnHover = !Array.isArray(props.result);

  function handleClick(result: Result) {
    if (props.onClick !== undefined && props.onClick !== null) {
      return props.onClick(result);
    }

    return props.onClick;
  }

  if (Array.isArray(props.result)) {
    const result = props.result as RouteResult[];

    return (
      <div className="flex w-full flex-wrap gap-2 rounded-md px-2 py-2 font-medium">
        {props.result.map((result, key) => (
          <div onClick={() => handleClick(result)} key={key}>
            <RouteIcon {...result.value} className="cursor-pointer" />
          </div>
        ))}
      </div>
    );
  } else {
    const result = props.result as Result;

    return (
      <div
        className={`flex h-full w-full cursor-pointer gap-3 rounded-md px-2 py-2 font-medium transition-all duration-150 ${
          highlightOnHover ? "hover:bg-gray-100" : null
        }`}
        onClick={() => handleClick(result)}
      >
        {result.kind === ResultKind.Route ? (
          <RouteHeader {...result.value} />
        ) : null}

        {result.kind === ResultKind.Stop ? (
          <StopHeader {...result.value} />
        ) : null}
      </div>
    );
  }
}
