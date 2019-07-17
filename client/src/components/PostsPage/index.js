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
      pulledPosts: []
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
        console.log(res.data.message);
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
