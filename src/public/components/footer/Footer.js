import React from "react";

class Footer extends React.PureComponent{
  render(){
    return(
      <footer style ={footerStyle}>
        <div style = {footerTextContainer}>
          <span style = {footerTextStyle}>Marvelous App</span>
          <span style = {footerCreditsStyle}>ρBotic</span>
        </div>
      </footer>
    )

  }
}

export default Footer;

const footerStyle = {
  backgroundColor: "#001f3f",
  height: "4rem"
};

const footerTextContainer = {
  height: "100%",
  width: "50%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center"
};

const footerTextStyle = {
  color: "#7FDBFF",
  fontSize: "1.25rem"
};

const footerCreditsStyle = {
  color: "#7FDBFF",
  fontSize: ".75rem",
}