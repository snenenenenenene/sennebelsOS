import React from "react";
import { useWindowsStore } from "./utils/store";

interface DesktopEntryProps {
  name: string;
  icon: string;
  type: string;
  location: {
    left: number;
    top: number;
  };
  actionChildren: React.ReactNode; // Ensure this is included in the props
}

const DesktopEntry: React.FC<DesktopEntryProps> = ({
  name,
  icon,
  type,
  location,
  actionChildren,
}) => {
  const { selectedEntries, setOnlySelected, appendWindow } = useWindowsStore();
  const isSelected = selectedEntries.includes(name);

  const handleSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent the click from bubbling to the desktop
    setOnlySelected(name);
  };

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    appendWindow({
      name,
      icon,
      type,
      selected: true,
      minimised: false,
      maximised: false,
      location: { left: 100, top: 100 }, // Change this to a default location
      size: { width: 1000, height: 600 },
      actionChildren, // Pass the specific content for this desktop entry
    });
  };

  return (
    <article
      onClick={handleSelect}
      onDoubleClick={handleDoubleClick}
      className="select-text max-w-10 overflow-hidden transform absolute flex-col justify-center text-center w-24 h-fit"
      style={{
        left: `${location.left}px`,
        top: `${location.top}px`,
      }}
    >
      <div className="w-16 h-16 flex justify-center items-center mx-auto">
        <img
          src={icon}
          alt={icon}
          className="object-cover select-none w-full h-full"
        />
      </div>
      <p
        className={`whitespace-pre-wrap select-none border-2 mt-1 ${
          isSelected
            ? "bg-blue-500 text-white border-gray-300"
            : "border-transparent"
        } group-hover:border-gray-300`}
      >
        {name || "No Name"}
      </p>
    </article>
  );
};

export default DesktopEntry;
