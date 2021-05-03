import { useState } from "react";

// useVisualMode handles transitons between state && allows user to transition forward/backward between modes

const useVisualMode = (x) => {
  const [mode, setMode] = useState(x);
  const [history, setHistory] = useState([x]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
      return;
    } 
    setMode(mode);
    setHistory([...history.slice(0, -1), mode])
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;


