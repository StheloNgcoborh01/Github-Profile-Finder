import React from "react";
import "./cssFolder/History.css";


function History(props) {
  const user = props.history || [];

  function GetTimeago(timestamp) {
    if (!timestamp) return "Just now";
    const timeNow = Date.now();

    const difference = timeNow - timestamp;

    const DiffSecs = Math.floor(difference / 1000);
    const DiffMin = Math.floor(DiffSecs / 60);
    const DiffHours = Math.floor(DiffMin / 60);

    if (DiffMin < 1) return `${DiffSecs} sec ago`;
    else if (DiffHours < 1) return `${DiffMin} min ago`;
    else if (DiffHours < 24) return `${DiffHours} hours ago`;
    else return `${Math.floor(DiffHours / 24)} d ago`;
  }

  
  return (
    <>
      <div className={props.className}>
        <aside className="history-panel">
          <h2 className="history-title">Recent Searches</h2>

          <ul className="history-list">
            {user.map((user, index) => {
              return (
                <li
                  className="history-item"
                  key={index}
                  onClick={() => {
                    props.setUserdata(user); // select user
                    if (props.onClose) props.onClose(); // hide panel
                  }}
                >
                  <div className="history-info">
                    <img src={user.data.avatar_url} alt="avatar" />
                    <span className="history-username">{user.data.login}</span>
                    <span className="history-date">
                      {GetTimeago(user.timestamp)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default History;
