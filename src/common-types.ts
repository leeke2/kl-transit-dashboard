import { ResultKind, RouteKind } from "./enums";

export type HEXColor = `#${string}`;

////////////////

export type RouteProperties = {
  id: string;
  code: string;
  bgColor?: HEXColor;
  textColor?: HEXColor;
  kind: RouteKind;
  name: string;
};

export type StopProperties = {
  id: number;
  code: string;
  name: string;
  street: string;
  zone: number;
};

export type RouteResult = {
  kind: ResultKind.Route;
  value: RouteProperties;
};

export type StopResult = {
  kind: ResultKind.Stop;
  value: StopProperties;
};

export type Result = RouteResult | StopResult;
export type Selection = RouteProperties | StopProperties | null;
