import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const workTime = 25;
  const breakTime = 5;
  const [cycles, setCycles] = useState(0);
  const [work, setWork] = useState(true);
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(workTime);
  const [intervalId, setIntervalId] = useState(null);
  const [clockStarted, setClockStarted] = useState(false);

  useEffect(() => {
    if (time === -1 && minutes === 0) {
      clearInterval(intervalId);
      setMinutes(work ? breakTime : workTime);
      setWork(!work);
      setTime(0);
      startTimer();
    } else if (time === -1) {
      setMinutes((minutes) => minutes - 1);
      setTime(59);
    }
  });

  const startTimer = () => {
    if (!clockStarted) setClockStarted(true);
    // setTime(5);
    if (cycles !== 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      setIntervalId(interval);
      setCycles((cycles) => cycles - 1);
      return () => clearInterval(interval);
    } else {
      setClockStarted(false);
      return;
    }
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: work ? "#77DD66" : "#FF2626" }}
      >
        <p style={{ display: clockStarted ? "none" : "block" }}>
          <label for="cycleIP" />
          <input
            id="cycleIP"
            placeholder="Enter Cycles"
            onInput={(e) =>
              setCycles(
                e.target.value === "" ? 0 : parseInt(e.target.value) * 2
              )
            }
          />
          <br />
          <button
            className="startButton"
            onClick={() => {
              startTimer();
            }}
            style={{
              backgroundColor: work ? "#77DD66" : "#FF2626",
              boxShadow: `7px 7px 15px ${work ? "#58a44b" : "#bd1c1c"},
                         -7px -7px 15px ${work ? "#96ff81" : "#ff3030"}`,
            }}
          >
            Start the timer
          </button>
          <br />
        </p>
        <p style={{ fontSize: "100px" }}>
          {parseInt(minutes / 10) === 0 ? "0" + minutes : minutes}:
          {parseInt(time / 10) === 0 ? "0" + time : time}
        </p>
        <p
          id="statusPara"
          style={{
            backgroundColor: work ? "#77DD66" : "#FF2626",
            boxShadow: `22px 22px 44px ${work ? "#58a44b" : "#bd1c1c"},
                       -22px -22px 44px ${work ? "#96ff81" : "#ff3030"}`,
          }}
        >
          {work ? "WORK" : "BREAK"} TIME
        </p>
      </header>
    </div>
  );
}

export default App;
