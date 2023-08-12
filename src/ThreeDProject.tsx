/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
  SoftShadows,
} from "@react-three/drei";
import { nanoid } from "nanoid";
import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { threeDProjects } from "./data/threeDProjects";
import { useWindowsStore } from "./utils/store";

export function Backdrop() {
  return (
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={1}
      scale={100}
      color="0xffae00"
      rotation={[0, Math.PI / 4, 0]}
      position={[0, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={1}
        ambient={0}
        position={[0, 6, 10]}
      />
    </AccumulativeShadows>
  );
}

export default function ThreeDProject() {
  const appendWindow = useWindowsStore((state: any) => state?.appendWindow);

  return (
    <>
      {threeDProjects.map((project) => (
        <div key={nanoid()}>
          <button
            key={project.name}
            onClick={() => {
              appendWindow({
                name: project.name,
                icon: project.images[0] || "/icons/3D computer.ico",
                type: "3d",
                actionChildren: project.models ? (
                  <Canvas
                    shadows
                    orthographic
                    camera={{ zoom: 30, position: [0, 20, -100] }}
                    className="w-full h-full flex"
                  >
                    <OrbitControls autoRotate autoRotateSpeed={1} />

                    <ambientLight intensity={0.2} castShadow />
                    <pointLight
                      castShadow
                      receiveShadow
                      position={[10, 10, 10]}
                    />
                    <Backdrop />
                    <SoftShadows samples={100} />
                    <Environment preset="sunset" />
                    {/* <color attach="background" args={[0xffae00]} /> */}
                    <Suspense fallback={null}>{project.models[0]}</Suspense>
                    {/* add a big rectange underneath the object */}
                  </Canvas>
                ) : (
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full flex object-cover"
                  />
                ),
              });
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
        </div>
      ))}
    </>
  );
}
