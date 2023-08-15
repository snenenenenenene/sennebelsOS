/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { socials } from "./data/socials";
import { startMenuEntries } from "./data/startMenuEntries";
import { TWindow, useWindowsStore } from "./utils/store";
export const StartMenuEntry = ({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <img src={icon} />
      <p>{name}</p>
    </div>
  );
};

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const windows = useWindowsStore((state: any) => state.windows);
  const setWindows = useWindowsStore((state: any) => state.setWindows);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <nav className="bg-light-gray relative w-full h-[3.5rem] flex p-1 border-t-2 border-light-primary">
      <button
        onClick={() => setShowStartMenu(!showStartMenu)}
        className="font-bold text-xl px-3 border border-light-titlebar gap-x-1 flex justify-center items-center"
      >
        <img src="/icons/Windows logo (without text).ico" />
        Start
      </button>
      <section className="flex-1 flex gap-x-2 text-xl px-3 border-l-2 mx-4 border-light-titlebar">
        {windows.map((window: TWindow) => (
          <button
            className={`${
              window.minimised
                ? "bg-[5px_3px] shadow-[inset_-1px_-1px_0px_#ffffff,inset_1px_1px_0px_#0c0c0c,inset_-2px_-2px_0px_#bbc3c4,inset_2px_2px_0px_#808088]"
                : "bg-no-repeat bg-[4px_2px] shadow-[inset_-1px_-1px_0px_#0c0c0c,inset_1px_1px_0px_#ffffff,inset_-2px_-2px_0px_#808088,inset_2px_2px_0px_#bbc3c4]"
            } flex items-center gap-x-1 border-2 border-light-titlebar px-4 py-1 text-left overflow-hidden whitespace-nowrap text-ellipsis `}
            key={window.id}
            onClick={() =>
              setWindows([
                ...windows.map((w: TWindow) =>
                  w.id === window.id ? { ...w, minimised: !w.minimised } : w
                ),
              ])
            }
          >
            <img className="h-full aspect-square" src={window.icon} />
            <p>{window.name}</p>
          </button>
        ))}
      </section>
      <section className="ml-auto uppercase items-center flex gap-x-2 text-xl px-3 border border-light-titlebar">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            className="flex items-center gap-x-1"
          >
            {social.icon}
          </a>
        ))}
        <button>{formatAMPM(time)}</button>
      </section>
      {showStartMenu && (
        <div className="absolute -translate-y-full left-0 z-50 top-2 w-[30%] h-fit bg-light-gray border border-light-primary">
          {startMenuEntries.map((entry) => (
            <button
              key={entry.name}
              className="w-full h-full hover:bg-light-blue hover:text-light-text flex justify-start p-4 py-2 gap-x-2 items-center"
              onClick={() => setShowStartMenu(false)}
            >
              <img src={entry.icon} />
              <p>{entry.name}</p>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
