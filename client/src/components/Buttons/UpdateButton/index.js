import React, { Component } from "react";
import API from "../../../utils/API";
import history from "../../../utils/history";
import "./style.css";

class UpdateButton extends Component {
  handleClick = () => {
    var thisPostID = this.props.postID;
    API.checkToken(localStorage.getItem("token"))
      .then(res =>
        history.push({
          pathname: `/edit/post/${thisPostID}`,
          state: {
            props: {
              postID: this.props.postID,
              title: this.props.title,
              description: this.props.description
            }
          }
        })
      )
      .catch(err => {
        if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push({
            pathname: "/login",
            state: { redirErr: "Your session has expired. Please log in" }
          });
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <button key={this.props.author} onClick={this.handleClick}>
        Update
      </button>
    );
  }
}

export default UpdateButton;
