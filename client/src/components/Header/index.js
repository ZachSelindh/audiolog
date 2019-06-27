import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  render() {
    return (
      <div className="row todo-header">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <h1>MERN-stack Todo List</h1>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>A full-stack todo app</p>
            </div>
            <div className="col-sm-12 col-md-5">
              <div className="row">
                <a href="/">Home</a>
                <a href="/completed">Completed</a>
                <a href="/create"> Create</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
