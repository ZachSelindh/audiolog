import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class SinglePostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      username: "",
      photoURL: "",
      description: "",
      submitted_at: "",
      comments: []
    };
  }

  componentWillMount = () => {
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        console.log(res.data.message);
      })
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

  componentDidMount = () => {
    var thisPost = this.props.location.pathname.replace("/post/", "");
    API.getPost(thisPost, localStorage.getItem("token"))
      .then(res => {
        const { title, author, description, submitted_at, comments } = res.data;
        this.setState({ title, author, description, submitted_at, comments });
        API.getUser(author, localStorage.getItem("token"))
          .then(res => {
            const { username, photoURL } = res.data;
            this.setState({ username, photoURL });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container todo-item">
          <div className="display-area-z col-8">
            <div className="row">
              <div className="col-12">
                <div className="row author-sec">
                  <div className="col-3">
                    <img
                      alt={this.state.username}
                      src={this.state.photoURL}
                      height="100px"
                      width="100px"
                    />
                  </div>
                  <div className="col-4">
                    <h1>{this.state.username}</h1>
                  </div>
                  <div className="col-5">
                    <p> Posted at: {this.state.submitted_at}</p>
                  </div>
                </div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePostPage;
