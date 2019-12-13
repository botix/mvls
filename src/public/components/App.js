import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { HeroList } from "./main/HeroList";
import { Pagination } from "./main/Pagination";


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
      limit: 100,
      offset: 0,
      favoritedHeroes: [], 
      currentPage: 1,
      isLoading: false
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
      if (!user) {
        ui.start('#firebaseui-auth-container', uiConfig)
      } else {
        this.setState({ user })
        this.getFavoriteHeroes(user.uid)
      }
    });

    this.signOut = this.signOut.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    
  }

  signOut() {
    firebase.auth().signOut()
    this.setState({ user: null })
  };

  changePage(e){
    const page = parseInt(e.target.id);
    this.setState({ 
      offset: (page-1)*100,
      currentPage: page 
      }, 
      this.getAndValidateHeroes 
    );
  }

  async getFavoriteHeroes(collectionName){
    let db = firebase.app().firestore()
    let resultArr = []

    await db.collection(collectionName).get()
            .then(snap =>{
                snap.forEach(doc => {
                    const result = doc.data()
                    resultArr.push(result)
                })
                return null
            })

    this.setState({favoritedHeroes: resultArr})
  }

  handleFavorite(e){
    
    let db = firebase.app().firestore();
    this.getFavoriteHeroes(this.state.user.uid);

    const favHero = this.state.heroes.filter(hero => hero.name === e.target.title)[0];
    const itIsAllreadyFavorite = this.state.favoritedHeroes.some(hero => hero.name === e.target.title);

    if(itIsAllreadyFavorite){
      db.collection(this.state.user.uid)
      .doc(e.target.title)
      .delete();

    } else {
      db.collection(this.state.user.uid)
      .doc(e.target.title)
      .set({
        id: favHero.id,
        name: favHero.name,
        thumbnail: favHero.thumbnail,
        description: favHero.description
      });
    }

    this.getFavoriteHeroes(this.state.user.uid);
  }

  getAndValidateHeroes(){
    const url = `https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=${this.state.limit}&offset=${this.state.offset}&apikey=3ac63d151afdaaf89f0b996aff200cc1`
    this.setState({ isLoading: true})
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ 
        heroes: validateHeroes(response.data.results), 
        isLoading: false })) 
      .catch(err => console.error(err));  

    function validateHeroes(data){
      let validatedHeroes = [];
    
      data.forEach(hero =>{
        const noPicture = hero.thumbnail.path.match(/image_not_available/i)
          if(!noPicture){
            validatedHeroes.push(hero);
          }
        })
    
      return validatedHeroes  
    }
  }

  componentDidMount(){

    this.getAndValidateHeroes();
   
  }

  render() {
    return (
      <Router>
      {this.state.user === null && !this.state.isLoading &&
        <div className="app-login">
          <h2>You must login to view the content</h2>
        </div>}
      {this.state.user === null &&
        <div id="firebaseui-auth-container"></div>
      }
      {this.state.user && 
        <div className = "app-wrapper">
          <Header signOut = {this.signOut}/>
          <Route exact path = "/" >
          {this.state.user && this.state.heroes && !this.state.isLoading &&
            <div> 
            <HeroList heroes = {this.state.heroes} handleFavorite = {this.handleFavorite} favoriteHeroList = {this.state.favoritedHeroes}/>
            <Pagination changePage = {this.changePage} currentPage = {this.state.currentPage}/>
            </div>
          }
          </Route>
          <Route path = "/favoriteheroes">
            {this.state.user && this.state.favoritedHeroes && !this.state.isLoading &&
              <HeroList heroes = {this.state.favoritedHeroes} handleFavorite = {this.handleFavorite} favoriteHeroList = {this.state.favoritedHeroes}/>
            }
            {this.state.user && this.state.favoritedHeroes.length === 0 && !this.state.isLoading &&
              <div className = "info no-favorites">
                Click on a hero to add it to favorites, and it will be displayed here!
              </div>
            }
           </Route>
          {this.state.user && this.state.isLoading &&
            <div className = "info loading">
              Loading...
            </div>}
          <Footer />
        </div>
      }
      </Router>
    )
  }
}

export default App