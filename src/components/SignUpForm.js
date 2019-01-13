import React, {Component} from 'react'
import { Divider, Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class SignUpForm extends Component {

render() {
   return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
         {/* <Segment basic>
            <Header as='h1'>
               Live. Die. Repeat.<br/>Edge of Tomorrow.<br/>And then take some mfin notes.
            </Header>
            <Header as='h2' textAlign='center'>
               Sign Up
            </Header>
         </Segment> */}
         <Segment raised>
            <Form size='large'>
               <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
               <Form.Input
               fluid
               icon='lock'
               iconPosition='left'
               placeholder='Password'
               type='password'
               />
               <Form.Input
               fluid
               icon='lock'
               iconPosition='left'
               placeholder='Confirm Password'
               type='password'
               />
               <Button color='teal' fluid size='large'>
               Sign Up
               </Button>
            </Form>
         </Segment>
         <Divider horizontal>Or</Divider>
         <Segment>
            <Header as='h4'>Click either below to sign in</Header>
            <Divider horizontal></Divider>
            <Button color='teal' fluid size='large'>
               Sign In
            </Button>
            <Divider horizontal></Divider>
            <Button color='teal' fluid size='large'>
               Sign In with Google
            </Button>
         </Segment>
         </Grid.Column>
   </Grid>
   )
}
}
export default SignUpForm

