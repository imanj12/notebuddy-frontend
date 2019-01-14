import React, {Component} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import SignUpForm from '../components/SignUpForm'

class Welcome extends Component {
   
   render () {
      return (
         <div className='welcome'>
            <Grid id='welcome-grid' columns={3} verticalAlign='middle'>
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
               <Grid.Column />
               <Grid.Column style={{ maxWidth: 450 }} textAlign='center'>
                  <SignUpForm setUser={this.props.setUser}/>
               </Grid.Column>
            </Grid>
         </div>
      )
   }
   
}

export default Welcome
