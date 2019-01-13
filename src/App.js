import React, { Component, Fragment } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Welcome from './container/Welcome'
import MainInterface from './container/MainInterface'
import Navbar from './components/Navbar'

class App extends Component {
   render() {
      return (
         <div className='app-container'>
            {/* <Navbar /> */}
            <Welcome />
            {/* <MainInterface /> */}
         </div>
      )
   }
}

export default App;
