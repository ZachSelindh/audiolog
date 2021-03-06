import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class SinglePostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postID: "",
      title: "",
      author: "",
      username: "",
      photoURL: "",
      description: "",
      formatted_date: "",
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
    this.setState({
      postID: this.props.location.pathname.replace("/post/", "")
    });
    API.getPost(
      this.props.location.pathname.replace("/post/", ""),
      localStorage.getItem("token")
    )
      .then(res => {
        const {
          title,
          author,
          description,
          formatted_date,
          comments
        } = res.data;
        this.setState({
          title,
          author,
          description,
          formatted_date,
          comments
        });
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
          <div className="display-area-z col-12">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-2 author-sec">
                    <img
                      alt={this.state.username}
                      src={this.state.photoURL}
                      height="100px"
                      width="100px"
                    />
                    <h1>{this.state.username}</h1>
                  </div>
                  <div className="col-8 post-page-sec">
                    <h1>{this.state.title}</h1>
                    <p>Posted at: {this.state.formatted_date}</p>
                    <h4>{this.state.description}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePostPage;
