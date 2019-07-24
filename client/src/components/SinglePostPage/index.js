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
    console.log(thisPost);
    API.getPost(thisPost, localStorage.getItem("token"))
      .then(res => {
        const { title, author, description, submitted_at, comments } = res.data;
        this.setState({ title, author, description, submitted_at, comments });
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
