/* eslint-disable @typescript-eslint/no-explicit-any */
import Desktop from "./Desktop";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { useWindowsStore } from "./utils/store";

function App() {
  const windows = useWindowsStore((state: any) => state?.windows);
  return (
    <div className="w-screen overflow-hidden h-screen flex font-display flex-col">
      <Desktop>
        {windows &&
          windows.map((window: any) => (
            <Window id={window.id} key={window.id} />
          ))}
      </Desktop>
      <Taskbar />
    </div>
  );
}

export default App;
