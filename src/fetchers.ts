import useSWR from "swr";
import { RouteProperties, StopProperties } from "./common-types";
import { RouteKind } from "./enums";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetchWithRoute = (url: string, route: string) =>
  fetch(`${url}/${route}`).then((res) => res.json());

type JSONRoute = {
  id: string;
  code: string;
  departure: string;
  arrival: string;
};

export function useRouteProperties() {
  const { data, error, isLoading } = useSWR("/api/routes/properties", fetcher);

  if (isLoading || error) {
    return {
      data: [],
      isError: error,
      isLoading: isLoading,
    };
  } else {
    const routes = data.map((route: JSONRoute) => {
      return {
        id: route.id,
        code: route.code,
        // bgColor: `#${route.route_color}` as HEXColor,
        kind: RouteKind.Bus,
        name: `${route.departure} → ${route.arrival}`,
      } as RouteProperties;
    });

    return {
      data: routes,
      isError: error,
      isLoading: isLoading,
    };
  }
}

export function useStopProperties() {
  const { data, error, isLoading } = useSWR("/api/stops/properties", fetcher);

  if (isLoading || error) {
    return {
      data: [],
      isError: error,
      isLoading: isLoading,
    };
  } else {
    return {
      data: data as StopProperties[],
      isError: error,
      isLoading: isLoading,
    };
  }
}

export function useRouteShape() {
  const { data, error, isLoading } = useSWR(
    "/api/routes/shape",
    fetchWithRoute
  );

  if (isLoading || error) {
    return {
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
      isError: error,
      isLoading: isLoading,
    };
  } else {
    return {
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: data,
        },
      },
      isError: error,
      isLoading: isLoading,
    };
  }
}
