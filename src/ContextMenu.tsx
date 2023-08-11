import { RefObject } from "react";

export default function ContextMenu({
  contextRef,
  showContextMenu,
}: {
  contextRef: RefObject<HTMLDivElement>;
  showContextMenu: boolean;
}) {
  return (
    <div
      ref={contextRef}
      className={`${
        showContextMenu ? "flex flex-col" : "hidden"
      } absolute w-32 bg-light-gray border-light-primary border-2`}
    >
      <button className="w-full hover:bg-light-blue hover:text-light-text border-b-2 border-light-titlebar h-8">
        New
      </button>
      <button className="w-full hover:bg-light-blue hover:text-light-text border-b-2 border-light-titlebar h-8">
        Properties
      </button>
      <button className="w-full hover:bg-light-blue hover:text-light-text border-b-2 border-light-titlebar h-8">
        Background
      </button>
    </div>
  );
}
