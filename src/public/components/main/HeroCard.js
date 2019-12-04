import React, {Component} from "react";


class HeroCard extends Component{

  render(){
    return(
      <div style={itemStyle}>
        <p>Hello from HeroCard the color of wich is {this.props.color}</p>
        <p>Lets suppose we need to go back, and fetch something else from state such as {this.props.somethingINeed}</p>
      </div>
    )
  }
} 

const itemStyle = {
  color: "#000",
  // backgroundColor: "#777777"  
}


export default HeroCard;




// TypeCheck za propsove koje dolaze