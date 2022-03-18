import React, { Component } from "react";

class Like extends Component {
  state = {};

  getClaasesHeart() {
    const classes = this.props.movie.enabled ? "fa fa-heart" : "fa fa-heart-o";

    return classes;
  }

  render() {
    return (
      <React.Fragment>
        <i
          className={this.getClaasesHeart()}
          onClick={() => this.props.onHeart(this.props.movie)}
        ></i>
      </React.Fragment>
    );
  }
}

export default Like;
