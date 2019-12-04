import React from "react";

class Navigation extends React.PureComponent{
  render(){
    return(
      <nav>
        <ul>
          <li><a href ="">All Heroes</a></li>
          <li><a href =""> My favorites</a></li>
          <li><a href ="">Logout</a></li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;