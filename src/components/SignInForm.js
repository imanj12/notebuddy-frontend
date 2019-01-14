import React, {Component} from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
const Cookies = require('cookies-js')

class SignInForm extends Component {
   state = {
      username: 'iman',
      password: 'iman'
   }

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
   }

   handleModalClose = () => {
      this.setState({username: '', password: ''})
   }

   handleLogin = (e) => {
      const url = 'http://localhost:3000/api/v1/login'
      const data = {user: {...this.state}}
      const fetchParams = {
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            console.log(data)
            Cookies.set('token', data.jwt)
            this.props.setUser(data.user)
            this.props.history.push('/home')
         })
   }

   render() {
      return (
         <Modal 
            trigger={<Button color='teal' fluid size='large'>Sign In</Button>} 
            style={{ maxWidth: 450 }}
            onClose={this.handleModalClose}
         >
            <Modal.Content>
               <Form size='large'>
                  <Form.Input 
                     fluid 
                     name ='username' 
                     icon='user' 
                     iconPosition='left' 
                     placeholder='E-mail address'
                     value={this.state.username} 
                     onChange={this.handleChange} />
                  <Form.Input
                     fluid
                     name='password'
                     icon='lock'
                     iconPosition='left'
                     placeholder='Password'
                     type='password'
                     value={this.state.password}
                     onChange={this.handleChange}
                  />
                  <Button 
                     fluid 
                     content='Sign In' 
                     color='teal' 
                     size='large' 
                     onClick={this.handleLogin}
                  />
               </Form>
            </Modal.Content>
         </Modal>
      )
   }
}

export default withRouter(SignInForm)
