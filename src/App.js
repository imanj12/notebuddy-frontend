import React, { Component, Fragment } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-quill/dist/quill.snow.css'
import Welcome from './container/Welcome'
import MainInterface from './container/MainInterface'
import NavBar from './components/NavBar'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
const Cookies = require('cookies-js')

class App extends Component {
   state = {
      user: null  // change this back to null
   }

   setUser = (user) => {
      this.setState({user: user})
   }

   fetchUser = () => {
      const url = 'http://localhost:3000/api/v1/profile'
      const token = Cookies.get('token')
      const fetchParams = {
         method: 'GET',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         }
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => this.setUser(data.user))
   }
   
   render() {
      return (
         <div className='app-container' style={{ height: '100%' }}>
            <BrowserRouter>
               <Fragment>
                     <NavBar setUser={this.setUser} user={this.state.user}/>
                  <Switch>
                     {this.state.user ? (
                        // routes below for if a user exists/is logged in
                        <Fragment>
                           <Route path='/home' render={() => <MainInterface user={this.state.user} fetchUser={this.fetchUser}/>} />
                        </Fragment>
                     ) : (
                        // routes below for if no user exists/is not logged in
                        <Fragment>
                           <Route path='/' render={() => <Welcome setUser={this.setUser}/>} />    
                        </Fragment>           
                     )}  
                  </Switch>
               </Fragment>
            </BrowserRouter>
         </div>
      )
   }
}

export default App;
