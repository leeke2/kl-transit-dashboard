import { Result, RouteResult } from "@/common-types";
import ResultRow from "./ResultRow";

type ResultBlockProps = {
  results: Result[];
  header: string;
  compact?: boolean;
  onClick?: (result: Result) => void;
};

export default function ResultBlock(props: ResultBlockProps) {
  const compact = props.compact ?? false;

  return (
    <div>
      <p className="mb-1 block w-full flex-none pl-2 text-xs font-bold uppercase text-gray-400">
        {props.header}
      </p>
      <div
        className={`flex w-full flex-wrap rounded-md font-medium ${
          compact ? "gap-2" : null
        }`}
      >
        {compact ? (
          <ResultRow
            result={props.results as RouteResult[]}
            onClick={props.onClick}
          />
        ) : (
          props.results.map((result, key) => (
            <ResultRow result={result} key={key} onClick={props.onClick} />
          ))
        )}
      </div>
    </div>
  );
}
