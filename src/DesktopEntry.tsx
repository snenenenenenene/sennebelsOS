/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactNode, useState } from "react";
import { useWindowsStore } from "./utils/store";
export const DesktopEntry = ({
  name,
  icon,
  type,
  actionChildren,
  itemSelected,
  location,
}: {
  name: string;
  icon: string;
  type: string;
  itemSelected: boolean;
  location: {
    left: number;
    top: number;
  };
  actionChildren?: ReactNode;
}) => {
  const [selected, setSelected] = useState(itemSelected);
  const [dragging, setDragging] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windows = useWindowsStore((state: any) => state?.windows);
  const appendWindow = useWindowsStore((state: any) => state?.appendWindow);

  const handleMouseDown = (
    event: MouseEvent & {
      currentTarget: {
        getBoundingClientRect: () => { left: number; top: number };
        style: {
          left: string;
          top: string;
        };
      };
    }
  ) => {
    setDragging(true);
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseMove = (
    event: MouseEvent & {
      currentTarget: {
        style: {
          left: string;
          top: string;
        };
      };
    }
  ) => {
    if (!dragging) return;

    const newX = event?.clientX - offset.x;
    const newY = event?.clientY - offset.y;

    event.currentTarget!.style.left = newX + "px";
    event.currentTarget!.style.top = newY + "px";
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <>
      <article
        onClick={() => {
          if (selected) {
            setShowAction(true);
            appendWindow({
              id: name,
              name,
              icon,
              type,
              actionChildren,
              setShowAction,
              setSelected,
              selected,
              minimised: false,
              setMinimised: () => {},
              maximised: false,
              setMaximised: () => {},
              location: { top: location.top, left: location.left },
              setLocation: () => {},
              size: { width: 0, height: 0 },
              setSize: () => {},
            });
          }
          setSelected(true);
        }}
        // @ts-ignore
        onMouseDown={handleMouseDown}
        // @ts-ignore
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (!dragging) {
            setDragging(false);
          }
        }}
        onMouseUp={handleMouseUp}
        draggable={false}
        className="select-text max-w-10 overflow-hidden transform absolute group flex-col justify-center text-center w-24 h-fit text-light-primary"
        style={{
          left: location.left || 0,
          top: location.top || 0,
        }}
      >
        <div className="w-16 h-16 flex justify-center items-center mx-auto">
          {icon && (
            <img
              src={icon}
              className="object-cover select-none w-full h-full"
              alt={icon}
              draggable={false}
            />
          )}
        </div>
        <p
          className={`${
            selected ? "bg-light-blue border-light-gray" : ""
          } border-dotted whitespace-pre-wrap select-none border-2 border-transparent  group-hover:border-light-gray mt-1`}
        >
          {name || "No Name"}
        </p>
      </article>
      {/* {showAction && (
        <Window
          type={type}
          name={name}
          icon={icon}
          setShowAction={setShowAction}
          setSelected={setSelected}
          actionChildren={actionChildren}
        />
      )} */}
    </>
  );
};
