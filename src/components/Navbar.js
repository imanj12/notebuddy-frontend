import React, {Component} from 'react'
import {Menu, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
const Cookies = require('cookies-js')

class NavBar extends Component {

   logOut = () => {
      Cookies.expire('token')
      this.props.setUser(null)
      this.props.history.push('/')
   }

   render() {
      return (
         <Menu size='massive' borderless>
            <Menu.Item name='notebuddy logo here'/>
            {this.props.user ? (
               <Menu.Menu position='right'>
                  <Menu.Item>
                     <Button 
                        color='teal'
                        onClick={this.logOut}
                     >
                        Log-out
                     </Button>
                  </Menu.Item>
               </Menu.Menu>
            ) : null}
            
         </Menu>
      )
   }
}

export default withRouter(NavBar)

