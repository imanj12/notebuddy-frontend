import React, {Component, Fragment} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagsBar from '../components/TagsBar'
import TagSelector from '../components/TagSelector'
const Cookies = require('cookies-js')

class MainInterface extends Component {
   constructor(props) {
      super(props)
      this.state = {
         activeNote: null,
         createdTagIds: [],
         currentValues: []
      }
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
      // eslint-disable-next-line
      let note = this.props.user.notes.find(note => note.id == this.state.activeNote)
      note.tags.forEach(tag => options.push(`${tag.name}`))
      return options
   }

   // setCreatedTagIds = (newTagIdsArr) => {
   //    this.setState({createdTagIds: newTagIdsArr})
   // }

   setCreatedTagIds = (tag) => {
      this.setState({createdTagIds: [...this.state.createdTagIds, { name: tag.name, id: tag.id }]})
   }

   setCurrentValues = (valuesArr) => {
      this.setState({currentValues: valuesArr})
   }

   saveNote = (title, content) => {
      const url = `http://localhost:3000/api/v1/notes/${this.state.activeNote}`
      const token = Cookies.get('token')
      const note_tags_attributes = []
      this.props.user.tags.forEach(tag => {
         if (this.state.currentValues.includes(tag.name)) {
            note_tags_attributes.push({tag_id: tag.id})
         }
      })
      this.state.createdTagIds.forEach(tag => {
         if (this.state.currentValues.includes(tag.name)) {
            note_tags_attributes.push({tag_id: tag.id})
         }
      })
      const data = {note: {
         title: title,
         user_id: this.props.user.id,
         content: content,
         note_tags_attributes: note_tags_attributes
      }}
      console.log(data)
      const fetchParams = {
         method: 'PUT',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            console.log(data)
            this.props.fetchUser()
         })
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
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        userId={this.props.user.id}
                        fetchUser={this.props.fetchUser}
                        saveNote={this.saveNote}
                        />
                     <TagSelector 
                        // key={this.state.activeNote}
                        user={this.props.user}
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        allTags={this.renderAllTags()}
                        assignedTags={this.renderAssignedTags()}
                        setCreatedTagIds={this.setCreatedTagIds}
                        // setExistingTagIds={this.setExistingTagIds}
                        setCurrentValues={this.setCurrentValues}
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
