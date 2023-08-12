/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { Race } from "@/data/races/types";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TWindow = {
  id: string;
  name: string;
  icon: string;
  type: string;
  actionChildren: React.ReactNode;
  selected: boolean;
  minimised: boolean;
  maximised: boolean;
  location: { left: number | string; top: number | string };
  size: { width: number; height: number };
};

export const useWindowsStore = create()(
  devtools(
    persist(
      (set) => ({
        getWindow: (id: string) =>
          set((state: any) => {
            return state.windows.find((w: any) => w.id === id);
          }),
        setWindow: (window: any) =>
          set((state: any) => {
            const index = state.windows.findIndex(
              (w: any) => w.id === window.id
            );
            state.windows[index] = window;
            return state;
          }),
        setWindows: (windows: any) => set({ windows }),
        // append a window and give it a unique id with nanoid
        appendWindow: (window: any) =>
          set((state: any) => ({
            windows: [
              ...state.windows,
              {
                ...window,
                id: nanoid(),
                location: {
                  left: window?.innerHeight / 2 - 250,
                  top: window?.innerWidth / 2 - 250,
                },
                minimised: false,
                maximised: false,
                actionChildren: window.actionChildren || null,
              },
            ],
          })),
        removeWindow: (window: any) =>
          set((state: any) => ({
            windows: state.windows.filter((w: any) => w.id !== window.id),
          })),
        windows: [],
      }),
      {
        name: "OS-storage",
      }
    )
  )
);
