/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState } from "react";
import { TWindow, useWindowsStore } from "./utils/store";

export default function Window({ id }: { id: string }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const windows = useWindowsStore((state: any) => state.windows);
  const setWindows = useWindowsStore((state: any) => state.setWindows);
  const windowData: TWindow = windows.find((w: any) => w.id === id);

  const ref = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    e: MouseEvent & {
      currentTarget: {
        style: {
          left: string;
          top: string;
        };
      };
    }
  ) => {
    setDragging(true);
    const rect = ref.current!.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (
    e: MouseEvent & {
      currentTarget: {
        style: {
          left: string;
          top: string;
        };
      };
    }
  ) => {
    if (!dragging) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    //TODO: Replace with setWindowById
    setWindows(
      windows.map((w: any) => {
        if (w.id === id) {
          w.location = { left: newX, top: newY };
        }
        return w;
      })
    );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  return (
    <div
      ref={ref}
      className={`absolute z-30 resize shadow-xl  bg-light-gray border-light-primary border-2 flex-col ${
        windowData.minimised
          ? "hidden"
          : windowData.maximised
          ? "w-full h-full flex"
          : "h-5/6 aspect-square flex"
      }`}
      style={{
        left: windowData.maximised ? 0 : `${windowData?.location?.left}px`,
        top: windowData.maximised ? 0 : `${windowData?.location?.top}px`,
      }}
    >
      <nav
        // @ts-ignore
        onMouseDown={handleMouseDown}
        // @ts-ignore
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (dragging) {
            setDragging(false);
          }
        }}
        onMouseUp={handleMouseUp}
        draggable={false}
        className="select-none w-full h-10 flex px-1 items-center bg-light-titlebar text-light-text cursor-move "
      >
        <span className="flex pointer-events-none gap-x-1 mr-auto">
          <img src={windowData?.icon} className="w-6 h-6" />
          {windowData?.name}
        </span>
        <section className="flex pr-1 gap-x-1">
          <button
            onClick={() => {
              setWindows(
                windows.map((w: any) => {
                  if (w.id === windowData.id) {
                    w.minimised = true;
                    w.selected = false;
                  }
                  return w;
                })
              );
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            _
          </button>
          <button
            onClick={() => {
              setWindows(
                windows.map((w: any) => {
                  if (w.id === windowData.id) {
                    w.maximised = !w.maximised;
                  }
                  return w;
                })
              );
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            [&nbsp;]
          </button>
          <button
            onClick={() => {
              if (!windowData) return;
              setWindows(windows.filter((w: any) => w.id !== windowData.id));
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            X
          </button>
        </section>
      </nav>
      <div className="w-full h-[90%] p-1 flex flex-col">
        <nav className="select-none h-8 w-full flex gap-x-2 p-1">
          <button className="h-full w-8">
            <p>File</p>
          </button>
          <button className="h-full w-8">
            <p>Edit</p>
          </button>
          <button className="h-full w-8">
            <p>View</p>
          </button>
          <button className="h-full w-8">
            <p>Help</p>
          </button>
        </nav>
        <section className="flex w-full h-full bg-white">
          {windowData?.type === "image" ? (
            <img
              src={windowData?.icon}
              className="w-full h-full flex object-cover"
            />
          ) : (
            windowData?.actionChildren
          )}
        </section>
      </div>
    </div>
  );
}
