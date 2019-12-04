import React from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

class Header extends React.PureComponent{
  render(){
    return(
      <header>
        <Logo />
        <Navigation />
      </header>
    )
  }
}

export default Header;