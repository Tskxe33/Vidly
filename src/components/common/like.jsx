import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
class Like extends Component {
  render() {
    if (this.props.liked) {
      return (
        <FaHeart onClick={this.props.onLike} style={{ cursor: "pointer" }} />
      );
    } else {
      return (
        <AiOutlineHeart
          onClick={this.props.onLike}
          style={{ cursor: "pointer" }}
        />
      );
    }
  }
}

export default Like;
