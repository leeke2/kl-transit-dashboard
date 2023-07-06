import Card from "./Card";

export default function NumbersCard(props: {
  numbers: {
    header: string;
    value: number;
  }[];
}) {
  const { numbers } = props;

  return (
    <Card noPad={true}>
      <div className="flex flex-wrap gap-y-4 divide-x divide-solid bg-gradient-to-br from-gray-700 to-indigo-900 bg-clip-text py-2">
        {numbers.map((item, key) => {
          return (
            <div
              className="flex w-1/2 flex-none flex-col gap-1 px-4 py-2"
              key={key}
            >
              <span className="block h-4 w-full overflow-hidden text-xs font-medium uppercase text-gray-400">
                {item.header}
              </span>
              <span className="slahed-zero w-full text-4xl font-extrabold proportional-nums tracking-tight text-transparent">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
