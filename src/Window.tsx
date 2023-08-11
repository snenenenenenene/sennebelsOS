/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";

export default function Window({
  name,
  icon,
  type,
  actionChildren,
  setShowAction,
  setSelected,
}: {
  name: string;
  icon: string;
  type: string;
  actionChildren?: React.ReactNode;
  setShowAction: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dragging, setDragging] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 150,
    y: window.innerHeight / 2 - 250,
  });

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
    setMaximized(false);
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

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  return (
    <div
      ref={ref}
      className={`absolute z-30 resize shadow-xl  bg-light-gray border-light-primary border-2 flex flex-col ${
        maximized ? "w-full h-full" : "h-5/6 aspect-square"
      }`}
      style={{
        resize: "both",
        left: maximized ? 0 : `${position.x}px`,
        top: maximized ? 0 : `${position.y}px`,
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
        className="w-full h-10 flex px-1 items-center bg-light-titlebar text-light-text cursor-move "
      >
        <span className="flex pointer-events-none gap-x-1 mr-auto">
          <img src={icon} className="w-6 h-6" />
          {name}
        </span>
        <section className="flex pr-1 gap-x-1">
          <button
            onClick={() => {
              setShowAction(false);
              setSelected(false);
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            _
          </button>
          <button
            onClick={() => {
              setMaximized(!maximized);
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            [&nbsp;]
          </button>
          <button
            onClick={() => {
              setShowAction(false);
              setSelected(false);
            }}
            className="border border-light-primary font-bold bg-light-gray text-light-secondary h-6 w-6"
          >
            X
          </button>
        </section>
      </nav>
      <div className="w-full h-[90%] p-1 flex flex-col">
        <nav className="h-8 w-full flex gap-x-2 p-1">
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
          {type === "image" ? (
            <img src={icon} className="w-full h-full flex object-cover" />
          ) : (
            actionChildren
          )}
        </section>
      </div>
    </div>
  );
}
