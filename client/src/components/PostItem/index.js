import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import UpdateButton from "../Buttons/UpdateButton";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      photoURL: "",
      validUser: false,
      currentAuthor: false,
      deleted: false
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("currentUser") === this.props.author) {
      this.setState({ currentAuthor: true });
    }
    API.getUser(this.props.author, localStorage.getItem("token"))
      .then(res => {
        this.setState({
          username: res.data.username,
          photoURL: res.data.photoURL,
          validUser: true
        });
      })
      .catch(err => {
        if (err.response.status === 422) {
          this.setState({ username: "User not found", validUser: false });
        } else if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push({
            pathname: "/login",
            state: { redirErr: "Your session has expired. Please log in" }
          });
        } else {
        }
      });
  };

  handleClick = () => {
    history.push(`/profile/${this.props.author}`);
  };

  handlePostClick = () => {
    history.push(`/post/${this.props.postID}`);
  };

  handleDelete = () => {
    this.setState({ deleted: true });
  };

  render() {
    return (
      <div className="container todo-item">
        {this.state.deleted ? (
          <div className="row">
            <h3 className="delete-notif">Post successfully deleted</h3>
          </div>
        ) : (
          <div className="row">
            <div className="col-6">
              <h1 onClick={() => this.handlePostClick()}>{this.props.title}</h1>
            </div>
            <div className="col-1">
              <img
                alt="author"
                src={this.state.photoURL}
                height="50px"
                width="50px"
              />
            </div>
            <div className="col-2">
              <h5>
                {this.state.validUser ? (
                  <span
                    className="user-link"
                    onClick={() => this.handleClick()}
                  >
                    {this.state.username}
                  </span>
                ) : (
                  <span>{this.state.username}</span>
                )}
              </h5>
            </div>
            <div className="col-3">
              {this.state.currentAuthor ? (
                <div>
                  {this.props.completed ? null : (
                    <div>
                      <UpdateButton
                        postID={this.props.postID}
                        title={this.props.title}
                        description={this.props.description}
                      />
                    </div>
                  )}
                  <DeleteButton
                    postID={this.props.postID}
                    author={this.props.author}
                    calltodb={this.props.calltodb}
                    handleDelete={this.handleDelete.bind(this)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PostItem;
