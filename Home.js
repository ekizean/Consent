import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Home.css";
import App from "./App";
import database from "./Firebase";
import * as firebase from "firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementList: [],
      createAgreementOn: false,
      renderHome: true
    };
  }

  logout = this.logout.bind(this);
  handleClick = this.handleClick.bind(this);
  createAgreement = this.createAgreement.bind(this);
  createAgreementOff = this.createAgreementOff.bind(this);
  renderHome = this.renderHome.bind(this);

  logout() {
    firebase.auth().signOut();
  }

  createAgreement(newAgreement) {
    database
      .ref("users/" + this.props.uid)
      .set({
        agreementList: [...this.state.agreementList, newAgreement]
      })
      .then(
        this.setState({
          agreementList: [...this.state.agreementList, newAgreement]
        })
      );
  }

  handleClick(e) {
    this.setState({
      createAgreementOn: true
    });
  }

  renderHome() {
    this.setState({
      renderHome: false
    });
  }

  createAgreementOff() {
    this.setState({
      createAgreementOn: false
    });
  }

  render() {
    return (
      <div className="OuterSpace">
        {this.state.renderHome && (
          <div className="Home" style={{ position: "relative" }}>
            <button onClick={this.logout}>Log out</button>
            {this.state.agreementList.map((p, i) => (
              <Agreement
                title={this.state.agreementList[i].title}
                onClick={this.renderHome}
              />
            ))}
            {this.state.createAgreementOn && (
              <CreateAgreement
                createAgreement={this.createAgreement}
                createAgreementOff={this.createAgreementOff}
              />
            )}
            <button
              onClick={this.handleClick}
              style={{ position: "absolute", bottom: "2%", right: "2%" }}
            >
              Add new Agreement
            </button>
          </div>
        )}
        {!this.state.renderHome && <App />}
      </div>
    );
  }
}

class Agreement extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="Agreement">
        {this.props.title}
      </button>
    );
  }
}

class CreateAgreement extends Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createAgreement(this.state);
    this.setState({
      title: "",
      description: ""
    });
    this.props.createAgreementOff();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Titel"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <input
            name="description"
            type="text"
            placeholder="Beskrivning"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Home;
