import React from "react";
import { Link } from "react-router-dom";

import "./navigation.css";

class Navigation extends React.PureComponent{
  render(){
    return(
        <nav className = "nav">
          <ul className = "ul">
            <li>
              <Link to="/" className = "link">Hero Index</Link>
            </li>
            <li>
              <Link to ="/favoriteheroes" className = "link">FavoriteHeroes</Link>
            </li>
            <li>
              <Link to = "/" className = "link" onClick = {this.props.signOut}>Sign Out</Link>
            </li>
          </ul>
        </nav>
    )
  }
}

export default Navigation;