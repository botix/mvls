import React from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

class Header extends React.PureComponent{
  render(){
    return(
      <header style = {headerStyle}>
        <Logo />
        <Navigation />
      </header>
    )
  }
}

export default Header;

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#001f3f",
  fontSize: "2rem",
  minHeight: "4rem",
}

