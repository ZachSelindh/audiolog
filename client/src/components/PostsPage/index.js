import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import PostItem from "../PostItem";
import history from "../../utils/history";
import "./style.css";

class PostsPage extends Component {
  constructor() {
    super();
    this.state = {
      pulledPosts: [],
      currentUser: ""
    };
  }

  calltodb = () => {
    API.getAllPosts(localStorage.getItem("token"))
      .then(res => this.setState({ pulledPosts: res.data }))
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
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        API.getUser(
          localStorage.getItem("currentUser"),
          localStorage.getItem("token")
        )
          .then(res => this.setState({ currentUser: res.data.username }))
          .catch(err => console.log(err));
        this.calltodb();
      })
      .catch(err => {
        if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push("/login");
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="display-area-z col-8">
            <h3> Welcome back, {this.state.currentUser}!</h3>
            <br />
            <h1>Posts:</h1>
            {this.state.pulledPosts.length ? (
              this.state.pulledPosts.map(Post => {
                return (
                  <PostItem
                    key={Post._id}
                    postID={Post._id}
                    title={Post.title}
                    author={Post.author}
                    description={Post.description}
                    calltodb={this.calltodb}
                  />
                );
              })
            ) : (
              <h3>No Results</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PostsPage;
