import React from "react";
import PropTypes from 'prop-types';

import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

import "./header.css"

class Header extends React.PureComponent{
  render(){
    return(
      <header className = "app-header">
        <Logo />
        <Navigation signOut = {this.props.signOut}/>
      </header>
    )
  }
}

export default Header;


Header.propTypes = {
  signOut: PropTypes.func
};

