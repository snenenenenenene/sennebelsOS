/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import ContextMenu from "./ContextMenu";
import { DesktopEntry } from "./DesktopEntry";
import Window from "./Window";
import { desktopItems } from "./data/desktopItems";

export default function Desktop({ children }: { children?: React.ReactNode }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextRef = useRef<HTMLDivElement>(null);
  const [mouseDownPosition, setMouseDownPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showSelectionBox, setShowSelectionBox] = useState(false);

  return (
    <div
      onClick={() => {
        setShowContextMenu(false);
        desktopItems.forEach((item) => {
          item.selected = false;
        });
      }}
      className="bg-light-desktop w-full h-[95%] flex flex-col relative"
      id="desktop"
      onContextMenu={(event) => {
        event.preventDefault();
        contextRef.current!.style.left = event.clientX + "px";
        contextRef.current!.style.top = event.clientY + "px";

        setShowContextMenu(true);
      }}
      onMouseDown={(event) => {
        // @ts-ignore
        if (event.target.id === "desktop") {
          const selectionBox = document.getElementById(
            "selectionBox"
          ) as HTMLDivElement;

          selectionBox.style.left = event.clientX + "px";
          selectionBox.style.top = event.clientY + "px";
          selectionBox.style.width = "0px";
          selectionBox.style.height = "0px";

          setMouseDownPosition({ x: event.clientX, y: event.clientY });
          setShowSelectionBox(true);
        }
      }}
      onMouseMove={(e) => {
        const selectionBox = document.getElementById(
          "selectionBox"
        ) as HTMLDivElement;
        const x = e.clientX;
        const y = e.clientY;
        if (x > mouseDownPosition.x) {
          selectionBox.style.width = x - mouseDownPosition.x + "px";
        } else {
          selectionBox.style.width = mouseDownPosition.x - x + "px";
          selectionBox.style.left = x + "px";
        }
        if (y > mouseDownPosition.y) {
          selectionBox.style.height = y - mouseDownPosition.y + "px";
        } else {
          selectionBox.style.height = mouseDownPosition.y - y + "px";
          selectionBox.style.top = y + "px";
        }
      }}
      onMouseUp={() => {
        setShowSelectionBox(false);
      }}
    >
      {windows.map((window: any) => (
        <Window key={window.id} {...window} />
      ))}
      <div
        id="selectionBox"
        className={`${
          showSelectionBox ? "flex" : "hidden"
        } w-0 h-0 absolute pointer-events-none border-2  border-light-primary border-dotted`}
      />
      {desktopItems.map((entry) => (
        <DesktopEntry
          location={{ left: entry.location.left, top: entry.location.top }}
          key={entry.name}
          itemSelected={entry.selected}
          name={entry.name}
          type={entry.type}
          icon={entry.icon}
          actionChildren={entry.actionChildren}
        />
      ))}
      {children}
      <ContextMenu showContextMenu={showContextMenu} contextRef={contextRef} />
    </div>
  );
}
