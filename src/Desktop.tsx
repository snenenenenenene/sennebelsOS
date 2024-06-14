import React, { useRef, useState, useCallback } from "react";
import ContextMenu from "./ContextMenu";
import DesktopEntry from "./DesktopEntry";
import { desktopItems } from "./data/desktopItems";
import { useWindowsStore } from "./utils/store";

type DesktopProps = {
  children?: React.ReactNode;
};

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const contextRef = useRef<HTMLDivElement>(null);
  const deselectAll = useWindowsStore((state) => state.deselectAll);

  const handleDesktopClick = useCallback(() => {
    setShowContextMenu(false);
    deselectAll();
  }, [deselectAll]);

  return (
    <div
      onClick={handleDesktopClick}
      className="bg-light-desktop w-full h-full flex flex-col relative"
      id="desktop"
      onContextMenu={(event: React.MouseEvent) => {
        event.preventDefault();
        const { clientX, clientY } = event;
        if (contextRef.current) {
          contextRef.current.style.left = `${clientX}px`;
          contextRef.current.style.top = `${clientY}px`;
        }
        setShowContextMenu(true);
      }}
    >
      {desktopItems.map((entry) => (
        <DesktopEntry key={entry.name} {...entry} />
      ))}
      {children}
      <ContextMenu contextRef={contextRef} showContextMenu={showContextMenu} />
    </div>
  );
};

export default Desktop;
