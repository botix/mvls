import React from "react";
import PropTypes from 'prop-types';

export const Card = props => (
  <div
    onClick = {props.handleFavorite} 
    title={props.hero.name}
    style = {{
      "display": "flex",
      "flexDirection": "column",
      "alignItems": "center",
      "backgroundColor": props.favoriteHeroList.some(favorite => favorite.name === props.hero.name) ? "#b29700" :"#95dada",
      "border": "1px solid gray",
      "bordeRadius": ".25rem",
      "margin": "0.5rem",
      "padding": "1rem",
      "cursor": "pointer"
    }} 
  > 
    <img
      alt="hero-image"
      src={`${props.hero.thumbnail.path}/standard_xlarge.${props.hero.thumbnail.extension}`}
      title={props.hero.name}
      style={imgStyle}
    />
    <h2 style = {heroNameStyle} title={props.hero.name}> {props.hero.name} </h2>
    <p title={props.hero.name}> {props.hero.description} </p>
  </div>
);

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

Card.propTypes = {
  hero: PropTypes.object,
  handleFavorite: PropTypes.func,
  favoriteHeroList: PropTypes.array
};