import React from "react";

class Logo extends React.PureComponent{
  render(){
    return(
      <div style = {logoStyle}>Marvel Superheroes</div>
    )
  }
}

export default Logo;

const logoStyle = {
  color: "#7FDBFF",
  padding: "1rem"
}