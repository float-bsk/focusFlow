import { useState } from "react"
import "../index.css";

const Stats = () => {

  const [showText, setShowText] = useState(false);
  const [minsCounter, setMinsCounter] = useState(0);
  const [secsCounter, setSecsCounter] = useState(0);
  const [intervalID, setIntervalID] = useState<number | null | undefined>(null);

  function handleChange() {
    if (showText) setShowText(false)
    else setShowText(true)
  }

  function startTimer() {
    if (secsCounter === 60) {
      setMinsCounter(prev => prev + 1);
      setSecsCounter(0);
    }
    setSecsCounter(prev => prev + 1);
  }
  let timer = null;

  function handleStartTimer() {
    console.log("this handler was called")
    if (intervalID) return;
    if ((minsCounter * 60) + secsCounter === 61) {
      if (intervalID) clearInterval(intervalID);
      return;
    }
    timer = setInterval(() => {
      startTimer()
    }, 1000);
    setIntervalID(timer);
  }
  console.log(secsCounter, minsCounter);
  function handleStopTimer() {
    console.log(intervalID)
    if (intervalID)
      clearInterval(intervalID);
    setIntervalID(null);
    console.log("After clearing IntervalID: " + intervalID);
  }

  function handleReset() {
    if (intervalID) clearInterval(intervalID);
    setIntervalID(null);
    setSecsCounter(0);
    setMinsCounter(0);
    handleStartTimer();
  }
  const digits:{x:number,y:number}[] = [];
  for (let i = 1; i <= 12; i++) {
     digits.push(drawpoint(150, i, 12));
  }
 
  function drawpoint(r:number, currentPoint:number, totalPoints:number) {
    const theta = ((Math.PI * 2) / totalPoints);
    const angle = (theta * currentPoint);
    const x = (r * Math.cos(angle));
    const y = (r * Math.sin(angle));
   
    return{x,y};
  }

  return (
    <div>
      <input id="options" name="options" type="checkbox" checked={showText} onChange={handleChange} />
      {showText && <button onClick={() => setShowText(false)}>Close Manually</button>}
      <div className="flex flex-col my-2 p-2 gap-4 w-96">
        <p className="p-4"><span>{minsCounter}</span>:
          <span>{secsCounter}</span></p>
        <div className="flex gap-4">
          <button onClick={handleStartTimer}>Start</button>
          <button onClick={handleStopTimer}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div id="clock" className="relative margin-auto">
        <div className="clockbody border-amber-200 bg-orange-200 absolute h-80 w-80 rounded-[50%] top-[50%] translate-x-[-50%] left-[50%] -z-20">
            {digits.map((coords,index) => {
              let hour = (4+index)%12;
              if(hour === 0){hour=12};
              return <span key={index} className={`absolute`} 
                style={{
                  left:`calc(50% + ${coords.x}px)`, 
                  top:`calc(50% + ${coords.y}px)`,
                  transform: "translate(-50%, -50%)"
                }}
              >{hour}</span>
            })}
          <div className="relative w-full h-full">
            <div className="tick-everysecond absolute top-[50%] left-[50%] bg-black h-0.5 w-30">
              <span className="inline-block"></span>
            </div>
            <div className="tick-everyminute absolute top-[50%] left-[50%] bg-blue-800 h-1 w-25 ">
              <span className="inline-block"></span>
            </div>
            <div className="tick-everyhour absolute top-[50%] left-[50%] bg-green-800 h-1 w-20 ">
              <span className="inline-block"></span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hand"></div> */}
    </div>
  )
}

export default Stats