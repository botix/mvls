import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "./navigation.css";

class Navigation extends React.PureComponent{
  render(){
    return(
        <nav className = "nav">
          <ul className = "ul">
            <li>
              <Link to="/" className = "link">Heroes</Link>
            </li>
            <li>
              <Link to ="/favoriteheroes" className = "link">Favorites</Link>
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

Navigation.propTypes = {
  signOut: PropTypes.func
};