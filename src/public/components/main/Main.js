import React from "react";

import DisplayHeroContainer from "./DisplayHeroContainer";

class Main extends React.PureComponent{
  render(){
    return(
      <main style = {mainStyle}>
        <DisplayHeroContainer heroCardData = {this.props}/>
      </main>
    )
  }
}

export default Main;

const mainStyle = {
  backgroundColor: "#FFF",
}