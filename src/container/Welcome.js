import React, {Component} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import SignUpForm from '../components/SignUpForm'

class Welcome extends Component {
   
   render () {
      return (
         <div className='welcome'>
            <Grid id='welcome-grid' columns={3} verticalAlign='middle'>
               <Grid.Column textAlign='center'>
                  <Header as='h1' className='welcome-left-text'>
                     <img id='welcome-page-logo' src={require('../imgs/quill.png')} alt='scribe logo'></img>
                     scribe
                  </Header>
                  <Header as='h3' className='welcome-left-text'>
                     A streamlined note-taking experience
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
