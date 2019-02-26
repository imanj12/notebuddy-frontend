import React, {Component} from 'react'
import { Button, Form, Modal, Message} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { URL } from '../constants/constants'
const Cookies = require('cookies-js')

class SignInForm extends Component {
   state = {
      username: 'example@example.com',
      password: 'example',
      error: null
   }

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
   }

   handleModalClose = () => {
      this.setState({username: '', password: ''})
      this.setState({error: null})
   }

   handleLogin = (e) => {
      // const url = 'http://localhost:3000/api/v1/login'
      const url = URL + '/login'
      const data = {user: {...this.state}}
      const fetchParams = {
         method: "POST",
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         // .then(r => console.log(r))
         .then(data => {
            if (data.error) {
               this.setState({error: data.message})
            } else {
               Cookies.set('token', data.jwt)
               this.props.setUser(data.user)
               this.props.history.push('/home')
            }
            
         })
   }

   render() {
      return (
         <Modal 
            trigger={<Button fluid size='large'>Sign In</Button>} 
            style={{ maxWidth: 450 }}
            onClose={this.handleModalClose}
         >
            <Modal.Content>
               { this.state.error ? (
                  <Message
                     negative
                     header={this.state.error}
                  />
               ) : (
                  <Message
                     header="Sign in with username 'example@example.com' and password 'example' to view the app with pre-populated notes."
                  />
               )}
               <Form size='large' onSubmit={this.handleLogin}>
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
                     type='submit'
                     fluid 
                     content='Sign In' 
                     size='large' 
                     // onClick={this.handleLogin}
                  />
               </Form>
            </Modal.Content>
         </Modal>
      )
   }
}

export default withRouter(SignInForm)
