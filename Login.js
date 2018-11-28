import React, { Component } from "react";
import Home from "./Home";
import * as firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  onLogin = this.onLogin.bind(this);

  onLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        //localStorage.setItem(user, user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem("user");
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <Home uid={this.state.user.uid} />
        ) : (
          <button style={{ width: "100%" }} onClick={this.onLogin}>
            Login with Google
          </button>
        )}
      </div>
    );
  }
}

export default Login;
