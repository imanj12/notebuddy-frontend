import React, {Component, Fragment} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagsBar from '../components/TagsBar'
import TagSelector from '../components/TagSelector'

class MainInterface extends Component {
   state = {
      activeNote: null
   }

   setActiveNote = (noteId) => {
      this.setState({activeNote: noteId})
   }

   renderAllTags = () => {
      let options = []
      this.props.user.tags.forEach(tag => options.push({ key: `${tag.id}`, text: `${tag.name}`, value: `${tag.name}` }))
      return options
   }

   renderAssignedTags = () => {
      let options = []
      let note = this.props.user.notes.find(note => note.id == this.state.activeNote)
      note.tags.forEach(tag => options.push(`${tag.name}`))
      return options
   }

   render() {
      return (
         <Grid columns={3}>
            <Grid.Column width={1}>
               <SideMenu user={this.props.user} fetchUser={this.props.fetchUser} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            <Grid.Column width={3}>
               <NotesContainer user={this.props.user} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            <Grid.Column width={12}>
               {this.state.activeNote ? (
                  <Fragment key={this.state.activeNote}>
                     <Editor 
                        // key={this.state.activeNote} 
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        userId={this.props.user.id}
                        fetchUser={this.props.fetchUser}
                        />
                     <TagSelector 
                        // key={this.state.activeNote}
                        user={this.props.user}
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        allTags={this.renderAllTags()}
                        assignedTags={this.renderAssignedTags()}
                     />
                  </Fragment>
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
