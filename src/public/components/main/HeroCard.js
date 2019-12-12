import React from "react";

export const Card = props => (
  <div style = {cardStyle} onClick = {props.handleFavorite} title={props.hero.name}>
    <img
      alt="hero-image"
      src={`${props.hero.thumbnail.path}/standard_xlarge.${props.hero.thumbnail.extension}`}
      style={imgStyle}
      title={props.hero.name}
    />
    <h2 style = {heroNameStyle} title={props.hero.name}> {props.hero.name} </h2>
    <p title={props.hero.name}> {props.hero.description} </p>
  </div>
);


const cardStyle = {
  "display": "flex",
  "flexDirection": "column",
  "alignItems": "center",
  "backgroundColor": "#95dada",
  "border": "1px solid gray",
  "bordeRadius": ".25rem",
  "margin": "0.5rem",
  "padding": "1rem",
  "cursor": "pointer"
};

const imgStyle = {

  "marginBottom": ".5rem",
  "maxWidth": "200px"
};

const heroNameStyle = {
  "marginBottom": ".5rem",
  "fontWeight": "bold",
  "fontSize": "1.25rem",
  "textAlign": "center"
};
