import React from "react";
import { Card } from "./HeroCard";

export const HeroList = props => (

  <div style ={heroListStyle}>
    {props.heroes.map(hero => (
      <Card 
        key={hero.id} 
        hero={hero} 
        handleFavorite={props.handleFavorite}
        favoriteHeroList={props.favoriteHeroList}
      />
    ))}
  </div>

);

const heroListStyle = {
  "width": "99%",
  "margin": "0 auto",
  "display":"grid",
  "gridTemplateColumns": "repeat(auto-fill, minmax(250px, 1fr))"
};
