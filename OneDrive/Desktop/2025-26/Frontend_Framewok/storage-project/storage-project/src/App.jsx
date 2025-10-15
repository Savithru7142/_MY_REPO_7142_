import { useEffect } from "react";
import { useState } from "react"

function App() {
  //state variable for localstorage
  const [localCount,setaLocalCount] = useState(()=>{
    const saved = localStorage.getItem("localCount");
    return saved ? Number(saved) : 0;
  });

  //state variable for sessionstorage
  const [sessionCount,setSessionCount] = useState(()=>{
    const saved = sessionStorage.getItem("sessionCount");
    return saved ? Number(saved) : 0;
  });

  //update localCount in localstorage
  useEffect(()=>{
    localStorage.setItem("localCount",localCount);
  },[localCount]);//first param: action to be taken, second param: dependency

  //update sessionCount in sessionstorage
  useEffect(()=>{
    sessionStorage.setItem("sessionCount",sessionCount);
  },[sessionCount]);   
  return (
    <>
      <div className="container">
        <h1>React Counter Example</h1>
        <div className="card">
          <h2>Local Counter Value:</h2>
          {localCount} <br/>
          <button onClick={()=>{setaLocalCount(localCount+1)}}>Increment</button>
          <button onClick={()=>{setaLocalCount(0)}}>Reset</button>
        </div>
        <div className="card">
          <h2>Session Counter Value:</h2>
          {sessionCount}<br/>
          <button onClick={()=>setSessionCount(sessionCount+1)}>Increment</button>
          <button onClick={()=>{setSessionCount(0)}}>Reset</button>
        </div>
      </div>      
    </>
  )
}

export default App
