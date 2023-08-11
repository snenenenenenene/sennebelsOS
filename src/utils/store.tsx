/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { Race } from "@/data/races/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useWindowsStore = create()(
  devtools(
    persist(
      (set) => ({
        setWindows: (windows: any) => set({ windows }),
        appendWindow: (window: any) =>
          set((state: any) => ({ windows: [...state.windows, window] })),
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
