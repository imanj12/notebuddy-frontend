import React, {Component} from 'react'
import {Menu, Button, Image} from 'semantic-ui-react'
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
         <Menu id='navbar' size='massive' borderless secondary inverted>
            <Menu.Item id="navbar-logo-menu">
               <img id='navbar-logo' src={require('../imgs/quill-white.png')} alt='scribe logo'></img>
               <p style={{fontSize: '40px'}}>scribe</p>
            </Menu.Item>
            {this.props.user ? (
               <Menu.Menu position='right'>
                  <Menu.Item>
                     <Image src='https://i.imgur.com/pZY44Td.jpg' avatar/>
                     <span>{this.props.user.username}</span>
                  </Menu.Item>
                  <Menu.Item>
                     <Button 
                        id='log-out-button'
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

