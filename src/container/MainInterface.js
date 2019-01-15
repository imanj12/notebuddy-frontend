import React, {Component} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagsBar from '../components/TagsBar'

class MainInterface extends Component {
   state = {
      activeNote: null
   }

   setActiveNote = (noteId) => {
      this.setState({activeNote: noteId})
   }

   render() {
      return (
         <Grid columns={3}>
            <Grid.Column width={1}>
               <SideMenu user={this.props.user} fetchUser={this.props.fetchUser}/>
            </Grid.Column>
            <Grid.Column width={3}>
               <NotesContainer user={this.props.user} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            <Grid.Column width={12}>
               {this.state.activeNote ? (
                  <Editor 
                     key={this.state.activeNote} 
                     note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                     userId={this.props.user.id}
                     fetchUser={this.props.fetchUser}
                     />
               ) : (
                  <Header as='h1' textAlign='center'>Select a note, or create a new one!</Header>
               )}
               <TagsBar />
            </Grid.Column>
         </Grid>
      )
   }
}

export default MainInterface
