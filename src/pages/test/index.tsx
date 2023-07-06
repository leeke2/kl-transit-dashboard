// import Head from "next/head";
// import RouteIcon from "@/components/RouteIcon";
// import RouteHeader from "@/components/common/RouteHeader";
// import { RouteKind, ResultKind } from "@/enums";
// import ResultRow from "@/components/ResultRow";
// import { Route, RouteResult } from "@/common-types";
// import ResultBlock from "@/components/ResultBlock";
// import EmptyResultBlock from "@/components/search/EmptyResultBlock";
// import SearchResult from "@/components/search/SearchResult";
// import SearchBar from "@/components/search/SearchBar";
// import { useState } from "react";
// import Search from "@/components/search/Search";

// export default function Home() {
//   //   console.log(RouteResult);
//   //   const result: RouteResult = {
//   //     kind: ResultKind.Route,
//   //     code: "1",
//   //     name: "KTM Seremban Line",
//   //   };

//   const route3: Route = {
//     code: "170X",
//     name: "Larkin",
//     kind: RouteKind.Bus,
//   };

//   const route: Route = {
//     code: "1",
//     name: "KTM Seremban Line",
//     kind: RouteKind.Metro,
//     bgColor: "#ff0000",
//     textColor: "#ffffff",
//   };

//   const route2: Route = {
//     code: "2",
//     name: "KJL",
//     kind: RouteKind.Metro,
//     bgColor: "#000000",
//   };

//   const result: RouteResult = {
//     kind: ResultKind.Route,
//     value: route,
//   };

//   const result2: RouteResult = {
//     kind: ResultKind.Route,
//     value: route2,
//   };

//   const result3: RouteResult = {
//     kind: ResultKind.Route,
//     value: route3,
//   };

//   const routes: Route[] = [
//     { code: "1", name: "KTM Seremban Line", kind: RouteKind.Metro },
//     { code: "2", name: "KTM Klang Line", kind: RouteKind.Metro },
//     { code: "3", name: "LRT Ampang Line", kind: RouteKind.Metro },
//     { code: "4", name: "LRT Sri Petaling Line", kind: RouteKind.Metro },
//     { code: "170X", name: "Larkin", kind: RouteKind.Bus },
//     {
//       code: "PAVBJ",
//       name: "Stesen LRT Awan Besar ~ Pavilion Bukit Jalil",
//       kind: RouteKind.Bus,
//     },
//   ];

//   const [searchBarExpanded, setSearchBarExpanded] = useState(false);
//   const [query, setQuery] = useState("");

//   function searchBarOnClick() {
//     setSearchBarExpanded(true);
//   }

//   function searchBarOnChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setQuery(e.target.value);
//   }

//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <link
//           href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
//           rel="stylesheet"
//         />
//       </Head>
//       <main className="h-full w-full bg-slate-800">
//         <Search
//           routes={routes}
//           stops={[]}
//           query={query}
//           searchBarExpanded={searchBarExpanded}
//           searchBarOnClick={searchBarOnClick}
//           searchBarOnChange={searchBarOnChange}
//         />
//         {/* <div className="max-w-96 absolute left-0 top-0 flex max-h-full flex-col gap-5 p-5">
//           <SearchBar
//             searchBarExpanded={searchBarExpanded}
//             onClick={searchBarOnClick}
//             onChange={searchBarOnChange}
//           />
//           <SearchResult routes={routes} stops={[]} query={""} />
//         </div> */}
//         {/* <ResultBlock header="Routes" results={[result, result2, result3]} />
//         <ResultBlock
//           header="Routes"
//           results={[result, result2, result3, result3]}
//           compact={true}
//         />
//         <ResultBlock header="Route" results={[result]} />
//         <EmptyResultBlock /> */}
//         {/* <ResultRow result={result} highlightOnHover={true} />
//         <ResultRow result={result2} />
//          */}
//         {/* <RouteIcon code={"1"} kind={RouteKind.Metro} textColor={"#ff0000"} />
//         <RouteIcon code={"2"} kind={RouteKind.Bus} />
//         <RouteHeader
//           code={"170X"}
//           kind={RouteKind.Bus}
//           name={"Stesen LRT Taman Jaya ~ PPUM via SS2 PJ11"}
//         />
//         <RouteIcon code={"4"} kind={RouteKind.Metro} bgColor={"#ff0000"} />
//         <RouteIcon code={"5"} kind={RouteKind.Bus} bgColor={"#00ff00"} />
//         <RouteIcon code={"6"} kind={RouteKind.Bus} bgColor={"#000000"} />
//         <RouteIcon code={"7"} kind={RouteKind.Metro} textColor={"#0000ff"} />
//         <RouteIcon code={"8"} kind={RouteKind.Metro} large={true} />
//         <RouteIcon code={"9"} kind={RouteKind.Bus} large={true} />
//         <div className="w-96">
//           <RouteHeader
//             code={"170X"}
//             kind={RouteKind.Bus}
//             large={true}
//             name={"Stesen LRT Taman Jaya ~ PPUM via SS2 PJ"}
//           />
//         </div>
//         <RouteIcon
//           code={"11"}
//           kind={RouteKind.Metro}
//           bgColor={"#ff0000"}
//           large={true}
//         />
//         <RouteIcon
//           code={"12"}
//           kind={RouteKind.Bus}
//           bgColor={"#00ff00"}
//           large={true}
//         />
//         <RouteIcon
//           code={"13"}
//           kind={RouteKind.Bus}
//           bgColor={"#000000"}
//           large={true}
//         />
//         <RouteIcon
//           code={"12"}
//           kind={RouteKind.Metro}
//           textColor={"#0000ff"}
//           large={true}
//         />
//         <RouteHeader
//           code={"15"}
//           kind={RouteKind.Metro}
//           textColor={"#0000ff"}
//           large={true}
//           name={"Kelana Jaya Line"}
//         />

//         <RouteHeader
//           code={"16"}
//           kind={RouteKind.Bus}
//           textColor={"#0000ff"}
//           large={true}
//           name={"Kelana Jaya Line"}
//         />
//         <RouteHeader
//           code={"17"}
//           kind={RouteKind.Metro}
//           textColor={"#0000ff"}
//           name={"Kelana Jaya Line"}
//         />

//         <RouteHeader
//           code={"18"}
//           kind={RouteKind.Bus}
//           textColor={"#0000ff"}
//           name={"Kelana Jaya Line"}
//         /> */}
//       </main>
//     </>
//   );
// }

export default function Test() {
  return <></>;
}