import React from "react";
import "./cssFolder/App.css";
import InfoIcon from '@mui/icons-material/Info';

function AboutButton() {
  const handleClick = () => {
    window.open("https://github.com/StheloNgcoborh01", "_blank");
  };

  return (
    <button onClick={handleClick} className="AboutMe">
     <InfoIcon /> About Me
    </button>
  );
}

export default AboutButton;
