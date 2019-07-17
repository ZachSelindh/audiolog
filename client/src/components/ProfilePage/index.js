import React, { Component } from "react";
import Header from "../Header";
import PostItem from "../PostItem";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      photoURL: "",
      email: "",
      todos: []
    };
    this.getPostsFromdb.bind(this);
  }

  getPostsFromdb = () => {
    API.getAuthoredPosts(
      this.props.location.pathname.replace("/profile/", ""),
      localStorage.getItem("token")
    )
      .then(res => this.setState({ todos: res.data }))
      .catch(err => console.log(err));
  };

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
    API.getUser(
      this.props.location.pathname.replace("/profile/", ""),
      localStorage.getItem("token")
    )
      .then(res => {
        this.setState({
          username: res.data.username,
          photoURL: res.data.photoURL,
          email: res.data.email
        });
        this.getPostsFromdb();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div id="display-area-z" className="col-8">
            <h1> Profile Page </h1>
            <br />
            <img
              alt={this.state.username}
              src={this.state.photoURL}
              height="300px"
              width="300px"
            />
            <h3>Username:</h3> <p>{this.state.username}</p>
            <h4>Email:</h4> <p>{this.state.email}</p>
            <br />
            <h1>User's Posts:</h1>
            {this.state.todos.length ? (
              this.state.todos.map(Post => {
                return (
                  <PostItem
                    key={Post._id}
                    title={Post.title}
                    author={Post.author}
                    description={Post.description}
                  />
                );
              })
            ) : (
              <h3>This user hasn't created any todos yet</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
