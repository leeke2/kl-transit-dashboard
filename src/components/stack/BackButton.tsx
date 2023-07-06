import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

type BackButtonProps = {
  onClick?: () => void;
};

export default function BackButton(props: BackButtonProps) {
  return (
    <span
      className="block h-10 w-10 cursor-pointer rounded-full bg-white p-2 transition-all duration-100 ease-in-out hover:bg-gray-800 hover:text-white"
      onClick={props.onClick}
    >
      <ArrowUturnLeftIcon className="h-full stroke-2" aria-hidden={true} />
    </span>
  );
}
