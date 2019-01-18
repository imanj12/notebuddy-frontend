import React, {Component, Fragment} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagsBar from '../components/TagsBar'
import TagSelector from '../components/TagSelector'
import NotesSearch from '../components/NotesSearch'
const Cookies = require('cookies-js')

class MainInterface extends Component {
   constructor(props) {
      super(props)
      this.state = {
         activeNote: null,
         createdTagIds: [],
         currentValues: [],
         notesSearch: '',
         notesSearchEmpty: false
      }
      props.fetchUser()
   }

   setActiveNote = (noteId) => {
      this.setState({activeNote: noteId})
   }

   provideAllTags = () => {
      let options = []
      this.props.user.tags.forEach(tag => options.push({ key: `${tag.id}`, text: `${tag.name}`, value: `${tag.name}` }))
      return options
   }

   provideAssignedTags = () => {
      let options = []
      // eslint-disable-next-line
      let note = this.props.user.notes.find(note => note.id == this.state.activeNote)
      note.tags.forEach(tag => options.push(`${tag.name}`))
      return options
   }

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
            this.props.fetchUser()
         })
   }

   notesContainerFilter = () => {
      let filter = this.props.user.notes.filter(note => (
         note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
      ))
      // if (filter.length === 0) {
      //    this.setState({notesSearchEmpty: true})
      // } else {
      //    this.setState({notesSearchEmpty: false})
      // }
      return filter
   }

   onNotesSearchChange = (e, data) => {
      this.setState({notesSearch: data.value})
   }

   render() {
      return (
         <Grid columns={3}>
            
            {/* 1. side menu */}
            <Grid.Column width={1}>
               <SideMenu user={this.props.user} fetchUser={this.props.fetchUser} setActiveNote={this.setActiveNote} />
            </Grid.Column>
            
            {/* 2. search and notes container */}
            <Grid.Column width={3}>
               <NotesSearch onNotesSearchChange={this.onNotesSearchChange} notesSearch={this.state.notesSearch} searchEmpty={this.state.notesSearchEmpty} />
               <NotesContainer notes={this.notesContainerFilter()} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            
            {/* 3. editor and tags */}
            <Grid.Column width={12}>
               {this.state.activeNote ? (
                  <Fragment key={this.state.activeNote}>
                     <Editor 
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        userId={this.props.user.id}
                        fetchUser={this.props.fetchUser}
                        saveNote={this.saveNote}
                        />
                     <TagSelector 
                        user={this.props.user}
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        allTags={this.provideAllTags()}
                        assignedTags={this.provideAssignedTags()}
                        setCreatedTagIds={this.setCreatedTagIds}
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

export default withRouter(MainInterface)
