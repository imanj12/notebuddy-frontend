import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-quill/dist/quill.snow.css'
import Welcome from './container/Welcome'
import MainInterface from './container/MainInterface'
import NavBar from './components/NavBar'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { URL } from './constants/constants'
const Cookies = require('cookies-js')

class App extends Component {
   constructor() {
      super()
      this.state = {
         user: null
      }
      // if JWT token exists in cookies, fetch that user's data
      Cookies.get('token') && this.fetchUser()
   }

   // fetch user as an object containing all of their data
   fetchUser = () => {
      console.log('fetchUser called')
      // const url = 'http://localhost:3000/api/v1/profile'
      const url = URL + '/profile'
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

   // set user data object in state
   setUser = (user) => {
      this.setState({user: user})
   }
   
   render() {
      return (
         <div className='app-container'>
            <BrowserRouter>
               <>
                  {/* only show navbar after logging in */}
                  {this.state.user ? <NavBar setUser={this.setUser} user={this.state.user}/> : null}
                  <Switch>
                     {/* /home or main interface only available as a route if logged in */}
                     {this.state.user ? (
                        <Route path='/home' render={() => <MainInterface user={this.state.user} fetchUser={this.fetchUser}/>}/> 
                        ) : null
                     }
                     <Route path='/' render={() => this.state.user ? <Redirect to='/home'/> : <Welcome setUser={this.setUser}/>} /> 
                  </Switch>
               </>
            </BrowserRouter>
         </div>
      )
   }
}

export default App;
