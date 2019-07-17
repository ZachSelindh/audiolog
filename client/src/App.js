import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import PostsPage from "./components/PostsPage";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import CreatePostPage from "./components/CreatePostPage";
import EditPost from "./components/EditPost";
import SinglePostPage from "./components/SinglePostPage";
import history from "../src/utils/history";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Router history={history}>
          <Route exact path="/" component={PostsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegisterPage} />
          <Route exact path="/post/:id" component={SinglePostPage} />
          <Route exact path="/profile/:id" component={ProfilePage} />
          <Route exact path="/edit/post/:id" component={EditPost} />
          <Route exact path="/create" component={CreatePostPage} />
        </Router>
      </Wrapper>
    );
  }
}

export default App;
