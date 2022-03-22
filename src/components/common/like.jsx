import React, { Component } from "react";

class Like extends Component {
  state = {};

  getClaasesHeart() {
    const classes = this.props.liked ? "fa fa-heart" : "fa fa-heart-o";

    return classes;
  }

  render() {
    return (
      <React.Fragment>
        <i className={this.getClaasesHeart()} onClick={this.props.onClick}></i>
      </React.Fragment>
    );
  }
}

export default Like;
