import create from "zustand";
import { devtools } from "zustand/middleware";

interface Window {
  id: string;
  name: string;
  icon: string;
  type: string;
  selected: boolean;
  minimised: boolean;
  maximised: boolean;
  location: { left: number; top: number };
  size: { width: number; height: number };
  actionChildren: React.ReactNode;
  zIndex: number;
}

interface Store {
  windows: Window[];
  selectedEntries: string[];
  alreadyVisited: boolean;
  setAlreadyVisited: (visited: boolean) => void;
  deselectAll: () => void;
  setOnlySelected: (id: string) => void;
  appendWindow: (
    window: Partial<Window> & Pick<Window, "name" | "icon" | "type">
  ) => void;
  removeWindow: (id: string) => void;
  toggleMinimiseWindow: (id: string) => void;
  toggleMaximiseWindow: (id: string) => void;
  updateWindowLocation: (
    id: string,
    location: { left: number; top: number }
  ) => void;
  updateWindowSize: (
    id: string,
    size: { width: number; height: number }
  ) => void;
  bringWindowToFront: (id: string) => void;
}

let nextZIndex = 1;

export const useWindowsStore = create<Store>(
  devtools((set) => ({
    windows: [],
    selectedEntries: [],
    alreadyVisited: false,
    setAlreadyVisited: (visited: boolean) => set({ alreadyVisited: visited }),
    deselectAll: () => set({ selectedEntries: [] }),
    setOnlySelected: (id) =>
      set((state) => ({
        selectedEntries: [id],
        windows: state.windows.map((window) => ({
          ...window,
          selected: window.id === id,
        })),
      })),
    appendWindow: (window) =>
      set((state) => {
        const existingWindows = state.windows;
        const newLeft = 100 + existingWindows.length * 30;
        const newTop = 100 + existingWindows.length * 30;
        return {
          windows: [
            ...existingWindows,
            {
              ...window,
              id: `${Date.now()}`,
              selected: true,
              zIndex: nextZIndex++,
              location: { left: newLeft, top: newTop },
              size: { width: 1000, height: 600 },
            },
          ],
        };
      }),
    removeWindow: (id) =>
      set((state) => ({
        windows: state.windows.filter((window) => window.id !== id),
      })),
    toggleMinimiseWindow: (id) =>
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id
            ? { ...window, minimised: !window.minimised }
            : window
        ),
      })),
    toggleMaximiseWindow: (id) =>
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id
            ? { ...window, maximised: !window.maximised }
            : window
        ),
      })),
    updateWindowLocation: (id, location) =>
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? { ...window, location } : window
        ),
      })),
    updateWindowSize: (id, size) =>
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? { ...window, size } : window
        ),
      })),
    bringWindowToFront: (id) =>
      set((state) => ({
        windows: state.windows.map((window) => ({
          ...window,
          zIndex: window.id === id ? nextZIndex++ : window.zIndex,
        })),
      })),
  }))
);
