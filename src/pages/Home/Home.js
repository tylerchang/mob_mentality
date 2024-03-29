import React, { useState } from "react";
import "./Home.css";
import { View } from "react-native";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import { hostNewGame, joinGame } from "../../firebase/database2";

const initialValues = {
  name: "",
  invitecode: "",
};

function Home() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const navigate = useNavigate();

  const togglePopup1 = () => {
    setIsOpen1(!isOpen1);
  };
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const new_game_values = (await hostNewGame(values.name));
    const new_host_data_id = new_game_values.player_id
    const room_id = new_game_values.room_id
    console.log(new_host_data_id);
    // localStorage player name
    localStorage.setItem("player_data", JSON.stringify(new_host_data_id));
    
    // localStorage room id
    localStorage.setItem("room_id", JSON.stringify(room_id));
    console.log(room_id);
    navigate("/lobby");
    /*navigate("/lobby", {
      state: {
        player_data: new_host_data_id,
      },
    }); */
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log(values.name, values.invitecode);
    
    const join_game_values = (await joinGame(values.name, values.invitecode));
    const new_player_data_id = join_game_values[1];
    const room_id = join_game_values[0];
    
    console.log("New player id:", new_player_data_id);
    // localStorage player name
    localStorage.setItem("player_data", JSON.stringify(new_player_data_id));
   
    // localStorage room id
    localStorage.setItem("room_id", JSON.stringify(room_id));
    navigate("/lobby");
    /*navigate("/lobby", {
      state: {
        player_data: new_player_data_id,
      },
    }); */
  };

  return (
    <div className="home">
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="title"> Majority-Minority </h1>
        <div className="homebuttons">
          <button className="hostbutton" onClick={togglePopup1}>
            {" "}
            Host New Game{" "}
          </button>
        </div>
        <div className="homebuttons">
          <button className="joinbutton" onClick={togglePopup2}>
            {" "}
            Join Game{" "}
          </button>
        </div>
        <Link to="/howtoplay" style={{ textDecoration: "none" }}>
          <h2 className="howtoplay">How to play</h2>
        </Link>
      </View>

      {isOpen1 && (
        <Popup
          content={
            <>
              <div className="hostPopup">
                <form onSubmit={handleSubmit1}>
                  <label>
                    {" "}
                    Enter Name
                    <br />
                    <div className="divider" />
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      placeholder="Nickname"
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <div className="divider" />
                  <button className="submitButton" type="submit" value="submit">
                    Let's Go
                  </button>
                </form>
              </div>
            </>
          }
          handleClose={togglePopup1}
        />
      )}

      {isOpen2 && (
        <Popup
          content={
            <>
              <div className="hostPopup">
                <form onSubmit={handleSubmit2}>
                  <label>
                    {" "}
                    Enter Name
                    <br />
                    <div className="divider" />
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      placeholder="Nickname"
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <div className="divider" />
                  <label>
                    {" "}
                    Enter Invite Code
                    <br />
                    <div className="divider" />
                    <input
                      type="text"
                      name="invitecode"
                      value={values.invitecode}
                      placeholder="Code"
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <div className="divider" />
                  <button className="submitButton" type="submit" value="submit">
                    Let's Go
                  </button>
                </form>
              </div>
            </>
          }
          handleClose={togglePopup2}
        />
      )}
    </div>
  );
}

export default Home;
