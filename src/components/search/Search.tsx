import { Result } from "@/common-types";

import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

type SearchProps = {
  query: string;

  searchBarExpanded: boolean;
  searchResultVisible: boolean;
  searchBarOnClick?: () => void;
  searchBarOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  resultOnClick?: (result: Result) => void;
};

export default function Search(props: SearchProps) {
  return (
    <div className="max-w-96 absolute left-0 top-0 flex max-h-full flex-col gap-3 p-5">
      <SearchBar
        value={props.query}
        searchBarExpanded={props.searchBarExpanded}
        onClick={props.searchBarOnClick}
        onChange={props.searchBarOnChange}
      />
      {props.searchResultVisible ? (
        <SearchResult query={props.query} onClick={props.resultOnClick} />
      ) : null}
    </div>
  );
}
