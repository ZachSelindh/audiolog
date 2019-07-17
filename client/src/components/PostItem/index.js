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
      validUser: false,
      currentAuthor: false
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

  render() {
    return (
      <div className="container todo-item">
        <div className="row">
          <div className="col-12">
            <h1>{this.props.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h5>
              Submitted by:{" "}
              {this.state.validUser ? (
                <span className="user-link" onClick={() => this.handleClick()}>
                  {this.state.username}
                </span>
              ) : (
                <span>{this.state.username}</span>
              )}
            </h5>

            <p>{this.props.description}</p>
          </div>

          <div className="col-4">
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
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
