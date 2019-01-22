import React, {Component} from 'react'
import {Menu, Button, Image, Icon} from 'semantic-ui-react'
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
                     <Image src='https://i.imgur.com/pZY44Td.jpg' avatar/>
                     <span>{this.props.user.username}</span>
                  </Menu.Item>
                  <Menu.Item>
                     <Button 
                        // icon
                        color='teal'
                        onClick={this.logOut}
                        content='Log out'
                     >
                        {/* <Icon name='log out'/> */}
                     </Button>
                  </Menu.Item>
               </Menu.Menu>
            ) : null}
            
         </Menu>
      )
   }
}

export default withRouter(NavBar)

