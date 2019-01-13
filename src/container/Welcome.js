import React, {Component, Fragment} from 'react'
import {Grid, Row, Segment, Menu, Header} from 'semantic-ui-react'
import SignUpForm from '../components/SignUpForm'

class Welcome extends Component {
   state = {
      
   }

   render () {
      return (
         <div class='welcome' style={{ height: '100%' }}>
            <Menu secondary size='massive'>
               <Menu.Item name='notbuddy logo here'/>
            </Menu>
            <Grid columns={2} divided padded>
               <Grid.Column textAlign='center'>
                  <Header as='h1' inverted>
                     Focus. Record. Do.
                  </Header>
                  <Header as='h3' inverted>
                     NoteBuddy is with you every step of the way.
                  </Header>
                  <Header as='h2' inverted>
                     Free up time in your life for what matters most.
                  </Header>
               </Grid.Column>
               <Grid.Column textAlign='center'>
                  <SignUpForm/>
               </Grid.Column>
            </Grid>
         </div>
      )
   }
   
}

export default Welcome
