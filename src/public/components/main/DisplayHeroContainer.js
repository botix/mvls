import React, {Component} from "react";

import HeroCard from "./HeroCard";

class DisplayHeroContainer extends Component{
  render(){
    return(
      <div>
        <HeroCard heroCardData = {this.props}/>
      </div>
    )
  }
}

export default DisplayHeroContainer;