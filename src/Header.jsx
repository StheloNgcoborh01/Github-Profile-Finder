import react, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./cssFolder/Content.css";
import HistoryIcon from "@mui/icons-material/History";
import AboutButton from "./Aboutme";



function Header(props) {
  const [text, setHandleText] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"

  function HandleText(event) {
    const value = event.target.value;

    setHandleText(value);
  }

  const token = import.meta.env.VITE_MY_BEARER_TOKEN;

  async function GetUser() {
    setStatus("loading"); // start request, gradient is live
    const setUserdata = props.setUserdata;
    const SetNewError = props.SetNewError;
    const SetNewHistory = props.SetNewHistory;

    if (!text) {
      SetNewError("Please Try enter a UserName");
    } else
      try {
        const response = await fetch(`https://api.github.com/users/${text}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status : ${response.status}`);
        }
        const data = await response.json();
        setUserdata({ data, timestamp: Date.now() });


        SetNewHistory((prev) => {
          const newHistory = [{ data, timestamp: Date.now() }, ...prev];
          console.log(newHistory);
          return newHistory.slice(0, 3);
        });

        SetNewError(null);
        setStatus("success"); // success gradient
      } catch (err) {
        console.log(err);
        SetNewError(err.message);
        setUserdata(null);
        setStatus("error"); // error gradient
      }
  }

  return (
    <>
      <div className={`Head ${status}`}>

        <AboutButton />

        <TextField
          id="outlined-basic"
          label="Enter UserName"
          variant="outlined"
          onChange={HandleText}
        />
        <Button id="SendBtn" variant="contained" onClick={GetUser}>
          Get User
        </Button>

        {props.isMobile && (
          <button
            style={{ marginLeft: "20px" }}
            onClick={props.toggleHistory}
            id="history-button"
          >
            <HistoryIcon />
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
