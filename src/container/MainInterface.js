import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagsBar from '../components/TagsBar'

class MainInterface extends Component {

   render() {
      return (
         <Grid columns={3}>
            <Grid.Column width={1}>
               <SideMenu user={this.props.user} fetchUser={this.props.fetchUser}/>
            </Grid.Column>
            <Grid.Column width={5}>
               <NotesContainer user={this.props.user}/>
            </Grid.Column>
            <Grid.Column width={10}>
               <Editor />
               <TagsBar />
            </Grid.Column>
         </Grid>
      )
   }
}

export default MainInterface
