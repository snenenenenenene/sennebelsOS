"use client";

import { ReactNode } from "react";
import { Kiki } from "./models/Kiki";
export const threeDProjects: {
  id: number;
  name: string;
  source?: string;
  technologies: string[];
  description: string;
  images: string[];
  link?: string;
  models?: ReactNode;
}[] = [
  {
    id: 1,
    name: "House",
    technologies: ["blender", "proceduralGeneration"],
    description: "Asset made for Principles of Game Design Class",
    images: ["/assets/threeD/house.png"],
  },
  {
    id: 2,
    name: "Laptop",
    technologies: ["blender"],
    description: "Asset made for Visual Design Class",
    images: ["/assets/threeD/laptop.png"],
  },
  {
    id: 3,
    name: "pangolin",
    technologies: ["blender"],
    description: "",
    images: ["/assets/threeD/pangolin.png"],
  },
  {
    id: 4,
    name: "room",
    technologies: ["blender"],
    description: "",
    images: ["/assets/threeD/room.png"],
  },
  {
    id: 5,
    name: "velociraptor",
    technologies: ["blender", "proceduralGeneration"],
    description: "",
    images: ["/assets/threeD/velociraptor.png"],
  },
  {
    id: 6,
    name: "Kiki",
    technologies: ["blender"],
    description: "",
    images: ["/assets/threeD/kiki.png"],
    models: [<Kiki key={"kiki"} />],
  },
  // {
  //   id: 8,
  //   name: "Animals",
  //   technologies: ["blender"],
  //   description: "",
  //   images: ["/assets/threeD/animals.png"],
  // },
];
