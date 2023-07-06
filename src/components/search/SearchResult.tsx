import {
  RouteProperties,
  StopProperties,
  RouteResult,
  StopResult,
  Result,
} from "@/common-types";
import { RouteKind, ResultKind } from "@/enums";

import { matchSorter } from "match-sorter";
import ResultBlock from "./ResultBlock";
import EmptyResultBlock from "./EmptyResultBlock";
import { useRouteProperties, useStopProperties } from "@/fetchers";

type GroupedResult = {
  metroRoutes: RouteResult[];
  busRoutes: RouteResult[];
  stops: StopResult[];
};

function match<T>(arr: T[], query: string): T[] {
  return matchSorter(arr, query, {
    keys: [
      { threshold: matchSorter.rankings.STARTS_WITH, key: "code" },
      { threshold: matchSorter.rankings.WORD_STARTS_WITH, key: "name" },
      { threshold: matchSorter.rankings.WORD_STARTS_WITH, key: "street" },
    ],
    sorter: (rankedItems) => rankedItems,
  });
}

function search(
  routes: RouteProperties[],
  stops: StopProperties[],
  query: string
) {
  let result: GroupedResult = {
    metroRoutes: [],
    busRoutes: [],
    stops: [],
  };
  if (query !== "") {
    result.metroRoutes = match<RouteProperties>(
      routes.filter((route) => route.kind == RouteKind.Metro),
      query
    ).map((route) => {
      return { kind: ResultKind.Route, value: route };
    });

    result.busRoutes = match<RouteProperties>(
      routes.filter((route) => route.kind == RouteKind.Bus),
      query
    ).map((route) => {
      return { kind: ResultKind.Route, value: route };
    });

    if (query.length >= 5) {
      result.stops = match<StopProperties>(stops, query).map((stop) => {
        return { kind: ResultKind.Stop, value: stop };
      });

      result.stops = result.stops.sort((a, b) =>
        a.value.name.localeCompare(b.value.name, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    }
  } else {
    result.metroRoutes = routes
      .filter((route) => route.kind == RouteKind.Metro)
      .map((route) => {
        return { kind: ResultKind.Route, value: route };
      });

    result.busRoutes = routes
      .filter((route) => route.kind == RouteKind.Bus)
      .map((route) => {
        return { kind: ResultKind.Route, value: route };
      });

    // result.stops = stops.map((stop) => {
    //   return { kind: ResultKind.Stop, value: stop };
    // });
    result.stops = [];
  }

  return result;
}

function isEmpty(result: GroupedResult) {
  return Object.entries(result).every((item: any) => item[1].length == 0);
}

type SearchResultProps = {
  query: string;

  onClick?: (result: Result) => void;
};

export default function SearchResult(props: SearchResultProps) {
  const { data: routes } = useRouteProperties();
  const { data: stops } = useStopProperties();
  const result = search(routes, stops, props.query);

  return (
    <div className="flex max-h-full w-96 flex-col gap-5 overflow-y-scroll rounded-3xl bg-white px-4 py-5 drop-shadow-sm">
      {result.metroRoutes.length > 0 ? (
        <ResultBlock
          header={"Metro"}
          results={result.metroRoutes}
          compact={true}
          onClick={props.onClick}
        />
      ) : null}

      {result.busRoutes.length > 0 ? (
        <ResultBlock
          header={"Bus"}
          results={result.busRoutes}
          onClick={props.onClick}
        />
      ) : null}

      {result.stops.length > 0 ? (
        <ResultBlock
          header={"Stop"}
          results={result.stops}
          onClick={props.onClick}
        />
      ) : null}

      {isEmpty(result) ? <EmptyResultBlock /> : null}
    </div>
  );
}
