import { ReactNode, useRef, useState } from "react";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { gameProjects } from "./data/gameProjects";
import { threeDProjects } from "./data/threeDProjects";
import { webProjects } from "./data/webProjects";

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

  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newX = e?.clientX - offset.x;
    const newY = e?.clientY - offset.y;

    e.currentTarget.style.left = newX + "px";
    e.currentTarget.style.top = newY + "px";
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
          }
          setSelected(true);
        }}
        onMouseDown={handleMouseDown}
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
      {showAction && (
        <Window
          type={type}
          name={name}
          icon={icon}
          setShowAction={setShowAction}
          setSelected={setSelected}
          actionChildren={actionChildren}
        />
      )}
    </>
  );
};

export const desktopItems = [
  {
    name: "My Projects",
    icon: "/public/icons/Folder.ico",
    type: "folder",
    selected: false,

    location: {
      top: 0,
      left: 10,
    },
    actionChildren: (
      <div className="flex flex-wrap content-start select-none overflow-y-scroll w-full h-full">
        {webProjects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            className="h-40 flex-col  aspect-square hover:bg-light-blue hover:text-light-text flex justify-start p-4 py-2 gap-x-2 items-center"
          >
            <img
              src={project.images[0]}
              className="object-contain w-full h-full flex"
              alt={project.name}
            />
            <p className="overflow-ellipsis mt-auto line-clamp-1">
              {project.name}
            </p>
          </a>
        ))}
      </div>
    ),
  },
  {
    name: "Games",
    icon: "/public/icons/Folder.ico",
    type: "folder",
    selected: false,

    location: {
      top: 100,
      left: 10,
    },
    actionChildren: (
      <div className="flex flex-wrap select-none overflow-y-scroll h-full w-full">
        {gameProjects.map((project) => (
          <div key={project.name}>
            <a
              href={project.link}
              target="_blank"
              className="h-40 flex-col aspect-square hover:bg-light-blue hover:text-light-text flex justify-start p-4 py-2 gap-x-2 items-center"
            >
              <img
                src={project.images[0]}
                className="object-contain w-full h-[85%] flex"
                alt={project.name}
              />
              <p className="overflow-ellipsis mt-auto line-clamp-1">
                {project.name}
              </p>
            </a>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "My 3D Models",
    icon: "/public/icons/Folder.ico",
    type: "program",
    selected: false,

    location: {
      top: 200,
      left: 10,
    },
    actionChildren: (
      <div className="flex flex-wrap content-start select-none overflow-y-scroll w-full h-full">
        {threeDProjects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            className="h-40 flex-col  aspect-square hover:bg-light-blue hover:text-light-text flex justify-start p-4 py-2 gap-x-2 items-center"
          >
            <img
              src={project.images[0]}
              className="object-contain w-full h-full flex"
              alt={project.name}
            />
            <p className="overflow-ellipsis mt-auto line-clamp-1">
              {project.name}
            </p>
          </a>
        ))}
      </div>
    ),
  },
  {
    name: "Recycle Bin",
    icon: "/public/icons/Recycle Bin with document.ico",
    type: "folder",
    selected: false,
    location: {
      top: 300,
      left: 10,
    },
    actionChildren: (
      <div className="flex flex-wrap w-full select-none overflow-y-scroll">
        <div>
          <span className="h-40 flex-col  aspect-square hover:bg-light-blue hover:text-light-text flex justify-start p-4 py-2 gap-x-2 items-center">
            <img
              src={
                "https://www.invaluable.com/blog/vintage-barbie-dolls/1962-blonde-bubblecut-barbie-dressed-in-gay-parisienne-964/"
              }
              className="object-contain w-full h-full flex"
              alt={"Barbie (The Sequel)"}
            />
            <p className="overflow-ellipsis mt-auto line-clamp-1">
              Barbie (The Sequel)
            </p>
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Browser",
    icon: "/public/icons/Earth (16 colors).ico",
    type: "program",
    selected: false,
    location: {
      top: 400,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full overflow-hidden">
        <iframe
          // width="560"
          // height="315"
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    ),
  },
  {
    name: "Me.jpeg",
    icon: "/public/me.jpeg",
    type: "image",
    selected: false,
    location: {
      top: 500,
      left: 10,
    },
    actionChildren: <></>,
  },
  {
    name: "Resume.pdf",
    icon: "/public/icons/Book.ico",
    type: "pdf",
    selected: false,
    location: {
      top: 600,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full flex">
        <iframe className="w-full" src="/public/SenneBelsCV.pdf"></iframe>
      </div>
    ),
  },
  {
    name: "Minecraft.exe",
    icon: "/public/assets/games/grass.png",
    type: "program",
    selected: false,
    location: {
      top: 700,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full flex">
        <iframe
          className="w-full h-full flex"
          src="https://minecraft-react-ashy.vercel.app/"
        ></iframe>
      </div>
    ),
  },
  {
    name: "About Me.txt",
    icon: "/public/icons/Notepad document.ico",
    type: "program",
    selected: false,
    location: {
      top: 800,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full flex">
        <p className="h-full px-1 text-justify text-xl font-display">
          I&apos;m&nbsp;
          <b className="text-light-desktop font-bold">Senne Bels</b>, a 22-year
          old IT-graduate - and human.
          <br />
          <br />
          After having graduated in 2022, I started working as a frontend
          developer at the Agency of Home Affairs of Flanders, Belgium. However,
          my hunger for knowledge and my passion for technology led me to
          combine my job with another degree in Multimedia and Creative
          Technologies.
          <br />
          <br />
          It&apos;s always been my main ambition & dream to move abroad! -- and
          I&apos;m hoping to find a job that will allow me to do so.
          <br />
          <br />
          I&apos;m specialised as a web developer, but I majored in Big Data
          &amp; Artificial Intelligence. This, as well as the myriad business
          &amp; management courses I took, has blessed me with a very broad view
          on the world of IT.
          <br />
          <br />
          Outside of IT, I&apos;m a passionate gamer, and I love to create.
          Whether it&apos;s 3D, 2D, or even music, I&apos;m always looking for
          new ways to express myself. I&apos;m also a huge fan of the outdoors,
          and I am a huge zoology and history nerd.
          <br />
          <br />
          <b className="font-bold">Fun fact</b>: I love Okapi&apos;s and visit
          them in my local zoo whenever I can. This is what inspired my logo.
        </p>
      </div>
    ),
  },
];

function App() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextRef = useRef<HTMLDivElement>(null);
  const [mouseDownPosition, setMouseDownPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showSelectionBox, setShowSelectionBox] = useState(false);

  return (
    <div className="w-screen overflow-hidden h-screen flex font-display flex-col">
      <div
        onClick={() => {
          setShowContextMenu(false);
          desktopItems.forEach((item) => {
            item.selected = false;
          });
        }}
        className="bg-light-desktop w-full h-[95%] flex flex-col relative"
        id="desktop"
        // if right click show context menu
        onContextMenu={(e) => {
          e.preventDefault();
          // open the context menu in the place of the mouse
          contextRef.current!.style.left = e.clientX + "px";
          contextRef.current!.style.top = e.clientY + "px";

          setShowContextMenu(true);
        }}
        onMouseDown={(e) => {
          if (e.target.id === "desktop") {
            const selectionBox = document.getElementById(
              "selectionBox"
            ) as HTMLDivElement;

            selectionBox.style.left = e.clientX + "px";
            selectionBox.style.top = e.clientY + "px";
            selectionBox.style.width = "0px";
            selectionBox.style.height = "0px";

            setMouseDownPosition({ x: e.clientX, y: e.clientY });
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
        onMouseUp={(e) => {
          setShowSelectionBox(false);
        }}
      >
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
      </div>
      <Taskbar />
    </div>
  );
}

export default App;
