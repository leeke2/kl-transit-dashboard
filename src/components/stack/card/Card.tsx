import { Component, PropsWithChildren } from "react";

type CardProps = {
  header?: string;
  noPad?: boolean;
};

export default class Card extends Component<PropsWithChildren<CardProps>, {}> {
  render() {
    const { header, children, noPad } = this.props;

    return (
      <div
        className={`flex w-96 flex-col gap-5 overflow-y-scroll rounded-3xl bg-white drop-shadow-sm ${
          noPad !== undefined && noPad ? null : "p-4 pt-5"
        }`}
      >
        {header !== undefined ? (
          <p className="block w-full text-sm font-bold">{header}</p>
        ) : null}
        {children}
      </div>
    );
  }
}
