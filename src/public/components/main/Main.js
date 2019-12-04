import React from "react";

import DisplayHeroContainer from "./DisplayHeroContainer";

class Main extends React.PureComponent{
  render(){
    return(
      <main>
        <DisplayHeroContainer heroCardData = {this.props}/>
      </main>
    )
  }
}

export default Main;