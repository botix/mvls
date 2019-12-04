import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";

class Navigation extends React.PureComponent{
  render(){
    return(
        <nav style = {navigationStyle}>
          <ul style = {ulStyle}>
            <li>
              <Link to="/" exact>Hero Index</Link>
            </li>
            <li>
              <Link to ="/favoriteheroes">FavoriteHeroes</Link>
            </li>
            <li>
              <Link to = "/login">Sign Out</Link>
            </li>
          </ul>
        </nav>
    )
  }
}

export default Navigation;

const navigationStyle = {
  width: "50%",
}

const ulStyle = {
  display: "flex",
  justifyContent: "space-between",
}