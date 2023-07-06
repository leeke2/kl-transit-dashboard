import { FaceFrownIcon } from "@heroicons/react/20/solid";

export default function EmptyResultBlock() {
  return (
    <div>
      <p className="mb-1 block w-full text-center  font-bold text-gray-400">
        <FaceFrownIcon
          className="mx-auto max-h-24 text-gray-300"
          aria-hidden="true"
        />
        No results found!
      </p>
    </div>
  );
}
