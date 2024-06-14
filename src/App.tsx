/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { startupSound } from "./utils/sounds";
import { useWindowsStore } from "./utils/store";
import { clickSound } from "./utils/sounds";

function App() {
  const alreadyVisited = useWindowsStore((state: any) => state?.alreadyVisited);
  const setAlreadyVisited = useWindowsStore(
    (state: any) => state?.setAlreadyVisited
  );
  const windows = useWindowsStore((state: any) => state?.windows);

  useEffect(() => {
    if (!alreadyVisited) {
      startupSound.play();
      setAlreadyVisited(true);
    }
  }, [alreadyVisited, setAlreadyVisited]);

  return (
    <div
      onClick={() => {
        clickSound.play();
      }}
      className="w-screen overflow-hidden h-screen flex font-display flex-col"
    >
      <Desktop>
        {Array.isArray(windows) &&
          windows.map((window: any) => (
            <Window id={window.id} key={window.id} />
          ))}
      </Desktop>
      <Taskbar />
    </div>
  );
}

export default App;
