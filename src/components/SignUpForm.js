import React, {Component, Fragment} from 'react'
import { Divider, Button, Form, Grid, Header, Segment} from 'semantic-ui-react'
const Cookies = require('cookies-js')

class SignUpForm extends Component {
   state = {
      username: '',
      password: '',
      password_confirmation: ''
   }

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
   }
   
   handleCreateUserClick = (e) => {
      const data = {user: {...this.state}}
      const url = 'http://localhost:3000/api/v1/users'
      const fetchParams = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            Cookies.set('token', data.jwt)
            // this.props.history.push('/home')
         })
   }

   render() {
      return (
         <Fragment>
            <Segment raised>
               <Form size='large'>
                  <Form.Input fluid name ='username' icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.handleChange} />
                  <Form.Input
                     fluid
                     name='password'
                     icon='lock'
                     iconPosition='left'
                     placeholder='Password'
                     type='password'
                     onChange={this.handleChange}
                  />
                  <Form.Input
                     fluid
                     name='password_confirmation'
                     icon='lock'
                     iconPosition='left'
                     placeholder='Confirm Password'
                     type='password'
                     onChange={this.handleChange}
                  />
                  <Button 
                     fluid 
                     content='Sign Up' 
                     color='teal' 
                     size='large' 
                     onClick={this.handleCreateUserClick}
                  />
               </Form>
            </Segment>
            <Divider horizontal>Or</Divider>
            <Segment>
               <Header as='h4'>Use either method to sign in</Header>
               <Divider horizontal></Divider>
               <Button color='teal' fluid size='large'>
                  Sign In
               </Button>
               <Divider horizontal></Divider>
               <Button color='teal' fluid size='large'>
                  Sign In with Google
               </Button>
            </Segment>
         </Fragment>
      )
   }
}
export default SignUpForm

