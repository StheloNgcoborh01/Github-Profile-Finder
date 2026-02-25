import React from "react";
import "./cssFolder/Content.css";

function Content(props) {

   const user = props.UserData;

  return (
    
    <div className={props.className}>
      <div className="content">
        <div className="profile-card">
          <img className="avatar" src= {user.data?.avatar_url || "src/images/1712174656228.jpg" } />
          <div className="profile-info">
            <h2 className="name"> {user.data?.name} </h2>
            <p className="username"> {user.data?.login} </p>
            <p className="bio"> {user.data?.bio}</p>

            <div className="stats">
              <div className="stat">
                <span className="number">{user.data?.public_repos}</span>
                <span className="label">Repos</span>
              </div>

              <div className="stat">
                <span className="number">{user.data?.followers}</span>
                <span className="label">Followers</span>
              </div>

              <div className="stat">
                <span className="number">{user.data?.following}</span>
                <span className="label">Following</span>
              </div>
            </div>

            <div className="extra">
              <p>{user.data?.location}</p>
              <p> {user.data?.email}</p>
              <a href={user.data?.html_url}> {user.data?.html_url} </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Content;
