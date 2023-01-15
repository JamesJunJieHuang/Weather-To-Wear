import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import icon01d from "../icons/01d@2x.png";
import icon01n from "../icons/01n@2x.png";
import icon02d from "../icons/02d@2x.png";
import icon02n from "../icons/02n@2x.png";
import icon03d from "../icons/03d@2x.png";
import icon03n from "../icons/03n@2x.png";
import icon04d from "../icons/04d@2x.png";
import icon04n from "../icons/04n@2x.png";
import icon09d from "../icons/09d@2x.png";
import icon09n from "../icons/09n@2x.png";
import icon10d from "../icons/10d@2x.png";
import icon10n from "../icons/10n@2x.png";
import icon11d from "../icons/11d@2x.png";
import icon11n from "../icons/11n@2x.png";
import icon13d from "../icons/13d@2x.png";
import icon13n from "../icons/13n@2x.png";
import icon50d from "../icons/50d@2x.png";
import icon50n from "../icons/50n@2x.png";
import lightjacket from "../icons/lightjacket.png";
import pufferjacket from "../icons/pufferjacket.png";
import sweater from "../icons/sweater.png";
import tanktop from "../icons/tanktop.png";
import tshirt from "../icons/tshirt.png";
import mitten from "../icons/mitten.png";


function Card(props) {
  const handleDelete = (event) => {
    event.preventDefault();
    const updatedCardsList = props.cardsList.filter(
      (card, index) => index !== props.index
    );
    const dataString = JSON.stringify(updatedCardsList);
    props.setCardsList(updatedCardsList);
  };

  return (
    <div className="card">
      {/* Card {props.index} */}
      <br></br>
      <h2 className="cardTitle">{props.name}</h2>
      <br></br>
      <div className="cardHeader">
        <div className="weatherIcon">
          {props.iconID === "01d" && <img src={icon01d} />}
          {props.iconID === "01n" && <img src={icon01n} />}
          {props.iconID === "02d" && <img src={icon02d} />}
          {props.iconID === "02n" && <img src={icon02n} />}
          {props.iconID === "03d" && <img src={icon03d} />}
          {props.iconID === "03n" && <img src={icon03n} />}
          {props.iconID === "04d" && <img src={icon04d} />}
          {props.iconID === "04n" && <img src={icon04n} />}
          {props.iconID === "09d" && <img src={icon09d} />}
          {props.iconID === "09n" && <img src={icon09n} />}
          {props.iconID === "10d" && <img src={icon10d} />}
          {props.iconID === "10n" && <img src={icon10n} />}
          {props.iconID === "11d" && <img src={icon11d} />}
          {props.iconID === "11n" && <img src={icon11n} />}
          {props.iconID === "13d" && <img src={icon13d} />}
          {props.iconID === "13n" && <img src={icon13n} />}
          {props.iconID === "50d" && <img src={icon50d} />}
          {props.iconID === "50n" && <img src={icon50n} />}
        </div>
        <br></br>
        <div>
          <p>
            <div className="cardTemp">
              {Math.floor(((props.temp - 273.15) * 9) / 5 + 32)} °F
            </div>
          </p>
          <p className="cardDesc"> {props.weatherDesc} </p>
          <p className="cardfeelslike">
            {" "}
            Feels like:{" "}
            {Math.floor(((props.feelsLikeTemp - 273.15) * 9) / 5 + 32)} °F
          </p>
          <p className="recc">{props.clothes}</p>
          <div className="clothesicon">
            {props.clothes === "Brrrr... It's chilly. Wear a jacket" && (
              <div>
                <img src={pufferjacket} />
              </div>
            )}
            {props.clothes === "Brace yourselves. Winter is coming." && (
              <div>
                <img src={pufferjacket} />
                <img src={mitten} />
              </div>
            )}
            {props.clothes === "Light Jacket Season" && (
              <div>
                <img src={lightjacket} />
              </div>
            )}
            {props.clothes === "Sweater Weather" && (
              <div>
                <img src={sweater} />
              </div>
            )}
            {props.clothes === "T-shirt Type Of Day" && (
              <div>
                <img src={tshirt} />
              </div>
            )}
            {props.clothes === "Sun's Out Guns Out" && (
              <div>
                <img src={tanktop} />
              </div>
            )}
          </div>
          <br></br>
          <Button
            style={{ fontSize: "10px", padding: '3px 6px'}}
            onClick={handleDelete}
            size="small"
            variant="contained"
            startIcon={<DeleteIcon style={{ fontSize: "13px" }} />}
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
