import { RouteProperties } from "@/common-types";
import { PropsWithChildren } from "react";
import BackButton from "./BackButton";
import RouteHeader from "../common/RouteHeader";
import { Selection } from "@/common-types";

// export default class Stack extends Component<
//   PropsWithChildren<needsSelectionState>,
//   EmptyState
// > {
//   render() {
//     const { selected, setSelected } = this.props;

type StackProps = PropsWithChildren<{
  selected: Selection;
  backButtonOnClick?: () => void;
}>;

export default function Stack(props: StackProps) {
  return (
    <div className="absolute left-0 top-0 flex max-h-full flex-col gap-5 p-5">
      <div className="flex gap-5">
        <BackButton onClick={props.backButtonOnClick} />
        <RouteHeader {...(props.selected as unknown as RouteProperties)} />
        {/* <RouteTitleCard route={selected as unknown as RouteProperties} /> */}
      </div>
      <div className="flex w-full flex-col gap-3">{props.children}</div>
    </div>
  );
}
