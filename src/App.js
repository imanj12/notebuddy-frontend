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
      Cookies.get('token') && this.fetchUser()
   }

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

   setUser = (user) => {
      this.setState({user: user})
   }
   
   render() {
      return (
         <div className='app-container'>
            <BrowserRouter>
               <>
                  {this.state.user ? <NavBar setUser={this.setUser} user={this.state.user}/> : null}
                  <Switch>
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
