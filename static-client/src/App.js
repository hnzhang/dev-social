import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {setCurrentUser} from './actions/loginAction';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {Provider}  from 'react-redux';

import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/login';
import Register from './components/auth/register';

import './App.css';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const userData = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(userData));

}

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component= {Landing} />
            <div className="container"> 
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
