import React, { useRef, useState, useEffect } from "react";
import { useWindowsStore } from "./utils/store"; // Ensure the correct path

interface WindowProps {
  id: string;
}

const Window: React.FC<WindowProps> = ({ id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [prevSize, setPrevSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [prevLocation, setPrevLocation] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const windowData = useWindowsStore((state) =>
    state.windows.find((w) => w.id === id)
  );
  const {
    updateWindowLocation,
    toggleMinimiseWindow,
    toggleMaximiseWindow,
    removeWindow,
    updateWindowSize,
  } = useWindowsStore((state) => ({
    updateWindowLocation: state.updateWindowLocation,
    toggleMinimiseWindow: state.toggleMinimiseWindow,
    toggleMaximiseWindow: state.toggleMaximiseWindow,
    removeWindow: state.removeWindow,
    updateWindowSize: state.updateWindowSize,
  }));

  const desktopRef = document.getElementById("desktop");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;
        updateWindowLocation(id, { left: newX, top: newY });
      }
      if (isResizing) {
        const newWidth = e.clientX - startPosition.x + startSize.width;
        const newHeight = e.clientY - startPosition.y + startSize.height;
        updateWindowSize(id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    startPosition,
    startSize,
    id,
    updateWindowLocation,
    updateWindowSize,
  ]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current || isResizing) return;

    setStartPosition({
      x: e.clientX - windowData!.location.left,
      y: e.clientY - windowData!.location.top,
    });
    setIsDragging(true);
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;

    e.stopPropagation(); // Prevent dragging when resizing
    setStartPosition({ x: e.clientX, y: e.clientY });
    setStartSize({
      width: windowData!.size.width,
      height: windowData!.size.height,
    });
    setIsResizing(true);
  };

  const handleMaximize = () => {
    if (!desktopRef) return;
    const desktopRect = desktopRef.getBoundingClientRect();

    if (windowData?.maximised) {
      // Restore to previous size and location
      toggleMaximiseWindow(id);
      if (prevLocation && prevSize) {
        updateWindowLocation(id, prevLocation);
        updateWindowSize(id, prevSize);
        setPrevLocation(null);
        setPrevSize(null);
      }
    } else {
      // Maximize
      setPrevLocation({
        left: windowData.location.left,
        top: windowData.location.top,
      });
      setPrevSize({
        width: windowData.size.width,
        height: windowData.size.height,
      });
      toggleMaximiseWindow(id);
      updateWindowLocation(id, { left: 0, top: 0 });
      updateWindowSize(id, {
        width: desktopRect.width,
        height: desktopRect.height,
      });
    }
  };

  if (!windowData) {
    console.log("No window data available.");
    return null;
  }

  return (
    <div
      ref={ref}
      className={`absolute z-30 shadow-xl bg-light-gray border-light-primary border-2 ${
        windowData.minimised
          ? "hidden"
          : windowData.maximised
          ? "left-0 top-0 w-full h-full"
          : "flex flex-col"
      }`}
      style={{
        left: windowData.location.left,
        top: windowData.location.top,
        width: windowData.size.width,
        height: windowData.size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      <nav className="select-none w-full h-10 flex justify-between items-center bg-light-titlebar text-light-text cursor-move">
        <span className="flex pointer-events-none gap-x-1 mr-auto">
          <img
            src={windowData.icon}
            className="w-6 h-6"
            alt={windowData.name}
          />
          {windowData.name}
        </span>
        <div className="flex pr-1 gap-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimiseWindow(id);
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            [ ]
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeWindow(id);
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            X
          </button>
        </div>
      </nav>
      <div className="window-content flex-1 overflow-auto p-1">
        {windowData.actionChildren}
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Window;
