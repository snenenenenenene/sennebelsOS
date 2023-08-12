import { useEffect, useState } from "react";
import { socials } from "./data/socials";
import { startMenuEntries } from "./data/startMenuEntries";
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
