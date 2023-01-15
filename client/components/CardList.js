import React, { Component, Fragment, useEffect, useState } from "react";
import Card from "./Card";

function CardList(props) {

  return (
    <Fragment>
      <div className="cardHolder">
        {props.cardsList.map((weather, index) => (
          <Card
            key={index}
            name={weather.name}
            index={index}
            coord={weather.coord}
            temp={weather.main.temp}
            feelsLikeTemp={weather.main.feels_like}
            weatherDesc={weather.weather[0].description}
            clothes={weather.clothes}
            cardsList={props.cardsList}
            setCardsList={props.setCardsList}
            iconID={weather.weather[0].icon}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default CardList;