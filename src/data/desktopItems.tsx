import ThreeDProject from "../ThreeDProject";
import { gameProjects } from "./gameProjects";
import { webProjects } from "./webProjects";

export const desktopItems = [
  {
    name: "My Projects",
    icon: "/icons/Folder.ico",
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
    icon: "/icons/Folder.ico",
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
    icon: "/icons/Folder.ico",
    type: "program",
    selected: false,

    location: {
      top: 200,
      left: 10,
    },
    actionChildren: <ThreeDProject />,
  },
  {
    name: "Recycle Bin",
    icon: "/icons/Recycle Bin with document.ico",
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
              className="object-contain w-full h-[85%] flex"
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
    icon: "/icons/Earth (16 colors).ico",
    type: "program",
    selected: false,
    location: {
      top: 400,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full overflow-hidden">
        <iframe
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
    icon: "/me.jpeg",
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
    icon: "/icons/Book.ico",
    type: "pdf",
    selected: false,
    location: {
      top: 600,
      left: 10,
    },
    actionChildren: (
      <div className="w-full h-full flex">
        <iframe className="w-full" src="/SenneBelsCV.pdf"></iframe>
      </div>
    ),
  },
  {
    name: "Minecraft.exe",
    icon: "/assets/games/grass.png",
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
    icon: "/icons/Notepad document.ico",
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
