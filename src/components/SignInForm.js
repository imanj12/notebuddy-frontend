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

   // functions to invoke upon closing of sign-in modal
   handleModalClose = () => {
      this.setState({error: null})
   }

   // handle login submit, show errors if provided by backend
   handleLogin = (e) => {
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

   // show log-in window as modal
   render() {
      return (
         <Modal 
            trigger={<Button fluid size='large'>Sign In</Button>} 
            style={{ maxWidth: 450 }}
            onClose={this.handleModalClose}
         >
            {/* show error message if sign-in unsuccessful, otherwise show demo account info */}
            <Modal.Content>
               { this.state.error ? (
                  <Message
                     negative
                     header={this.state.error}
                  />
               ) : (
                  <Message
                     header="Sign in with username 'example@example.com' and password 'example' to demo the app with pre-populated notes."
                  />
               )}

               {/* sign-in form */}
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
                  />
               </Form>
            </Modal.Content>
         </Modal>
      )
   }
}

export default withRouter(SignInForm)
