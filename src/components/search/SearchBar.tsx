import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type SearchBarProps = {
  value: string;
  searchBarExpanded: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar(props: SearchBarProps) {
  return (
    <div
      className={`group flex h-10 ${
        props.searchBarExpanded ? "w-96" : "w-10"
      } justify-end rounded-full bg-white drop-shadow-sm transition-all delay-150 duration-300 hover:w-96`}
      onClick={props.onClick}
    >
      <input
        className={`${
          props.searchBarExpanded ? "block" : "hidden"
        } h-full min-w-0 flex-auto bg-transparent pl-4 pr-2 !outline-none focus:ring-0 group-hover:block`}
        placeholder={`Search "U820"`}
        onChange={props.onChange}
        value={props.value}
      />
      <span
        className={`block ${
          props.searchBarExpanded
            ? "m-1 h-8 w-8 bg-gray-800 text-white"
            : "h-10 w-10 bg-white"
        } cursor-pointer rounded-full p-2 transition-all duration-100 ease-in-out group-hover:m-1 group-hover:h-8 group-hover:w-8 group-hover:bg-gray-800 group-hover:text-white`}
      >
        <MagnifyingGlassIcon className="h-full stroke-2" aria-hidden="true" />
      </span>
    </div>
  );
}
