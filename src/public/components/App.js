import React from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
//import './App.css'

import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

const firebaseConfig = {
    apiKey: "AIzaSyDiCsuJLrOHRjIVMf96v7h1XxMdr0sCb20",
    authDomain: "mvls-c5574.firebaseapp.com",
    databaseURL: "https://mvls-c5574.firebaseio.com",
    projectId: "mvls-c5574",
    storageBucket: "mvls-c5574.appspot.com",
    messagingSenderId: "971775117047",
    appId: "1:971775117047:web:499dbd87857ec308d5b5f2"
};

firebase.initializeApp(firebaseConfig)
let ui = new firebaseui.auth.AuthUI(firebase.auth())

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      user: null,
      heroes: null,
      color: "red",
      help: "Every moment now!!"
    }

    const uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ]
    }

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
      if (!user) {
        ui.start('#firebaseui-auth-container', uiConfig)
      }
    })
  }

  signOut() {
    firebase.auth().signOut()
  }

  favoriteHero() {
    let db = firebase.app().firestore()
    db.collection('userProfiles')
      .doc(this.state.user.uid)
      .set({
        favorite: [1, 2, 6]
      })
  }
  

  componentDidMount(){
    //request hero data, filter for stuff missing the picture, and other data
    //use setState() to add it to state
    this.setState({ 
      heroes: [{
        name: "Chronos",
        age: "Yes!",
        key: "123123123"
      },
      {
        name: "Yvanna",
        age: "As the trees",
        key: "42352435234534"
      }]
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <pre>{this.state.user && this.state.user.displayName}</pre>
          {this.state.user && <button onClick={this.signOut}>Sign out</button>}
          {this.state.user && (
            <button onClick={() => this.favoriteHero()}>
              Make hero favorite
            </button>
          )}
          <div id="firebaseui-auth-container"></div>
          
          <pre> {this.state.user && this.state.heroes.map(hero =>{
            return (
            <div key={hero.id}>
              <p>Name: {hero.name}</p>
              <p>Age: {hero.age}</p>
            </div>)
          })}
          </pre>
        </header>
        
        <div>
          <Header />
          <Main 
          color = {this.state.color}
          somethingINeed = {this.state.help}
          heroes = {this.state.heroes}/>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App