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
}

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
      set((state) => ({
        windows: [
          ...state.windows,
          { ...window, id: `${Date.now()}`, selected: true },
        ],
      })),
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
  }))
);
