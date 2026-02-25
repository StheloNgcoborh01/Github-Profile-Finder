import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./cssFolder/App.css";
import History from "./History";
import Content from "./Content";



function App() {
  //this is the main app

  const [UserData, setUserData] = useState( () => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : "";
  }); 
  const [error, SetNewError] = useState(null);

  const [history, SetNewHistory] = useState( () =>{
    const HistorySaved = localStorage.getItem("HistorySaved");
    return HistorySaved ? JSON.parse(HistorySaved) : [] ;

  }); 
  const [showHistory, setShowHistory] = useState(false); // les state is boolean if a use pres the show history it true ..then history panel is shown
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // le state si check screen size then return true or false bas eon it..


  // Listen for window resize to toggle mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // if the arguemnt is true..then the ismobile is true..
      if (window.innerWidth > 768) setShowHistory(false); // hide mobile panel on desktop iif it false the the value is false
    };
    window.addEventListener("resize", handleResize); // this listens to the resize then pas the value of true or false
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(UserData));
  }, [UserData]);

  useEffect( () =>{
    localStorage.setItem("HistorySaved", JSON.stringify(history));
  }, [history] );
  
  return (
    <>
      <div className="container">
        <Header
          className="Head"
          setUserdata={setUserData}
          SetNewError={SetNewError}
          SetNewHistory={SetNewHistory}
          toggleHistory={() => setShowHistory((prev) => !prev)}
          isMobile={isMobile}
        />

        <History
          className="History"
          history={history}
          key={history.id}
          setUserdata={setUserData}
        />

        {isMobile && showHistory && (
          <div
            className="HistoryMobile"
            onClick={() => setShowHistory(false)} 
          >
            <div
              className="HistoryMobileContent"
              onClick={(e) => e.stopPropagation()}
            />

            <History
              className="history-panel-mobile"
              history={history}
              setUserdata={setUserData}
              onClose={() => setShowHistory(false)} // allow li click to close
            />
          </div>
        )}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {UserData && <Content className="Content" UserData={UserData} />}
      </div>
    </>
  );
}

export default App;
