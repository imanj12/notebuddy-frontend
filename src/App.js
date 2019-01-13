import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Welcome from './container/Welcome'
import MainInterface from './container/MainInterface'

class App extends Component {
   render() {
      return (
         <div className='app-container' style={{ height: '100%' }}>
            <Welcome />
            <MainInterface />
         </div>
      )
   }
}

export default App;
