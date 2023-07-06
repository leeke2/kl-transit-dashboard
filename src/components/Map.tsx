import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { RouteProperties, Selection } from "@/common-types";
import { RouteKind } from "@/enums";
import lineChunk from "@turf/line-chunk";
import { lineString, centroid, bbox } from "@turf/turf";

type MapProps = {
  selected: Selection;
  onClick?: () => void;
};

export default function Map(props: MapProps) {
  const mapContainer = useRef(null);
  const mapObject = useRef<mapboxgl.Map | null>(null);
  const shouldStopAnimation = useRef(true);

  useEffect(() => {
    mapObject.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/kelvinlee18/clenygbe5000j01o874ayzje3",
      // style: "mapbox://styles/mapbox/streets-v12",
      center: [101.685, 3.1568],
      zoom: 12,
      accessToken: process.env.mapbox_key,
    });

    mapObject.current!.on("load", () => {
      if (mapObject.current!.getSource("route-source") === undefined) {
        mapObject.current!.addSource("route-source", {
          type: "geojson",
          lineMetrics: true,
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          },
        });

        mapObject.current!.addLayer({
          type: "line",
          source: "route-source",
          id: "route-layer",
          paint: {
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0,
              "#64656F", //"#2F80ED", //"#5B86E5",
              1,
              "#6FC3F0", //#56CCF2", //"#36D1DC",
            ],
            "line-width": 6,
          },
        });

        fetch(`/api/isochrones/PY`)
          .then((response) => response.json())
          .then((geojson) => {
            if (Object.keys(geojson).length === 0) {
              return;
            }

            console.log(geojson);
            mapObject.current!.addSource("isochrones", {
              type: "geojson",
              data: geojson,
            });

            mapObject.current!.addLayer({
              id: "isochrones",
              type: "fill",
              source: "isochrones", // reference the data source
              layout: {},
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "distance"],
                  0,
                  "#ffffcc",
                  250,
                  "#ffffcc",
                  500,
                  "#c7e9b4",
                  750,
                  "#7fcdbb",
                  1000,
                  "#41b6c4",
                  1250,
                  "#2c7fb8",
                  1500,
                  "#253494",
                ],
                "fill-opacity": 0.5,
              },
            });
          });
      }
    });
  }, []);

  useEffect(() => {
    if (props.selected === null) {
      shouldStopAnimation.current = true;
      const routeSource = mapObject.current!.getSource(
        "route-source"
      ) as mapboxgl.GeoJSONSource;

      if (routeSource !== undefined) {
        routeSource.setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        });
      }

      return;
    }

    const fps = 144;
    const kmps =
      (props.selected as unknown as RouteProperties).kind === RouteKind.Bus
        ? 2
        : 5;

    fetch(
      `/api/routes/shape/${(props.selected as unknown as RouteProperties).id}`
    )
      .then((response) => response.json())
      .then((crds) => {
        const coords = crds["02"].map((point: Number[]) => [
          point[1],
          point[0],
        ]);

        const chunked = lineChunk(lineString(coords), kmps / fps, {
          units: "kilometers",
        });

        const coordinates = chunked.features.map(
          (feature) => feature.geometry.coordinates[0]
        );

        const c = centroid(chunked).geometry.coordinates;

        const padLeft = 384 / window.innerWidth;
        let boundingBox = [...bbox(chunked)];
        boundingBox = [
          boundingBox[0] - (boundingBox[2] - boundingBox[0]) * 0.1,
          boundingBox[1] - (boundingBox[3] - boundingBox[1]) * 0.1,
          boundingBox[2] + (boundingBox[2] - boundingBox[0]) * 0.1,
          boundingBox[3] + (boundingBox[3] - boundingBox[1]) * 0.1,
        ];

        boundingBox = [
          boundingBox[0] - (boundingBox[2] - boundingBox[0]) * padLeft,
          boundingBox[1],
          boundingBox[2],
          boundingBox[3],
        ];

        // mapObject
        //   .current!.flyTo({
        //     center: [c[0], c[1]], // [coordinates[0][0], coordinates[0][1]],
        //   })
        //   .once("moveend", () => {
        mapObject
          .current!.fitBounds(boundingBox as mapboxgl.LngLatBoundsLike)
          .once("moveend", () => {
            const easeInOutCubic = (x: number): number => {
              // return x;
              return x >= 1 ? 1 : x * x * (3 - 2 * x);
              // return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            };

            const startTime = performance.now();
            const animationTime = coordinates.length / fps;
            let prevCoordinates: [number, number] | null = null;

            const fn = () => {
              if (shouldStopAnimation.current) {
                const routeSource = mapObject.current!.getSource(
                  "route-source"
                ) as mapboxgl.GeoJSONSource;

                routeSource.setData({
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: [],
                  },
                });

                return;
              }

              const progress = easeInOutCubic(
                (performance.now() - startTime) / 1000 / animationTime
              );
              const routeSource = mapObject.current!.getSource(
                "route-source"
              ) as mapboxgl.GeoJSONSource;

              const slicedCoordinates = coordinates.slice(
                0,
                Math.ceil(progress * coordinates.length)
              );

              if (slicedCoordinates.length > 0) {
                routeSource.setData({
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: slicedCoordinates,
                  },
                });
              }

              if (progress < 1) {
                requestAnimationFrame(fn);
              }
            };

            shouldStopAnimation.current = false;
            requestAnimationFrame(fn);
          });
      });
  }, [props.selected]);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: "100vw", height: "100vh" }}
        onClick={props.onClick}
      />
      <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-neutral-200 via-neutral-100 opacity-75"></div>
    </>
  );
}
