import { RefObject } from "react";

interface ContextMenuProps {
  contextRef: RefObject<HTMLDivElement>;
  showContextMenu: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextRef,
  showContextMenu,
}) => {
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
};

export default ContextMenu;
