// import { Component } from "react";
// import RouteHeader from "@/components/common/RouteHeader";
// import { RouteKind } from "@/enums";

// type RouteTitleCardProps = {
//   route?: Route;
// };

// export default class RouteTitleCard extends Component<
//   RouteTitleCardProps,
//   EmptyState
// > {
//   render() {
//     const { route } = this.props;

//     if (route !== undefined) {
//       return (
//         <>
//           <RouteHeader
//             code={route.id}
//             bgColor={`#${route.route_color}` as HEXColor}
//             name={route.desc}
//             // large={true}
//             kind={RouteKind.Bus}
//           />
//           {/* <div className="flex w-full gap-3 py-1 font-bold">
//             { <RouteIcon route={route} /> }
//             <span className="py-1">{route.desc}</span>
//           </div> */}

//           {/* <RouteResult route={route as Route} /> */}
//         </>
//       );
//     } else {
//       return <></>;
//     }
//   }
// }

export {};
