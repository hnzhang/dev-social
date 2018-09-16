import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {setCurrentUser, logoutUser} from './actions/loginAction';
import {clearCurrentProfile} from './actions/profileAction';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {Provider}  from 'react-redux';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
import Profiles from './components/profiles/Profiles';

import './App.css';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const userData = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(userData));
  const currentTime = Date.now() /1000;
  if(userData.exp < currentTime){
    store.dispatch(logoutUser());
    //TOOD: clean up current profile
    clearCurrentProfile();
    //redirect to login
    window.location.href = '/login';
  }

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
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Route exact path='/create-profile' component={CreateProfile} />
              <Route exact path='/edit-profile' component={EditProfile} />
              <Route exact path='/add-education' component={AddEducation} />
              <Route exact path='/add-experience' component={AddExperience} />
              <Route exact path='/profiles' component={Profiles} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
