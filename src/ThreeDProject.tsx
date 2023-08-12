import { useState } from "react";
import { threeDProjects } from "./data/threeDProjects";
export default function ThreeDProject() {
  const [selectedProject, setSelectedProject] = useState(threeDProjects[0]);
  const [showAction, setShowAction] = useState(false);

  return (
    <>
      {threeDProjects.map((project) => (
        <>
          <button
            key={project.name}
            onClick={() => {
              setSelectedProject(project);
              setShowAction(true);
            }}
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
          </button>
        </>
      ))}
      {/* {showAction && (
        <Window
          // actionChildren={
          //   selectedProject.models ? (
          //     selectedProject.models[0]
          //   ) : (
          //     <img
          //       src={selectedProject.images[0]}
          //       alt={selectedProject.name}
          //       className="w-full h-full flex object-cover"
          //     />
          //   )
          // }
        />
      )} */}
    </>
  );
}
